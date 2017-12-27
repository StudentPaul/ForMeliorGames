# Project setup
```
git clone https://bitbucket.org/melior-games/trial-assignment.git
npm install
node server.js
ng serve --open
```

# Endpoints
```
  http://localhost:3004/books
  http://localhost:3004/formats
  http://localhost:3004/countries
  http://localhost:3004/cities
  http://localhost:3004/publishers
```

# Request Authentication header
```
For retrieving data every request should be supplied with "x-auth-token: bad18eba1ff45jk7858b8ae88a77fa30" header.
```

# Assignment 1

```
'Main' - page:
1) Output list of available books on main page
2) List items should contain links to 'Add New Book' page and pre-populate the form.
```

# Assignment 2
```
'Add New Book' - page:
1) Add form validation and display errors under invalid fields.
2) All fields are required.
3) Format, Country, City, Company options should be loaded from server.
4) Save form data to server.
```
 
# Assignment 3
```
'Search' - page:
1) Format options should be loaded from server.
2) Form fields are filters and are optional, although they should still be validated where needed.
3) List of filtered books should have the same look as the list on the 'Main' page.
4) Form fields state changes should be immediately reflected in url GET parameters dynamically, e.g.:
  Form content:
    Author: Miguel De Cervantes
    Format: Paperback
    
  Corresponding url: "http://localhost:4200/search?author=Miguel%20De%20Cervantes&formatId=1"
  
  It should be possible to copy retrieved url, enter in a new browser tab and get the same form state.
```


