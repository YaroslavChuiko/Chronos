<head>
    <div align="center">
        <h1 align="center">Chronos-Backend</h1>
    </div>
</head>

<div align="center">
  <img alt="Node.js" src="https://img.shields.io/badge/-Node.js-339933.svg?style=for-the-badge&logo=node.js&logoColor=white" />
  <img alt="Express" src="https://img.shields.io/badge/-Express-000000.svg?style=for-the-badge&logo=express&logoColor=white" />
  <img alt="MySQL" src="https://img.shields.io/badge/-MySQL-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white" />
  <img alt="Prisma" src="https://img.shields.io/badge/-Prisma-2D3748.svg?style=for-the-badge&logo=prisma&logoColor=white" />
  <img alt="JSON Web Tokens" src="https://img.shields.io/badge/-JWT-000000.svg?style=for-the-badge&logo=JSONWebTokens&logoColor=white" />
  <img alt=".ENV" src="https://img.shields.io/badge/-.ENV-ECD53F.svg?style=for-the-badge&logo=.ENV&logoColor=black" />
  <img alt="Nodemon" src="https://img.shields.io/badge/-Nodemon-76D04B.svg?style=for-the-badge&logo=nodemon&logoColor=white" />
  <img alt="Docker" src="https://img.shields.io/badge/-Docker-2496ED.svg?style=for-the-badge&logo=docker&logoColor=white" />
</div>

## About

This is a calendar application that lets you keep track of all your events (arrangements, tasks, and reminders).

## Requirements & dependencies

- Node.js (version 16.17.1 or higher)
- NPM (version 9.1.1 or higher)
- MySQL
- Docker (optional)

## Install & run

Prior to setup, create an `.env` file based on the `.env.example` file, and fill in the required vars.
Then proceed:

Locally:

- Install all the required dependencies, listed above.
- Run `npm install` in the root directory of the repository.
- Optionally, to run seeders & migrations, run `npm run migrate`.
- Run `npm start` to start the server.

Via Docker:

- Enter the `api/` directory of the repository.
- Run `docker compose up -d`.
- Optionally, to run seeders, run `docker compose run --rm api node prisma/seeders`

You can now access the API, using the host and port, provided in the `.env` file.

## Entity-relationship diagram

![Untitled](https://user-images.githubusercontent.com/32570823/206445241-c92ca862-372f-471d-8055-cc6396259240.png)
