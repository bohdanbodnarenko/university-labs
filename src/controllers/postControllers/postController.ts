import { NextFunction, Request, Response } from "express";
import { Post } from "../../entity/Post";
import { Channel } from "../../entity/Channel";

export const postById = async (
  req: Request & any,
  res: Response,
  next: NextFunction,
  id
) => {
  const post = await Post.findOne(id);
  if (!post) {
    return res.status(404).json({ error: "Post with this id does not exist" });
  }
  req.postById = post;
  next();
};

export const createPost = async (req: Request & any, res: Response) => {
  const {
    user,
    body: { content, channelId }
  } = req;

  const channel = await Channel.findOne(channelId);

  if (!content) {
    return res
      .status(400)
      .json({ error: "Please provide the content of post" });
  }
  const post = await Post.create({
    content,
    timestamp: new Date(),
    owner: user.teacher,
    channel
  });
  await post.save();

  res.json({ post });
};

export const postsByChannel = async (
  req: Request & { channelById: Channel },
  res: Response
) => {
  const channel = req.channelById;
  const posts = await Post.find({ where: { channel } });
  res.json({ posts });
};

export const updatePost = async (
  req: Request & { postById: Post },
  res: Response
) => {
  const {
    postById,
    body: { content }
  } = req;
  if (!content) {
    return res.status(400).json({ content: "Content can't be empty" });
  }
  postById.content = content;
  await postById.save();
  res.json({ post: postById });
};

export const deletePost = async (
  req: Request & { postById: Post },
  res: Response
) => {
  await Post.delete({ id: req.postById.id });
  res.json({ message: "Success" });
};
