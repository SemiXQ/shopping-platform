# Full-stack: Shopping Platform with Mocked Fashion Trend Statistics

## Tech stack
<ul>
  <li> <b>Front-end</b> with TypeScript, Angular. </li>
  <li> <b>Back-end</b> with Python, Flask, MongoDB.</li>
  <div>--------------------------------------------</div>
  <li> <b>Authentication</b> with jwt, werkzeug.</li>
  <li> <b>State Management</b> (front-end) with ngx-webstorage.</li>
  <li> <b>Back-end Cache</b> with Flask-Caching</li>
  <li> <b>Map</b> using OpenLayers with OpenStreetMap(OSM).</li>
  <li> <b>Charts</b> with Chart.js.</li>
</ul> 

## Demo

[<img align="left" width="30" src="https://thumbs.dreamstime.com/z/play-video-icon-movie-icon-video-player-symbol-play-video-icon-flat-style-movie-icon-video-player-symbol-isolated-white-115799224.jpg?w=768">Link to demo video](https://drive.google.com/file/d/1OxyHEiUXd2HatxHi_kvKbiEObke_XLo1/view?usp=drive_link)

## How to Run

After cloning this repo and installed all dependencies (npm packages and python3 libraries), please follow the following steps to run the project locally:

### Step 1: prepare env constants and database for both front-end and back-end
> ### Back-end
> (1) Please follow the instructions in ./backend/src/env/constants_listing.txt and provide values to those constants in constants.py under the same folder.
> > If you would like to read sample data from json file, other than fetching from MongoDB, then please set `DATA_FROM="local"` in constants.py.
> 
> (2) If you want to use MongoDB, Please create a database called "shopping-angular" with four collections(cart, goods, stores, users) on your cluster and import json files in
> ./backend/src/test_data respectively.

> ### Front-end
> Please follow the instructions in ./frontend/app-frontend/src/app/env/constants.txt and provide values to those constants in constants.ts under the same folder.

### Step 2: Run front-end and back-end
> ### Back-end
> Under ./backend/src folder, run `flask run`.
>
> ### Front-end
> Under ./frontend/app-frontend/src folder, run `ng serve`.

### Step 3: Open http://localhost:4200/ to play around

## Overview

### Home Page
![Home Page](/demos/home.png)

### Store Page

When you click on the location labels, it will display the store's name. If you hover the mouse on the store's name, then it will show you the address of the store.

You can zoom in or out the map and explore that feature.

![Store Page](/demos/stores.png)

### Trend Page
![Trend Page](/demos/trend.png)

### Login Page
![Login Page](/demos/login.png)

### Shopping Cart Page
![Shopping Cart Page](/demos/shopping-cart.png)
