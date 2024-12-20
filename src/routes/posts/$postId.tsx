import { createFileRoute, useRouter } from "@tanstack/react-router";
import { fetchPost } from "../../utils/posts";

export const Route = createFileRoute("/posts/$postId")({
  loader: ({ params }) => fetchPost(params.postId),
  component: PostComponent,
});

function PostComponent() {
  const post = Route.useLoaderData();

  const { history } = useRouter();

  // ref: https://github.com/TanStack/router/discussions/181
  const handleBack = () => {
    history.go(-1);
  };

  return (
    <div>
      <p>Post ID: {post.id}</p>
      <p>Post title: {post.title}</p>
      <p>Post body: {post.body}</p>
      <button onClick={handleBack}>戻る</button>
    </div>
  );
}
