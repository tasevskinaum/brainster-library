# brainster-library

Overview:

This project is a book library application where users can view, search, and interact with a collection of programming books. It allows users to browse books, view detailed information about them, and read public comments. Registered users can also leave comments, both public and private, while an admin has full control over the library, including CRUD operations on various entities.

Start the project (local):
To run the project on your local machine you just need to start a local php server.
**php -S localhost:3000**

- This is the second project assigned for students of the Brainster Full Stack Academy
- This project named **Brainster library** offers a web solution foa an online library
- Before use, it is important to note that the **config.php file located in the database folder contains database constants that need to be filled in** for the project to work correctly. Also, the **config.js file located in the resources/js/config.js folder contains a baseURL that needs to be adjusted on each machine** for the project to work correctly.
- If the constants are filled, they need to be refilled with data of the operator of this project
- The project diferentiates two types of users **administrators**, and **clients** or just **users**
- The books are organized in categories, and each book has one author and belogns to one category
- The users or the clients are able to leave comments for the books, one comment per book
- They are also able to leave unlimmited number of private notes for each book they read
- They can leave as many private notes as they like, and they can also delete and edit these private notes
- The administrator is authorized to manage all affairs around the books, authors, categories and user comments
- The comments are visible for loged in users and also for users that are not loged in.
- However only comments that are approved by the administrator are visible for everybody who visits the site
- Disapproved comments can also be approved by the administrator
- The administrator can also manage authors data, input, edit and delete authors along with their short bio.
- The administrator can also input, edit and delete categories for books
- The categories and authors are deleted using the so called soft delete tehnique
- The books are also managed by the adinistrator
- Their data can be edited and deleted
- When the books are deleted all the comments and private notes concearnig this books are also deleted
- Every visitor to the site can register its own profile
- Visitors can not register as administrators
- Administrators role is given to a user only via database (in my case the administrator is with username **admin** and password **admin**)
- On the home page all the categories are given as checkboxes
- Here all the books are also protrayed
- By selecting multiple categories the user can filter the books that belong to particular category

## Tech Stack

- PHP
- JQuery
- SCSS
- HTML
