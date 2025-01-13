import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <p>Hello "/"!</p>
      <nav>
        <ul>
          <li>
            <Link
              to="/posts"
              search={{
                userId: undefined,
              }}
            >
              posts - public routes
            </Link>
          </li>
          <li>
            <Link to="/dashboard">dashboard - required login</Link>
          </li>
          <li>
            <Link to="/login">login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
