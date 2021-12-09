# Recycle Assistant

## User Guide

- Access to the database query tool
  - Go to `127.0.0.1:6001`
  - Default ID is `admin@example.com` and Password is `mysecretpassword`
  - Change the account information in [this file](./db/docker-compose.yml)
      if necessary
  - Finally you can use this tool! Detailed usages are in this [documentation](https://www.pgadmin.org/docs/pgadmin4/development/index.html).

  - <img src="https://user-images.githubusercontent.com/59322692/145396802-e2e450c4-e3d0-496d-8619-75b7389d4a67.jpg"
alt="pgadmin page" style="width: 400px;" />

- Open the dashboard
  - Go to `127.0.0.1:3000/recycle-assistant-dashboard`
  - For admin, it is possible to access through `127.0.0.1:3000/admin/dashboard`
  - Now you can see the charts and tables on the dashbard!

  - <img src="https://user-images.githubusercontent.com/59322692/145397073-857b19af-bec3-435b-a6e6-cab9e0c84859.jpg"
alt="dashboard intro" style="width: 400px;" />

- Change the Analysis date
  - In the middle of the window, there is a datepicker. Click it
  - Select or type which date you want to analyze.
  - After focusing out, the new page will be loaded automatically

  - <img src="https://user-images.githubusercontent.com/59322692/145397558-a761c185-97c5-423d-a98a-053db50ef892.jpg"
alt="dashboard_change_date" style="width: 400px;" />

- See the detailed numerics
  - On the graphs, detailed figures are available
  - When the cursor is on the dot or box, a tooltip shows  the y labels and values.

  - <img src="https://user-images.githubusercontent.com/59322692/145397346-7322d5b6-5914-45b5-bbe5-2011ad42281d.jpg"
alt="dashboard_hover" style="width: 400px;" />

## Installation Guide

### System Requirements

- OS : Linux
- Memory : 2GB Recommended
- Disk : 10GB available

### Software Requirements

- docker-compose >= 3
- Python >= 3.6
- npm >= 6

### Procedures

Clone Repositories
```sh
$ git clone https://github.com/2021hy-team6/recycle-assistant.git
$ git clone https://github.com/2021hy-team6/dashboard
```

Startup Database
```sh
$ cd recycle-assistant/db
$ sudo docker-compose up -d
```
Now database is available on `127.0.0.1:6002`.
Database Console can be accessed through `127.0.0.1:6001`.

Startup Intermediate Server
```sh
$ cd recycle-assistant/dashboard
$ pip install -r requirements.txt
$ python ./entrypoint.py
```
The opened address is `127.0.0.1:5000`.

Startup Dashboard Front-end
```sh
$ cd dashboard
$ npm install
$ npm start
```
Now you can access the dashboard in `127.0.0.1:3000/recycle-assistant-dashboard`.