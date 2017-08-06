4th of August 2017

# MyReads: A Book Lending App

This page is the work of Unnar Thor Bachmann.

This is a project in the Udacity's React Nanodegree program.

This project is a React front-end project with a Node backend. User can search for books and put them on three different shelves: Currently reading, wanting to read and read. The root url ("/") displays the shelves and the search url ("/search") displays a search page. 

## How this project is implemented.

This projected is implemented in React using JSX, React Router and Webpack. The development environment was NPM and Facebook's Create React App. A [starter](https://github.com/udacity/reactnd-project-myreads-starter) template was provided. The original code was refactored into a proper React project. 

The main changes made to the starter template included

1. Refactoring the code into components (ListSearch.js and ListBooks.js).
2. Connecting the backend to the front-end (BooksAPI.js)
3. Setting up and styling the search page. Rendering the search list and allow filtering and sorting.
4. Importing the ReactRouter, Router and Link components to engineer the routing.

Files added to the project:

* ListSearch.js - Component which renders the seach list.
* ListBooks.js - Component which renders each shell.

Files modified

* App.js - Adding Router and Link components to allow routing. Removing routing with a state variable. Adding `books` state variable and connecting it to the database (BooksAPI.js). Components used to refactor the App.js into compent instead of hard coding the HTML.
*  index.js - Adding ReactRouter and wrap the App component to allow routing with ReactRouter.
* App.css - Modified the file to style the search page.


## How to run on a computer

1. Make sure [NPM](https://www.npmjs.com/get-npm) is installed.
2. Clone and download this repository and save in a directory.
3. In the root directory write `npm install` and `npm start`
4. Interact with the program in a browser using the url localhost:3000.

Node packages installed:

* escape-string-regexp and sort-by: `npm install --save escape-string-regexp sort-by`
* react-router-dom: `npm install --save react-router-dom`