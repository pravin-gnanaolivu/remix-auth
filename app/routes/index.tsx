import { Form, Link, useLoaderData } from "@remix-run/react";
import { LoaderArgs, json } from "@remix-run/node";
import type { User } from "~/models/user.server";
import { authenticator } from "~/services/auth.server";

type LoaderData = {
  user: string;
};

export const loader = async ({ request }: LoaderArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return json({ user: `${user?.firstName + " " + user?.lastName}` });
};

export default function Index() {
  const { user } = useLoaderData() as LoaderData;
  return (
    <div
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}
      className="mx-auto w-full max-w-md px-8"
    >
      {user ? (
        <>
          <h1>Welcome {user}</h1>
          <Form action="/logout" method="post">
            <button
              type="submit"
              className=" rounded bg-gray-500  py-2 px-4 text-white hover:bg-gray-600 focus:bg-gray-400"
            >
              logout
            </button>
          </Form>
        </>
      ) : (
        <Link to="login">Login</Link>
      )}
    </div>
  );
}
