import { Request, Response, NextFunction } from "express";

import { validChannelSchema } from "../../validations";
import { formatYupError } from "../../utils/formatYupError";
import { Channel } from "../../entity/Channel";

export const channelById = async (
  req: Request & any,
  res: Response,
  next: NextFunction,
  id: string
) => {
  const channel = await Channel.findOne(
    { id: +id },
    { relations: ["owner", "users"] }
  );
  if (!channel) {
    res.status(404).json({ error: "Channel not found" });
  }
  req.channelById = channel;
  next();
};

export const createChannel = async (req: Request & any, res: Response) => {
  const channel = req.body;
  try {
    await validChannelSchema.validate(channel, { abortEarly: false });
  } catch (err) {
    return res.status(400).json(formatYupError(err));
  }

  const { name } = channel;
  const channelAlreadyExists = await Channel.findOne({
    where: { name },
    select: ["id"]
  });
  if (channelAlreadyExists) {
    return res.status(400).json([
      {
        path: "name",
        message: "The channel with the same name exists already, change name"
      }
    ]);
  }

  const { teacher } = req.user;

  channel.ownerId = teacher.id;
  const newChannel = Channel.create(channel);
  newChannel.users = [req.user];

  await newChannel.save();
  res.json(newChannel);
};

export const getChannel = async (req: Request & any, res: Response) => {
  res.json(req.channelById);
};

export const getChannels = async (req: Request, res: Response) =>
  res.json(await Channel.find());
