import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "~/services/session.server";
import invariant from "tiny-invariant";
import { createUser, findUser, User, verifyLogin } from "~/models/user.server";
import { GoogleStrategy, SocialsProvider } from "remix-auth-socials";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Google CLIENT_ID and CLIENT_SECRET should be provided");
}

export let authenticator = new Authenticator<User>(sessionStorage, {
  sessionKey: "accessToken",
  sessionErrorKey: "my-error-key",
});

authenticator.use(
  new FormStrategy(async ({ form }) => {
    let email = form.get("email");
    let password = form.get("password");

    invariant(typeof email === "string", "email must be a string");
    invariant(email.length > 0, "email must not be empty");

    invariant(typeof password === "string", "password must be a string");
    invariant(password.length > 0, "password must not be empty");

    const userExists = await findUser(email);
    if (!userExists) {
      throw new Error(`User was not found. Hit signup and join us ✌`);
    }

    const user = await verifyLogin(email, password);
    if (!user) {
      throw new Error("Password was incorrect. Try Again 😒");
    }

    return user;
  }),
  "user-pass"
);

authenticator.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `https://remix-auth-rho.vercel.app/auth/${SocialsProvider.GOOGLE}/callback`,
    },
    async ({ profile }) => {
      console.log({ profile });
      const { email, given_name, family_name } = profile._json;

      const existingUser = await findUser(email);
      if (existingUser) {
        return existingUser;
      }

      const user = await createUser(
        {
          firstName: given_name,
          lastName: family_name ? family_name : "",
          email,
        },
        ""
      );
      return user;
    }
  )
);
