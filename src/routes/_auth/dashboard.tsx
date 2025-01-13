import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "../../auth";

export const Route = createFileRoute("/_auth/_layout/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const auth = useAuth();

  return (
    <div>
      <p>Hello "/_auth/dashboard"!</p>
      <p>Hi {auth.user}!</p>
    </div>
  );
}
