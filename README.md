## Description <!-- omit in toc -->
This is a sample e-commerce GraphQL application using Nest.js, showcasing key functionalities such as product, cart, user operations, all secured with JWT authentication. The application leverages Prisma as the ORM and PostgreSQL as the database.

## Table of content <!-- omit in toc -->
- [Project setup](#project-setup)
- [Environment Variables](#environment-variables)
- [Compile and run the project](#compile-and-run-the-project)

## Project setup
```bash
$ pnpm install
```

## Environment Variables
Create `.env` files with the **following** keys:

- `DATABASE_URL`: URL for your PostgreSQL database.
- `TOKEN_SECRET_KEY`: Secret key for JWT authentication.

## Compile and run the project
```bash 
# development
$ pnpm start

# watch mode
$ pnpm start:dev
```
## Author
[Saman Kefayatpour](https://www.linkedin.com/in/samankefayatpour/)
