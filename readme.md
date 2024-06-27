# WORKO AI

Basic API with all the common http methods to support CRUD operations on Users data.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
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

## Setup

### Prerequisites

Ensure you have the following installed:

- Node.js (version 20.x)
- npm

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/your-project.git
   cd your-project
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables:
   Create a .env file in the root directory and add the following:

   ```
   MONGODB_URL=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
   ```
