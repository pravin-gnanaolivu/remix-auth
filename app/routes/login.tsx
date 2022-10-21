import {
  Form,
  Link,
  useLoaderData,
  useSearchParams,
  useTransition,
} from "@remix-run/react";
import { ActionArgs, json, LoaderArgs, MetaFunction } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { createUserSession, getSession } from "~/services/session.server";
import { safeRedirect } from "~/utils";

// Second, we need to export an action function, here we will use the
// `authenticator.authenticate method`
export async function action({ request }: ActionArgs) {
  const formData = await request.clone().formData();

  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");
  const remember = formData.get("remember");

  // we call the method with the name of the strategy we want to use and the
  // request object, optionally we pass an object with the URLs we want the user
  // to be redirected to after a success or a failure

  const user = await authenticator.authenticate("user-pass", request, {
    failureRedirect: "/login",
  });

  return createUserSession({
    request,
    user,
    remember: remember === "on" ? true : false,
    redirectTo,
  });
}

// Finally, we can export a loader function where we check if the user is
// authenticated with `authenticator.isAuthenticated` and redirect to the
// dashboard if it is or return null if it's not

export async function loader({ request }: LoaderArgs) {
  // If the user is already authenticated redirect to /dashboard directly
  await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
  const session = await getSession(request.headers.get("cookie"));
  const error = session.get(authenticator.sessionErrorKey);
  return json({ error });
}

export const meta: MetaFunction = () => {
  return {
    title: "Remix Auth Login Example",
  };
};

export default function LoginRoute() {
  const { error } = useLoaderData();
  const [searchParams] = useSearchParams();
  const transition = useTransition();
  const isSubmitting =
    transition.submission?.formData.get("intent") === "login";
  const redirectTo = searchParams.get("redirectTo") || "/";
  return (
    <div className="flex min-h-full flex-col justify-center">
      <div className="mx-auto w-full max-w-md px-8">
        <Form method="post" className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="mt-1">
              <input
                id="email"
                required
                autoFocus={true}
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={undefined}
                aria-describedby="email-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={undefined}
                aria-describedby="password-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="remember"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          {error && <p className="text-red-500">{error.message}</p>}
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <div className="flex items-center justify-between gap-6">
            <button
              type="submit"
              name="intent"
              value="login"
              className="w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
            >
              {isSubmitting ? "Please wait..." : "Log in"}
            </button>
          </div>
        </Form>
        <div className="flex justify-between pt-6">
          <Link to="/signup" className="text-blue-600 underline">
            New here?
          </Link>
          <Link to="/forgot-password" className="text-blue-600 underline">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}
