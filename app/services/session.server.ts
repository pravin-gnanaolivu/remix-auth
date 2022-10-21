import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { authenticator } from "./auth.server";
import type { User } from "~/models/user.server";

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: ["s3cr3t"],
    secure: process.env.NODE_ENV === "production",
  },
});

export async function createUserSession({
  request,
  user,
  remember,
  redirectTo,
}: {
  request: Request;
  user: User;
  remember: boolean;
  redirectTo: string;
}) {
  const session = await sessionStorage.getSession(
    request.headers.get("cookie")
  );
  session.set(authenticator.sessionKey, user);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember
          ? 60 * 60 * 24 * 1 // 1 Day
          : undefined,
      }),
    },
  });
}

export let { getSession, commitSession, destroySession } = sessionStorage;
