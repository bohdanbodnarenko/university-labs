import { NextFunction, Request, Response } from "express";
import { Channel } from "../entity/Channel";
import { User } from "../entity/User";

export const channelMemberMiddleware = async (
  req: Request & { user: User; channelById: Channel },
  res: Response,
  next: NextFunction
) => {
  const { user, channelById } = req;

  if (!channelById.users.map(({ id }) => id).includes(user.id)) {
    return res.status(403).json({ error: "You aren't member of this channel" });
  }

  next();
};
