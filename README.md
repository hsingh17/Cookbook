# Cookbook Web App

## Background
This project is a web app I made to display meals to the user from [MealDB](https://www.themealdb.com/api.php).

## Video presentation
If you would rather watch me explain and demo the web app, then watch this [video](todo)

## What can you do with the web app?
Here are the features available right now:
1. Browse from over 200 recipes.
2. Filter recipes based on: alphabetical sorting, area from which the meal originates from, category of meal, or the number of favorites a meal has from other users.
3. Login/Signup with an account.
4. Log out from an account.
5. Favorite meals you find interesting.
6. Delete from the favorite meals.

## What technolgies were used?
- [React](https://reactjs.org/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Heroku](https://www.heroku.com/)

## What is the web app's architecture?
The following is how the web app is layed out.

The user interfaces with the frontend created with React and React Bootstrap. The user's HTTP requests are then sent to the backend Express server where, depending on the route, it will either fetch from the external API at MealDB or perform operations on the PostgreSQL database.

## How can you use the app?
I have hosted the web app [here](TODO) on Heroku for you to use.

## What lessons were learned?
- Learned how to create a basic full stack application
- Learned the basics of functional React and React hooks
- Learned how to create a basic REST API with endpoints that service HTTP requests
- Learned how to interact with a PostgreSQL database via NodeJS
- Learned how to create a cookie-based session for a user
- Learned more about HTTP requests such as common headers, cookies, query/path/body parameters, and CORS 
- Learned how to host a full stack application on Heroku
- Learned how to make simple SVG animations

## What would I do differently next time?
- I would have used Next.js, but I just found out about it recently
- Instead of going out to MealDB for my API requests, I could have possibly created a table in my database that stored all the meals, possibly speeding up user requests
- Possibly using JWT (JSON Web Token) rather than cookies
- Rather than using React Bootstrap, I should have used normal CSS or SASS since I only used a few React Bootstrap components.
- I should have done more research on which database would have better suited my needs for this project (not to say PostgreSQL didn't)

## What if you find a bug?
I likely will not be making any changes on this project unless they are severely breaking the app. You can make a pull request, but I encourage you to make a fork of the repo and play it with yourself.

## How can you contribute?
Similar to above, I encourage you to make the changes you wish in your own fork of the repository.

## Credits
-[MealDB](https://www.themealdb.com/api.php)
    - API used in the project
- [Pexels](https://www.pexels.com/video/flatlay-ingredients-5865849)
    - Background video
- [Undraw](https://undraw.co/) 
    - SVG of man barbequing
    - SVG of lost person
-[SVG Repo](https://www.svgrepo.com/)
    - SVG of recipe book
    - SVG of question mark
- [Favicon.io](https://favicon.io/)
    - Favicon of chef emoji
--- 
*Project by Harjot Singh*