<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://ellyan.netlify.app/">
    <img src="./public/photos/icons/kirby-deadlift.png" alt="Kirby Lifting" width="170" height="100">
  </a>

  <h3 align="center">Ellyan Workout Tracker</h3>

  <p align="center">
    Deployment Link: https://ellyan.netlify.app/
    <br />
    App designed to create customized workout programs for my peers, enabling them to monitor their progress in real-time!
    <br />
    <br />
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

Ellyan Workout Tracker is designed to streamline and enhance your fitness coaching experience. With a user-friendly interface, it empowers you to efficiently track your clients' progress, provide personalized workouts, and receive valuable feedback.

Key Features:

1. Customized Workouts:

   - Easily assign personalized workouts tailored to each client's fitness goals and preferences.

2. Automated Recommendations:

   - The app intelligently calculates and suggests the optimal weight, reps, and sets for each exercise based on individual capabilities and progress.

3. Feedback Loop:

   - Foster communication with clients through built-in feedback features, allowing you to make real-time adjustments to their workout plans.

4. Progress Tracking:

   - Clients can seamlessly track their progress, logging completed exercises, weights lifted, and overall achievements.

5. Personal Records:

   - The app automatically highlights personal records, motivating clients by showcasing their improvements over time.
  

## Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* React
* Express
* PostgresSQL
* Node.JS
* Typescript

## Local Setup

### Server
  
Download the server repo https://github.com/Leeyanhawrt/ellyan-workout-tracker-server and install dependencies

npm install
Initialize the Postgres database

npm run db:reset
Create a .env file with the following:

NODE_ENV={development}
JWT_SECRET_ACCESS_KEY={YOUR SECRET ACCESS KEY}
DB_HOST={YOUR DB HOST}
DB_USER={YOUR DB USERNAME}
DB_PASSWORD={YOUR DB PASSWORD}
DB_DATABASE={YOUR DB NAME}
DB_PORT={YOUR DB PORT}

Start the development server
npm start

### Client

Download the client repo and install dependencies

npm install
Create a .env file with the following:

VITE_APP_BACKEND = {EXPRESS SERVER URL}
VITE_APP_ENV = {development}
VITE_PUBLIC_PATH = {'/public/photos'}

REACT_APP_BACKEND={EXPRESS SERVER URL}

Start the react application
npm start


