import { Post, Subreddit, Vote, Comment } from "@prisma/client";

export type ExtendedPost = Post & {
  subreddit: Subreddit;
  vote: Vote[];
  author: User;
  comments: Comment[];
};
