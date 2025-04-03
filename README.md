# FoodieMate

The second of two open-ended projects where I worked in a team of six to build and deploy a full-stack application. The only strict requirements given were a provided core tech stack and the goal for the app being to privately organize some information. The overall result for this project was an A :)

[FoodieMate](https://purple-coast-041010610.5.azurestaticapps.net/) (Link up as of 4/3/25, but login isn't available so can't do much)

## Overview

FoodieMate is an all-in-one food planner that manages ingredients, recipes, and weekly meals. 
Core features include: 
- recipe management with image and camera support (via [Cloudinary](https://cloudinary.com/))
- ingredient lists and tracking
- meal planning with existing user recipes
- nutrition calculater and displays for both ingredients and recipes (via [Edamam](https://www.edamam.com/) and [Google Charts](https://developers.google.com/chart))
- home screen install options to download the app to a device. 

The project is a serverless single-page application(SPA) built using React with React Router and the [Bulma](https://bulma.io/) CSS framework. User authentication and the NoSQL database used were provided and hosted by [Azure Cloud services](https://azure.microsoft.com/en-us/) and the project was hosted using the same. Serverless functions for data processing were created using [Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview) with Node.js.

## Mockup Images

### Home page
![not logged home page](./mockup_images/not_log_home_page.png?raw=true)

### User home page
![user home page](./mockup_images/user_home_page.png?raw=true)

### Recipe home page
![recipe home page](./mockup_images/recipe_home_page.png?raw=true)

### Create recipe page
![create recipe page](./mockup_images/create_recipe_page.png?raw=true)

### About recipe page
![about recipe page](./mockup_images/about_recipe_page.png?raw=true)

### Plans page
![plans page](./mockup_images/plans_page.png?raw=true)


## Screenshots of Site

### Home Page
User shopping list and static display of meal plans.
![home page](./demo_images/foodiemate_home.png)

### Recipes Page
View user's recipes under different categories along with a search. Can create new recipes from here or click on recipes to view details.
![recipe page](./demo_images/foodiemate_recipes.png)

### Plans Page
Set mealplans using your recipes here. Can set breakfast/lunch/dinner for future days.
![plans page](./demo_images/foodiemate_plans.png)

### Nutrition Page
Nutrition tool to get information on ingredients. Comes with table and graph information.
![nutrition page](./demo_images/foodiemate_nutri.png)

### Recipe Create
Create page for new recipes. Set names, tags, steps, ingredients, images. Image upload can be done using device camera.
![creating a recipe](./demo_images/foodiemate_create.png)

### Recipe Details
Page for each recipe. Shows name, tags, steps, ingredients, and an image of the item (if provided). Also option to view nutrients of recipe given the ingredients. Can edit or delete recipe from this page.
![details of a recipe](./demo_images/foodiemate_details.png)

