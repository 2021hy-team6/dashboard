# Recycle Assistant

Backend Service for the Recycle Assistant Project

### Requirements

Database services are managed on the docker container. Install `docker` and `docker-compose`.

- Docker : https://docs.docker.com/engine/install/
- Docker Compose : https://docs.docker.com/compose/install/

Intermediate server for statistics runs on `Python`. The required version is 3.6+. Check the installed version by `$ python3 --version`.

### (Optional) Configure Database Account

Database user and password is configured with the default value. If you want to change, edit following files.

- [User Name](./db/psql/postgres-user) : `usr_recm8` default
- [User Password](./db/psql/postgres-passwd) : `mysecretpassword` default

### (Optional) Configure Query Tool Account

Query Tool's account can be also changed. Go into [docker compose file](./db/docker-compose.yml), then change the following environment variables.

- PGADMIN_DEFAULT_EMAIL : `admin@example.com` default
- PGADMIN_DEFAULT_PASSWORD : `mysecretpassword` default

### Start up Database and Query Tool

A single `docker-compose.yml` file triggers the startup of both database and query tool.

```sh
$ cd recycle-assistant/db
$ sudo docker-compose up -d
```

Now the database is available on `127.0.0.1:6002`.
Database Console can be accessed through `127.0.0.1:6001`.
If there is failure, refer to this [trouble shooting guidance](./db/README#trouble-shooting).

### Startup Intermediate Server

```sh
$ cd recycle-assistant/dashboard
$ pip install -r requirements.txt
$ python ./entrypoint.py
```

Or, this service can be launched by this [Dockerfile](dashboard/Dockerfile).
The opened address is `127.0.0.1:5000`.

### Access to Query Tool

- Go to `127.0.0.1:6001`
- Default ID is `admin@example.com` and Password is `mysecretpassword`
- Change the account information in [this file](./db/docker-compose.yml)
    if necessary
- Finally you can use this tool! Detailed usages are in this [documentation](https://www.pgadmin.org/docs/pgadmin4/development/index.html).

- <img src="https://user-images.githubusercontent.com/59322692/145396802-e2e450c4-e3d0-496d-8619-75b7389d4a67.jpg"
alt="pgadmin page" style="width: 400px;" />