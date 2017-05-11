## Project notes:

### User Stories
1. As a user I can create an account or sign-in to an existing account.
2. As a user I can search for a book based on title, author, genre, ISBN.
3. As a user I can save information to my account about books I have searched for.
4. As a user I can keep track of which of the saved books I have read.
5. As a user I can assign ratings to the books I have read and save this information to my account.
6. As a user I can write a review for the books I have read.

### Questions/Thoughts
#### General Thoughts
* Back-end will be built with Node and Express and MongoDB.
  * Will potentially implement some features of Firebase.
* Front-end technology not decided yet. 
  * Bootstrap or Foundation or some other html/css framework will be implemented.  
  * Potentially React or Vue.js for javascript.
  * JQuery will be implemented with bootstrap and possibly for AJAX.

#### User Story Questions
1. **_User Story 1:_**
    * Should account creation and authentication be handled by Firebase?  
    * Is it worth it to implement it myself with vanilla js/js libraries?

2. **_User Story 2:_**
    * I plan to use google books api to retrieve book information based on user entered search criteria.
    * Should this call to the API be handled by the backend (Node HTTPS module) or the front end (standard https request or AJAX)?  
    * API Key is necessary for request to Google Books API. I can hide this key as a ENV variable. Can ENV variable be passed to front end to be included with HTTPS/AJAX request?
3. **_User Story 3 and 4:_**
    * I will store user data using mongo. I will need a "User" model and "Book" model? The Book models saved by the user would would be stored in a property of the User.
3. **_User Story 5 and 6:_**
    * Rating and Reviews will be saved to Book models in the Users list of saved Books.