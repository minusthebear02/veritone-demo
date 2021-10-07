# Welcome to my Veritone Demo

This is a simple shopping list app used to group the items a user would want to buy from a store and track whether or not the item has been purchased yet. Nothing crazy here.

Let's get started!

## To run the backend

First, clone the entire repo, which includes the frontend and backend in separate directories.

From the `backend` directory, run `npm install` to install the necessary dependencies.

Once completed, you'll need to set up your `.env` file with DB connection info. For ease of setup and demo, this project is using a web hosted, free tier Postgresql database called ElephantSQl. Contact me to get the contents of this `.env` file.

After both of these steps are completed, run `npm run dev` from the `backend` directory to start the server.

## To run the frontend

From the `frontend` directory, run `npm install` to install the necessary dependencies.

Once completed, run `npm start`. When prompted, type `y` to run it on a different port than the backend is running on.

This should automatically open your browser to http://localhost:3001 where you'll be prompted to either Login or Sign Up. Feel free to sign up with your name, email address and a password.

> **_IMPORTANT: passwords are stored in plain text for this demo exercise. Do not use a meaningful password!!!!_**
