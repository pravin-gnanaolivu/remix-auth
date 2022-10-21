import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "~/services/session.server";
import invariant from "tiny-invariant";
import { findUser, User, verifyLogin } from "~/models/user.server";

export let authenticator = new Authenticator<User>(sessionStorage, {
  sessionKey: "accessToken",
  sessionErrorKey: "my-error-key",
});

authenticator.use(
  new FormStrategy(async ({ form }) => {
    // Here you can use `form` to access and input values from the form.
    // and also use `context` to access more things from the server
    let email = form.get("email"); // or email... etc
    let password = form.get("password");

    invariant(typeof email === "string", "email must be a string");
    invariant(email.length > 0, "email must not be empty");

    invariant(typeof password === "string", "password must be a string");
    invariant(password.length > 0, "password must not be empty");

    // You can validate the inputs however you want

    const userExists = await findUser(email);
    if (!userExists) {
      throw new Error(`User was not found. Hit signup and join us ✌`);
    }

    const user = await verifyLogin(email, password);
    if (!user) {
      throw new Error("Password was incorrect. Try Again 😒");
    }

    // And return the user as the Authenticator expects it
    return user;
  }),
  "user-pass"
);
