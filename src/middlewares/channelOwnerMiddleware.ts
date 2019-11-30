import { NextFunction, Request, Response } from "express";
import { Channel } from "../entity/Channel";

export const channelOwnerMiddleware = async (
  req: Request & any,
  res: Response,
  next: NextFunction
) => {
  try {
    const teacherId = req.user.teacher.id,
      { channelId } = req.body;
    const channel = await Channel.findOne({ where: { id: channelId } });
    if (!channel) {
      return res.status(404).json({ error: "Channel does not exist" });
    }
    if (channel.ownerId !== teacherId) {
      return res
        .status(403)
        .json({ error: "You aren't owner of this channel" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Server error" });
  }
};
