# recruitment-netguru

## Task:
```
We’d like you to build simple REST API for us - a basic movie database interacting with external API. Here’s full specification of endpoints that we’d like it to have:

POST /movies:
Based on passed data, other movie details should be fetched from http://www.omdbapi.com/ (or other similar, public movie database) - and saved to application database.
GET /movies:
Should fetch list of all movies already present in application database.
POST /comments:
Comment should be saved to application database
GET /comments:
Should fetch list of all comments present in application database.

Rules & hints:

Please consider those requirements as basic. We value a good code structure or additional functionalities.
During implementing the assignment use many different and appropriate layers (i.e. middleware), design patterns (i.e. serializers), and so on.
Don’t forget to test appropriate amount of code.
Usage of latest ECMAScript/TypeScript standard and features is encouraged.
The application's code should be kept in a public repository so that we can read it, pull it and build it ourselves. Remember to include README file or at least basic notes on application requirements and setup - we should be able to easily and quickly get it running.
Written application must be hosted and publicly available for us online - we recommend Heroku.
```

# Summary
This is a movie app based on omdbapi.com API. Generally in database I am persisting similar movie model to the one returned from OMDB API without few obsolete properties. I am aware that few things should be separated from this model and moved to different tables and connected via relations but because of deadline I've decided to keep data nested. I was not quite following task description as there was no relation between movies and comments and instead of that I did movies with comments. App can be tested using Docker or using instance of the app already deployed to Heroku. For automatic deployment I've used TravisCI, for tests Jest (can be run using command `npm run test`), for documenation Swagger and for validation Joi (in controllers, to fail fast). Application can be of course further developed by adding comments editing but for this it would be wise to have some authorization (for example using JWT tokens).

## Stack:
   - node v10.16.3. You can use nvmrc to change version of node
   - Postgres 11.2

## Development
- `npm run build` - build app
- `npm run clearBuild` - remove `build` directory
- `npm run start:dev` - Start server in development mode
- `npm run test` - run tests
- `npm run migrate` - Run all migrations
- `npm run migrate:undo` - revert all migrations
- `npm run build:prod` - build docker image with app
- `npm start` - start app

To be able to run server you need `.env` file with defined process variables
```
DB_USERNAME=postgres
DB_PASSWORD=postgres_password
DB_DATABASE=postgres
DB_HOST=postgres
DB_PORT=5432
PORT=9000
NODE_ENV=dev
```

## Dev
To run app by docker - `docker-compose up --build`.
To run migrations you have to use command `docker exec -it app /bin/sh` and inside container use `npm run migrate`


## Prod
Prod version is available on https://netguru-movie.herokuapp.com/

## Swagger
Swagger: /api-docs/