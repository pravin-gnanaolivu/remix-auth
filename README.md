# Remix Auth Example

![Remix Auth](https://www.simplilearn.com/ice9/free_resources_article_thumb/The_Importance_of_User_Authentication_Methods_in_Cyber_Security.jpg)

**Remix Auth** Library is really cool😎 and easy to use. Here I'm adding an basic login to authenticate with remix-auth and signup form with validation using **remix-validation-form** to make validation easy.

I deployed this in vercel, you can use the below link 

[Remix Auth Demo](https://remix-auth-rho.vercel.app/)


## What's in the stack

- Production-ready [heruko postgre-sql Database](https://sqlite.org)
- Email/Password Authentication with [cookie-based sessions](https://remix.run/docs/en/v1/api/remix#createcookiesessionstorage)
- Database ORM with [Prisma](https://prisma.io)
- Styling with [Tailwind](https://tailwindcss.com/)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)

## Library used
- Remix Auth [For secure cookie based Authentication](https://github.com/sergiodxa/remix-auth)
- Remix Validated Form [To Make form validation easy](https://www.remix-validated-form.io/)

## Deployment

After having run the `create-remix` command and selected "Vercel" as a deployment target, you only need to [import your Git repository](https://vercel.com/new) into Vercel, and it will be deployed.

If you'd like to avoid using a Git repository, you can also deploy the directory by running [Vercel CLI](https://vercel.com/cli):

```sh
npm i -g vercel
vercel
```

It is generally recommended to use a Git repository, because future commits will then automatically be deployed by Vercel, through its [Git Integration](https://vercel.com/docs/concepts/git).

## Development

To run your Remix app locally, make sure your project's local dependencies are installed:

```sh
npm install
```

Afterwards, start the Remix development server like so:

```sh
npm run dev
```

Open up [http://localhost:3000](http://localhost:3000) and you should be ready to go!

If you're used to using the `vercel dev` command provided by [Vercel CLI](https://vercel.com/cli) instead, you can also use that, but it's not needed.
