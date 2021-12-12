# Dashboard Frontend

Front-end for the Recycling Assistant Dashboard

### Credits

- [now-ui-dashboard-react](https://github.com/creativetimofficial/now-ui-dashboard-react)

### Primary Files

- [Admin.js](./src/layouts/Admin.js) : Outer Layout of dashboard
- [Dashboard.js](./src/views/Dashboard.js) : Inner Layout of dashboard
- [charts/](./src/charts) : Directory for Chart Components

### Requirements

This project is based on React, `npm` should be installed.

```sh
$ sudo apt install npm
```

### Installation

Downloade the required node modules by `npm install`. It will create a new directory of `node_modules/` and download the required packages according to `package.json` file.

### Startup

```sh
$ npm start
```

Now you can access the dashboard in `127.0.0.1:3000/recycle-assistant-dashboard`.

### Open the dashboard
- Go to `127.0.0.1:3000/recycle-assistant-dashboard`
- For admin, it is possible to access through `127.0.0.1:3000/admin/dashboard`
- Now you can see the charts and tables on the dashbard!
- <img src="https://user-images.githubusercontent.com/59322692/145397073-857b19af-bec3-435b-a6e6-cab9e0c84859.jpg"
alt="dashboard intro" style="width: 400px;" />

### Change the Analysis date
- In the middle of the window, there is a datepicker. Click it
- Select or type which date you want to analyze.
- After focusing out, the new page will be loaded automatically
- <img src="https://user-images.githubusercontent.com/59322692/145397558-a761c185-97c5-423d-a98a-053db50ef892.jpg"
alt="dashboard_change_date" style="width: 400px;" />

### See the detailed numerics
- On the graphs, detailed figures are available
- When the cursor is on the dot or box, a tooltip shows  the y labels and values.
- <img src="https://user-images.githubusercontent.com/59322692/145397346-7322d5b6-5914-45b5-bbe5-2011ad42281d.jpg"
alt="dashboard_hover" style="width: 400px;" />
