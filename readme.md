# WORKO AI

Basic API with all the common http methods to support CRUD operations on Users data.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Usage](#usage)
- [Testing](#testing)

## Introduction

We can get, add, update and delete users data using http request methods in the database

## Features

- GET : Retrieve all the users data
- GET : Retrieve the user data with id
- ADD : Insert a new user
- UPDATE : Modify the user data
- DELETE : Delete the user data

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- Joi
- Jest
- JsonWebTokens

## Usage

Open a web browser or use tools like Postman to interact with the API endpoints.

```
https://worko-ai.vercel.app
```

Endpoints:

1. GET /worko/user: Retrieve all users
2. GET /worko/user/id: Retrieve the users for id
3. POST /worko/user: Create a new user
4. PUT /worko/user/:id: Update a user by ID
5. PUT /worko/user/:id: Update a user by ID
6. DELETE /worko/user/:id: Soft Delete a user by ID

## Testing

Run this command to run all tests

```
npm test
```
