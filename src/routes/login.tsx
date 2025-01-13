import { useState } from "react";
import {
  createFileRoute,
  redirect,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { z } from "zod";

import { useAuth } from "../auth";
import { sleep } from "../utils/sleep";

const fallback = "/dashboard" as const;

export const Route = createFileRoute("/login")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || fallback });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const auth = useAuth();
  const router = useRouter();
  const navigate = Route.useNavigate();
  const search = Route.useSearch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLoading = useRouterState({ select: (s) => s.isLoading });

  const onFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    try {
      evt.preventDefault();
      const data = new FormData(evt.currentTarget);
      const fieldValue = data.get("username");

      if (!fieldValue) return;
      const username = fieldValue.toString();
      await auth.login(username);

      await router.invalidate();

      // This is just a hack being used to wait for the auth state to update
      // in a real app, you'd want to use a more robust solution
      await sleep(1);

      await navigate({ to: search.redirect || fallback });
    } catch (error) {
      console.error("Error logging in: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoggingIn = isLoading || isSubmitting;

  return (
    <div>
      Hello "/login"!
      <div>
        <h3>Login page</h3>
        {search.redirect ? (
          <p>You need to login to access this page.</p>
        ) : (
          <p>Login to see all the cool content in here.</p>
        )}
        <form onSubmit={onFormSubmit}>
          <fieldset disabled={isLoggingIn}>
            <div>
              <label htmlFor="username-input">Username</label>
              <input
                id="username-input"
                name="username"
                placeholder="Enter your name"
                type="text"
                required
              />
            </div>
            <button type="submit">
              {isLoggingIn ? "Loading..." : "Login"}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
