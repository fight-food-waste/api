# Fight Food Waste API

![eslint-airbnb](https://badgen.net/badge/eslint/airbnb/red?icon=airbnb)

Stack: Express + MySQL via Knex (query builder).

## Routes

| Method | Path                  | Parameters                                        | Returns         |
|--------|-----------------------|---------------------------------------------------|-----------------|
| GET    | `/`                   |                                                   | Welcome message |
| POST   | `auth`                | `{email, password}`                               |                 |
| GET    | `/donor`              |                                                   | Donor           |
| GET    | `/donor/:id`          | Donor ID                                          | Donor           |
| POST   | `/bundle`             |                                                   | Bundle ID       |
| POST   | `/bundle/:id/close`   | Bundle ID                                         |                 |
| GET    | `/bundle/:id`         | Bundle ID                                         | Bundle          |
| GET    | `/bundle/donor/:id`   | Donor ID                                          | Bundle          |
| POST   | `/product`            | `{name, barcode, quantity, bundle_id, expiration_date}` | Product ID      |
| GET    | `/product/:id`        | Product ID                                        | Product         |
| GET    | `/product/bundle/:id` | Bundle ID                                         | Product         |

## Architecture

The entrypoint is `bin/www` which launches `app.js`.

Routes are added to the Express router by importing the files in `routes/`.

Each route forwards to a controller stored in `controllers/`.

Controllers validate input (GET/POST) with `joi`.

Controllers can make database requests by importing `knex` and the parameters in `knexfile.js`.

MySQL parameters are set using environment variables. `npm start` uses `dotenv` preloading so these variables can be put in `.env`. An example is available at `.env.example`.

A ready-to-use MySQL server can be launched via `docker-compose up -d` (see the `docker-compose.yml`).

[Helmet](https://helmetjs.github.io/) is an Express middleware used to set some HTTP headers to improve security.

Tests are run with `mocha` and `supertest`, via the files in `tests/`.

When running `npm test`, a bash script will run the migrations (= init the database) with the knex CLI using `migrations/`. Sample data will be inserted with `seeds/`.

Code coverage is automatically shown with `nyc`. Linting is done with `eslint`.

When pushing a commit to, a pipeline will check the linting and run the tests.
