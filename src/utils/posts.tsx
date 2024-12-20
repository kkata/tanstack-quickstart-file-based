import axios from "redaxios";

export type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export class PostNotFoundError extends Error {}

export const fetchPost = async (postId: string) => {
  console.info(`Fetching post with id ${postId}...`);
  await new Promise((r) => setTimeout(r, 500));
  const post = await axios
    .get<PostType>(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((r) => r.data)
    .catch((err) => {
      if (err.status === 404) {
        throw new PostNotFoundError(`Post with id "${postId}" not found!`);
      }
      throw err;
    });

  return post;
};

export const fetchPosts = async (userId?: string) => {
  console.info("Fetching posts...");
  await new Promise((r) => setTimeout(r, 500));

  return axios
    .get<
      PostType[]
    >(`https://jsonplaceholder.typicode.com/posts${userId ? `?userId=${userId}` : ""}`)
    .then((r) => r.data.slice(0, 10));
};
