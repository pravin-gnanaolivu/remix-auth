import { Link } from "@remix-run/react";
import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { createUser, findUser } from "~/models/user.server";
import { getSession } from "~/services/session.server";
import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm, validationError } from "remix-validated-form";
import { z } from "zod";
import FormInput from "~/components/FormInput";
import SubmitButton from "~/components/SubmitButton";

const schema = z
  .object({
    firstName: z.string().min(5, {
      message:
        "First name is required and it minimum length should be atleast 5 characters",
    }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Must be a valid email"),
    password: z.string().min(6, {
      message: "Password is required and it should be atleast 6 characters",
    }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ["confirmPassword"],
    message: "Password should match",
  });

const validator = withZod(schema);

export const action: ActionFunction = async ({ request }) => {
  //remix-validation-form

  const validator = withZod(
    schema.refine(
      async (data) => {
        const isEmailExists = await findUser(data.email);
        return !isEmailExists;
      },
      {
        message: "Whoops! Email ID already exists 😒",
        path: ["email"],
      }
    )
  );

  const formData = await validator.validate(await request.formData());
  if (formData.error) return validationError(formData.error);
  const { firstName, lastName, email, password } = formData.data;

  try {
    await createUser({ firstName, lastName, email, password });
  } catch {
    throw new Error("Uh oh! Seems there is an issue, sorry😒");
  }

  return json({ message: "User Created 😍", status: 200 });
};

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
  const session = await getSession(request.headers.get("cookie"));
  const error = session.get(authenticator.sessionErrorKey);
  return json({ error });
};

export default function SignUpRoute() {
  return (
    <div className="flex min-h-full flex-col justify-center">
      <div className="mx-auto w-full max-w-md px-8">
        <ValidatedForm
          validator={validator}
          method="post"
          className="space-y-6"
        >
          <FormInput name="firstName" label="Your First Name" type="text" />
          <FormInput name="lastName" label="Your Last Name" type="text" />
          <FormInput name="email" label="Your Email address" type="email" />
          <FormInput name="password" label="Your Password" type="password" />
          <FormInput
            name="confirmPassword"
            label="Confirm your password"
            type="password"
          />
          <SubmitButton btnName="Join Us" btnTranstionName="Please wait..." />
        </ValidatedForm>
        <div className="flex justify-between pt-6">
          <Link to="/login" className="text-blue-600 underline">
            Been here already?
          </Link>
        </div>
      </div>
    </div>
  );
}
