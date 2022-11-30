## Description
This is a backend test from [Outvio](https://outvio.com/) using [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

Here is the [test explanation](https://docs.google.com/document/d/1mGn8RLXLMaiKpCpNVUxGdB4S6Jti6EOt-4Pk-d7n4KY/). 

**Tasks done**: From 1 to 9.

---

## Installation (All Environments)
Obs: *You need go to the base directory and run*
```bash
# Copy the file .env.example to .env;
# For take the environments variables (If you need you can change it inside the .env file);
$ cp .env.example .env
```

---

## Installation > Development (If you have redis running in your machine at the port 6369)
Obs: *You need go to the base directory and run*
```bash
# For install all dependencies
  $ npm install
  # OR
  $ yarn install

# For running the server
  $ npm start
  # OR
  $ yarn start
```

## Installation > Production (If you have docker compose installed)
Obs: *You need go to the base directory and run*
```bash
# For run redis, and server images/containers;
$ docker-compose up
```

---

## Scripts

```bash
## BUILD
  $ npm run build
  # OR
  $ yarn build

## RUNNING
# development
  $ npm start
  # OR
  $ yarn start

# watch mode
  $ npm run start:dev
  # OR
  $ yarn start:dev

# production mode (needs run command build before)
  $ npm run start:prod
  # OR
  $ yarn start:prod


## TESTS
# all tests
  $ npm run test
  # OR
  $ yarn test

# all tests watch mode
  $ npm run test:watch
  # OR
  $ yarn test:watch

# all tests coverage
  $ npm run test:coverage
  # OR
  $ yarn test:coverage

# unit tests
  $ npm run test:unit
  # OR
  $ yarn test:unit

# e2e tests
  $ npm run test:e2e
  # OR
  $ yarn test:e2e

## LINT
```

# Swagger Docs
*After run the server you can see the documentation on path `/docs`.*