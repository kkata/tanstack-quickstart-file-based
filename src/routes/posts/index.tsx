import { useState } from "react";
import {
  createFileRoute,
  Link,
  useLoaderData,
  useRouter,
} from "@tanstack/react-router";
import { fetchPosts } from "../../utils/posts";

export const Route = createFileRoute("/posts/")({
  // ref: https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#using-search-params-in-loaders
  // https://github.com/TanStack/router/discussions/2505
  // https://youtu.be/KcKkwF55Pes?feature=shared&t=1779
  validateSearch: (search) => {
    return {
      userId: (search.userId as string) || undefined,
    };
  },
  loaderDeps: ({ search: { userId } }) => ({ userId }),
  loader: ({ deps: { userId } }) => {
    return fetchPosts(userId);
  },
  component: PostsComponent,
});

function PostsComponent() {
  const posts = useLoaderData({ from: "/posts/" });
  const [filterId, setFilterId] = useState("1");
  const router = useRouter();

  const handleClick = () => {
    router.navigate({
      to: "/posts",
      search: { userId: String(filterId) },
    });
  };

  return (
    <div>
      <p>Hello "/posts/"!</p>
      Select User ID :
      <input
        type="number"
        value={filterId}
        onChange={(e) => setFilterId(String(e.target.value))}
        placeholder="User IDを入力"
        min={1}
        max={10}
      />
      <button onClick={handleClick} type="button">
        フィルタ
      </button>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>
              {post.id} : {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
