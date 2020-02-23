# Travel App

## Table of Contents

- [Installation](#installation)
- [Project Summary](#project-summary)
- [Development Strategy](#development-strategy)
- [Requirements](#requirements)
- [Support](#support)
- [Contributing](#contributing)

## Installation

You need to creata a `.env` file for setting the API_KEYS, also there is a setting for running some special tests on APIs (so we can switch them and avoid API queries when running tests) with RUN_API_TESTS:

```
GEONAMES_USERNAME = <GEONAMES_USERNAME>
DARKSKY_SECRET_KEY = <DARKSKY_SECRET_KEY>
PIXABAY_API_KEY = <PIXABAY_API_KEY>
RUN_API_TESTS = "0" # or "1" for running also API queries tests
```

For registering into the APIS follow this links and register:

- [Geonames API](http://www.geonames.org/export/web-services.html)
- [DarkSky API](https://darksky.net/dev)
- [Pixabay API](https://pixabay.com/api/docs/)

TODO:

## Project Summary

This project aims to give you the opportunity to put all of the skills you have learned into one project to build your own custom travel app. Due to the nature of this course, it is very JavaScript heavy, but it is still expected you create clean and appealing HTML/CSS. You will also be targeting the DOM, working with objects, and retrieving data from 3 APIs in which one of those is reliant on another to work. Finally, this is all going to be done in a Webpack environment, using an express server, and wrapped up with service workers.

For this project, refactor and test as much as possible while you are building. You should figure for every piece of functionality you add, you will likely spend just as much time testing and refactoring your code. If it takes you 5 hours to figure out the logic, it should likely take you another 5 hours determining that you wrote the best code possible. As your skills improve, this process will feel more natural. Make sure to remove any debugging code from your final submission.

The minimum requirements ask a fair amount from you, but the final app is quite simple. A roadmap to expand on the application and make it uniquely your own is provided.

### What We Built

You will be building a travel application. It’s common to pull basic data from an API, but many applications don’t just pull the weather, they pull in multiple types of data, from different sources and occasionally one API will be required to get data from another API.

The project will include a simple form where you enter the location you are traveling to and the date you are leaving. If the trip is within a week, you will get the current weather forecast. If the trip is in the future, you will get a predicted forecast. The OpenWeather API is fantastic but it doesn’t let you get future data for free and it’s not that flexible with what information you enter; we are going to use the Dark Sky API for you to see how another API accomplishes the same goals. Dark Sky has one problem, it only takes in coordinates for weather data -- it’s that specific. So, we’ll need to get those coordinates from the Geonames API. Once we have all of this data, we’ll want to display an image of the location entered; for this, we will be using the Pixabay API.

This may not sound like a lot, but there is a fair amount of moving pieces that rely on each other to work. You’ll need to plan out the logic of what you are trying to accomplish before you begin developing. There are a lot of paths you can take, and what you choose to display and how you display it is somewhat flexible. It is highly recommended that after you meet the minimum requirements in the rubric, you continue debugging the UX and improve the project.

## Requirements

This project requires you to build out a travel app that, at a minimum, obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs. Given that this is the Capstone project, it's highly encouraged for you to go above and beyond, adding additional functionality and customization to truly stand out with a project you are proud to have at the top of your portfolio!

### Project Rubric

Your project will be evaluated by a Udacity code reviewer according to the Travel Planner App [project rubric](https://review.udacity.com/#!/rubrics/2669/view). Please review for detailed project requirements.

## Development Strategy

It's very important that you plan your project before you start writing any code! Break your project down into small pieces of work and strategize your approach to each one. With these bite-sized amounts, it'll be easier to debug and fix any issues that appear.

Feel free to implement your own design workflow, but if you get stuck -- here is a walkthrough to get you up and running!

1.  **Start by duplicating your project 3 weather app.** Once duplicated, change the new project’s name to make certain you're not overwriting your old project. We are going to build off this project as a foundation.
2.  **Get webpack set up to work with this project.** Use the skills you learned in project 4 to get your development environment going.
    - Create your src folder first. The src folder should contain a client folder and a server folder.
    - Your server folder should contain your server.js content.
    - Your client folder should contain a js folder, media folder, styles folder, and views folder, as well as an index.js file.
    - Your application js should go into the js file, your css into styles, and your index.html into views.
    - Convert your stylesheet from a .css file to a .scss file
    - Remember that webpack builds a dist file. You’ll need to update your server js to access the dist folder. (Hint: app.use(express.what goes here?))
    - Your index.js file inside the client folder should import the main function of your application javascript, it should import your scss, and it should export your main function from your application javascript. But in order to import, where will you need to export it?
    - In project 4, you may have added your event listeners to the buttons themselves. For this project, you should be using .addEventListener(); If we are exporting functions from our application.js file, our event listeners can’t go there. Where can we put them? To call that exported function?
    - Now that your src folder is set up, it’s time to get webpack going. You should already have a few dependencies installed from project 3. We need to add babel, babel loader, css loader, file loader, html loader, html webpack plugin, node sass, sass loader, style loader, webpack, webpack cli, and webpack dev server. Refer to your project 4 to see what’s there, most of these should have been in use there.
    - Next, update the scripts in package.json. You will want to have test, dev, start, and build. NOTE: Start will be for your express server, dev will be so that you can take advantage of web dev server. It is possible depending on your setup to run both of these with one command.
    - Get your webpack config set up. Should be fairly similar to your language processing app webpack config. If you did not use webpack dev server in your language processing app, you will want to do so here. Additionally, using source maps will help you debug your css.
    - To get webpack running, you’ll want to first run npm run dev, then npm build to get your dist folder created. Once that is created you can run npm run dev and npm start simultaneously to have hot loading of your project as well as a working express environment. NOTE: If needed, reference the stripped-down version of project 3 with webpack in the starter documentation.

**3. Create an account with [Geonames](http://www.geonames.org/export/web-services.html).**
**4. Replace the openweather api with geonames api.** You already have one working api. What information needs to get adjusted so that instead of entering a zip code, you enter a city? We want to get the latitude, longitude, country, instead of getting the temperature, feeling, and date.

- The weather data array was named differently, what do we need to change the name to?
- The weather data only had 1 object in the array, the geoname api outputs multiple objects. How do we call the first object?

**5. Introduce a countdown.** You’ll need to add a text field to your project to get the date.

- What type of input should it be? What about cross browser rendering?
- We’re looking to see how soon the trip is, how can you get the information from the DOM and see how soon that date is?
- Where should you be storing that data once you have it?

**6. Create an account with [Dark Sky](https://darksky.net/dev).**
**7. Integrate the Dark Sky api similarly to how you integrated the geoname api.** What information needs to get adjusted for you to pull in the future weather? Getting a CORS error? Check out [this article](https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9) for some options. **NOTE:** If you see that your app is working, but it takes several clicks to get all of the data, think of why this could be. This is possibly the most challenging part of the project. There is a major hint located in the Before you Begin section. If you’re unable to figure it out, and your app still works with a few clicks, continue working on it, it may come to you later, or you’ll get guidance from your reviewer when you submit the app.

- How does the Dark Sky API distinguish from current forecast and future forecasts? Does the API change in any way?
- How will we include the date? What format does it need to be in? How can we change it to the appropriate format?

**8. Create an account with Pixabay.**
**9. Integrate the Pixabay API similarly to how you integrated the Geoname/Dark Sky APIs.** What information are you going to submit to the API to achieve an appropriate image? What if there are no results?

- What Parameters will you want to set to pull in images?
- How will you submit your data from the location field to a Pixabay URL parameter without having spaces in the url?

**10. Choose one of the items from the suggested list to add in.** The items vary in complexity, but you must choose at least 1, all others are optional.
**11. REFACTOR.** At this point, your code should be working properly. Ideally, refactoring happens while you are developing, but as a new developer, you often don’t have the whole picture in your head to be able to do so properly. Let’s clean the project up.

- Have you run your code through a linter? We request you still follow Udacity standards when the code is complete, but running it through an [eslinter](https://eslint.org/demo) is going to help you get started in refactoring.
- Are you using ES6 const and let?
- Are all your functions using ES6 arrow functions?
- Is your code DRY? Are there any pieces that would be better served as a helper function to avoid duplication?
- How is your code structured? Have you created functions for the main functionality with properly scoped variables? Starting out it’s likely that you will have a globally scoped variables on occasion until you learn more about closures and design patterns. But placing your code into functions is a great way to make your code more readable and a way to avoid globally scoped variables.
- Are your project files named in a way that makes sense?

**12.Add in services workers.** Refer to project 4 for guidance.

### Extend your Project Further - Roadmap/Strategy

You'l need to implement at least one of the below in the project. If you’re going to do any of the suggested tasks, it’s recommended that you hold off on service workers until you are closer to submitting. This is a good use for comments.

- Add end date and display length of trip.
- Pull in an image for the country from Pixabay API when the entered location brings up no results (good for obscure localities).
- Allow user to add multiple destinations on the same trip.
  - Pull in weather for additional locations.
- Allow the user to add hotel and/or flight data.
  - Multiple places to stay? Multiple flights?
- Integrate the [REST Countries API](https://restcountries.eu/) to pull in data for the country being visited.
- Allow the user to remove the trip.
- Use [Local Storage](https://www.taniarascia.com/how-to-use-local-storage-with-javascript/) to save the data so that when they close, then revisit the page, their information is still there.
- Instead of just pulling a single day forecast, pull the forecast for multiple days.
- Incorporate icons into forecast.
- Allow user to Print their trip and/or export to PDF.
- Allow the user to add a todo list and/or packing list for their trip.
- Allow the user to add additional trips (this may take some heavy reworking, but is worth the challenge).
  - Automatically sort additional trips by countdown.
  - Move expired trips to bottom/have their style change so it’s clear it’s expired.

### Project Rubric

You can check the [roject rubric](https://review.udacity.com/#!/rubrics/2669/view)

## Support

Please [open an issue](https://github.com/carlosloureda/FEND-Travel-App/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/carlosloureda/FEND-Travel-App/compare/).
