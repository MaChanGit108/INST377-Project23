# <a id='header'></a> INST377-Project23

*New Repository for INST377 Group Project Team 23*

**Members:** Matthew Chan, Taylor Green, Jian Soriano, Frazer Workneh

---
## <a id='readme'></a>I. README

* Title of your project
    - Prince George’s County Education Budget
* Description of your project
    - Our problem statement was “How do we display our findings from the 2020 budget categories and payees from the dataset of Prince George’s County to potential stakeholders in a clear and easy-to-understand manner on desktop and mobile devices?”
    
* Link to the Heroku instance where your application can be used
   - [INST377 Project 23](https://inst377-project23.herokuapp.com/): The Heroku link to our project website.
   
* Description of target browsers (iOS? Android? Which ones? Which versions?)
   - Target browsers include all laptop and phone devices.
   
* Link to User Manual
   - [II. User Manual](#usermanual) section
      - [INST377 Project 23 About Page](https://inst377-project23.herokuapp.com/about.html): The About Page of our website details what our project is. 
      - [INST377 Project 23 Documentation Page](https://inst377-project23.herokuapp.com/doc.html): The Documentation Page of our website details the different pages and how to use them. 
   
* Link to Developer Manual
   - [III. Developer Manual](#devmanual) section

---
## <a id='usermanual'></a>II. User Manual

* Features
   - The main bar chart displays the different categories of education spending, and how much money has been budgeted for each category.
      - This information is updated as the available data from the Prince George's County API is updated
      - Hovering the mouse over a category shows the exact value of its allocated budget
   - The payee section contains a list of selectable payees, and displays information of each payee's allocated budget,
      - This includes its own distribution of funds by category, total money allocated, and percent in relation to the overall Education budget
      - As with the above bar chart, categories in the pie chart can be hovered for exact values
      - Sections of the pie chart can also pop out for better accessibility by clicking on the chart or the legend.
---
## <a id='devmanual'></a>III. Developer Manual

* To install application and all dependencies, perform the following steps:
    1. Make a fork of this repo.
    1. Clone your fork onto your local machine from GitHub.
    1. Create a new local repository and copy the files from this repo into it.
    1. Ensure Node.js v.13.2 or higher is installed from [https://nodejs.org/en/download/](https://nodejs.org/en/download/).
    1. Run 'npm install' to install Node.js and all related dependencies

* How to run your application on a server
   - Our application is currently hosted on Heroku.
      - Any changes pushed to the main GitHub repository will update the Heroku instance
   
   - To run on local server:
       1. With Node packages properly installed, run 'npm start' to boot up the server on port 3000 (Default).
       1. To view in web browser, go to '[localhost:3000](http://localhost:3000/) with the server running. 
   
   - To pull new changes:
   1. Type 'git pull __ main' to pull from the main branch to your working branch
      - Ex: 'git pull origin main'.
   1. Make sure to commit new changes to main branch.
   
* How to run any tests you have written for your software
   - No additional tests written.
   - If want to run tests, make sure cypress installed and type 'npx cypress run'.
   - Write your own tests in a cypress file.
   
* The API for your server application - all GET, POST, PUT, etc endpoints, and what they each do
   - GET: returns data from a read request
     - On loading the app, pulls the data from the Prince George's County API and initializes the chart for Total Education budget.
   - POST: accepts user requests for information
     - Accepts first user's request input and displays payee information below.
   - PUT: accepts *different* user requests for information
     - Accepts subsequent user request inputs and displays subsequent display changes in payee information.
   
* A clear set of expectations around known bugs and a road-map for future development.
   - ROAD-MAP for Next Steps: 
      - Implement more features for further exploration and interpretation of the provided data.
        - Ex: more attributes like zip code that were not addressed in our web application.
      - Implement a spatial visualization of budget payments. 
      - Utilize fiscal data from previous years to understand which sectors of education receive more money and why.
         - Storing multiple previous years of education budget data in our own database for quicker and more consistent access
      - More in-depth styling using external CSS libraries
   - These kind of questionings may even lead us to explore other datasets beyond budget-related data. 

