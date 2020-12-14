# <a id='header'></a> INST377-Project23

*New Repository for INST377 Group Project Team 23*

**Members:** Matthew Chan, Taylor Green, Jian Soriano, Frazer Workneh

---
## <a id='readme'></a>I. README

* Title of your project
    - Prince George’s County Education Budget
* Description of your project
    - Our problem statement was “How do we display our findings from the 2020 budget categories and payees from the dataset of Prince George’s County to potential stakeholders in a clear and easy-to-understand manner on the laptop and phone devices?”
    
* Link to the Heroku instance where your application can be used
   - [INST377 Project 23](https://inst377-project23.herokuapp.com/): The Heroku link to our project website.
   
* Description of target browsers (iOS? Android? Which ones? Which versions?)
   - Target browsers include all laptop and phone devices.
   
* Link to User Manual
   - [INST377 Project 23 About Page](https://inst377-project23.herokuapp.com/about.html): The About Page of our website details what our project is. 
   - [INST377 Project 23 Documentation Page](https://inst377-project23.herokuapp.com/doc.html): The Documentation Page of our website details the different pages and how to use them. 
   
* Link to Developer Manual
   - [II. Developer Manual](#devmanual) section

---
## <a id='devmanual'></a>II. Developer Manual

* To install application and all dependencies, perform the following steps:
    1. Make a fork of this repo.
    1. Clone your fork onto your local machine from GitHub.
    1. Create a new local repository and copy the files from this repo into it.
    1. Modify README.md and docs/contributing.md to represent your project  

* How to run your application on a server
   - We ran our application on Heroku.
   
   - To run on local server:
       1. Open a terminal window in your VSCode editor by clicking "Terminal > New Terminal" in your menus.
       1. Install nodejs version higher than 13.2 from [https://nodejs.org/en/download/](https://nodejs.org/en/download/).
       1. Type 'npm install' in new terminal.
       - Once packages installed,
       1. Type 'npm start'. This will start 'node server.js' and open port 3000 (Default).
       1. Type '[localhost:3000](http://localhost:3000/) to run on Internet. 
   
   - To pull new changes:
   1. Open separate split terminal.
   1. Type 'git remote -v'.
   1. Type 'git pull __ main'
      - Ex: 'git pull origin main'.
   1. Make sure to commit new changes to main branch.
   
* How to run any tests you have written for your software
   - No additional tests written.
   - If want to run tests, make sure cypress installed and type 'npx cypress run'.
   - Write your own tests in a cypress file.
   
* The API for your server application - all GET, POST, PUT, etc endpoints, and what they each do
   - GET: returns data from a read request
     - a
   - POST: accepts user requests for information
     - a
   - PUT: accepts *different* user requests for information
     - a
   
* A clear set of expectations around known bugs and a road-map for future development.
   - ROAD-MAP for Next Step: 
      - Implement more features to answer more questions about the given data.
        - Ex: more attributes like zip code that were not addressed in our web application.
      - Implement a spatial visualization of budget payments. 
      - Utilize fiscal data from previous years to understand which sectors of education receive more money and why.
      - Make own local database (NEDB, SQLite) that can store POST information and run on Heroku without an external support.
      - Use React for your front-end, and design it to update dynamically
      - Build your application in a framework like bootstrap and use a colour scheme derived from photos to be in sync
      - Use advanced CSS animations for all your motion on the front end
        - Button clicks, swipes, screen transitions
   - These kind of questionings may even lead us to explore other datasets beyond budget-related data. 

