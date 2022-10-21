import type { MetaFunction } from "@remix-run/node";
import {json} from "@remix-run/node";
import styles from "./styles/app.css";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { getENV } from "env.server";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  ENV: ReturnType<typeof getENV>
}

export async function loader() {
  return json<LoaderData>({
    ENV: getENV()
  })
}

export default function App() {
  const data = useLoaderData() as LoaderData

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <script
         dangerouslySetInnerHTML={{ __html: `window.ENV = ${JSON.stringify(data.ENV)}`}}
        />
        <LiveReload />
      </body>
    </html>
  );
}
