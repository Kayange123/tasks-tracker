# `Taskier` - Tasks Management App

This project involves producing Collaborative app for managing projects and reach new productivity peaks. From startups to home office, the way team works and how they organize tasks, these can all be accomplished with Taskier

## Getting Started

First, clone this project to your local environment

```bash
git clone <repo link>
```

Then, run the development server:

```bash
npm install
# then
npm run dev
```

Lastly, Navigate to root folder, rename `.env.example` file to `.env` file and then fill in these lines

```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = enter_cleck_publishable_key;
CLERK_SECRET_KEY = enter_your_cleck_secret_key;
DATABASE_URL = "enter your mongodb connection link";
```

This project uses [`clerk`](https://clerk.com) for authentication, authorization and organization management. Head over to their [`website`](https://clerk.com) to grab your keys and paste them to the `.env` file.

## Additional grabs

This project assumes the system with these minimum requirements

```bash
 typescript >= "^5"
 node >= 18.16.4
```

## Technologies used

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

- [Clerk Documentation](https://clerk.com) - To provide the authentication and authorization to website.

- [Shadcn Documentation](https://shadcn.com) - For the styles of components and their interactivity.

- [Prisma Documentation](https://prisma.io) - The project uses Object Relational Maper, Prisma.

## Deployment

The project has live demo deployed on [`Vercel Platform`](https://vercel.com) who are the creators of Next.js.

Check out our live demo [`Taskier website`](https://taskier.vercel.app) for the visual design.
