# Getting Started with Prisma App

This project was bootstrapped with prisma typescript app and used npx prisma init command to build the project architecture

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the server at localhost port 5001

### `npx prisma studio`

To see the GUI for the SQL lite database with Prisma ORM

### `npx prisma generate`

To generate the Prisma Client code based on your Prisma schema

### `npx prisma migrate dev`

To run migrations and update your database schema based on the changes defined in your Prisma schema

The app consists of various endpoints to run CRUD operations on courses, coach or members Tables. The object relations are descriptive in the schema.
Look at the routes folder to check all the routes
rest.http file includes some sample requests to test the app
