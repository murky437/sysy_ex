## Dev setup

Prerequisites:
- repository is cloned and you are in root dir
- docker daemon is running (get docker from: https://www.docker.com/)

Build and start all required docker containers:

    docker compose up --build --force-recreate

After the containers are running, you can access the application at:
- front end: http://localhost:8801
- back end: http://localhost:8802
- db admin: http://localhost:8803

You can run the tests inside php container like this:

    docker exec -it sysy_ex-php-1 php artisan test


## Tech choices

I chose Laravel for the back end, since it takes me from 0 to 80% the fastest. Was thinking of doing it in plain Go, but I would have needed to spend more time on writing framework code to make it clean (file structure, dependency injection container, CORS, data access layer, migrations, etc...).

I chose React for front end, because it is the most popular SPA framework, is an optional enhancement for this task, and it doesn't take longer to set up compared to server side rendered pages.

I chose MariaDB for database, because it's well established and a good open-source alternative to MySQL.

I chose Nginx for dev server, because it is pretty easy to set up, and I don't need to worry about it afterward. Plus I would later use it for deployment anyway.


## Implemented features

- core
  - View a list of projects
  - Add a new project
  - Store projects in database
- optional
  - Simple setup with Docker
  - Using real database (MariaDB)
  - Using React for front end
  - Add form validation error handling
  - Integration tests
  - Documentation in README.md
  - Deleting projects
  - Login (front end only)


## Next steps...

- Add login and logout endpoints (api version of Laravel fortify?)
- Hook up front end login with api
- Add default user (via migration)
- Add /register page and link to it from login
- Add register endpoint (api version of Laravel fortify?)
- Add update endpoint and update form (modal?)
- Add .gitlab-ci.yml deployment to server

