<?php

function validateFirstName($first_name, &$errors)
{
    if (empty($first_name)) {
        $errors['firstname'] = 'First name are required';
    } else if (!preg_match("/^[A-Z][a-z]{2,29}$/", $first_name)) {
        $errors['firstname'] = 'Enter a valid first name';
    }
}

function validateLastName($last_name, &$errors)
{
    if (empty($last_name)) {
        $errors['lastname'] = 'Last name are required';
    } else if (!preg_match("/^[A-Z][a-z]{2,29}$/", $last_name)) {
        $errors['lastname'] = 'Enter a valid last name';
    }
}

function validateUserRegisterUsername($username, &$errors, PDO $pdo)
{
    if (empty($username)) {
        $errors['username'] = 'Username cannot be blank';
    } else if (!preg_match("/^[a-z]{4,12}(?:\d{1,2})?$/", $username)) {
        $errors['username'] = 'Enter a valid username';
    } else {
        $sql = "SELECT * FROM user WHERE username = :username";
        $statement = $pdo->prepare($sql);
        $statement->bindParam(':username', $username, PDO::PARAM_STR);
        $statement->execute();
        $user = $statement->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            $errors['username'] = 'Username taken';
        }
    }
}

function validateUserRegisterEmail($email, &$errors, PDO $pdo)
{
    if (empty($email)) {
        $errors['email'] = 'Email are required';
    } else if (!preg_match('/^[a-z]{6,12}(?:\d{1,4})?@([a-z]{2,6}+\.[a-z]{2,4})$/', $email)) {
        $errors['email'] = 'Please enter a valid email address';
    } else {
        $sql = "SELECT * FROM user WHERE email = :email";
        $statement = $pdo->prepare($sql);
        $statement->bindParam(':email', $email, PDO::PARAM_STR);
        $statement->execute();
        $user = $statement->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            $errors['email'] = 'A user with this email already exists';
        }
    }
}


function validateUserRegisterPassword($password, &$errors)
{
    if (empty($password)) {
        $errors['password'] = 'Password are required';
    } else if (!preg_match('/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{6,16}$/', $password)) {
        $errors['password'] = 'Password must contain at least 1 lowercase, uppercase, number, and special character';
    }
}

function validateBookAuthor($authorId, &$errors)
{
    if (empty($authorId)) {
        $errors['author'] = 'Choose author';
    }
}

function validateBookCategory($bookCategoryId, &$errors)
{
    if (empty($bookCategoryId)) {
        $errors['category'] = 'Choose book category';
    }
}

function validateBookTitle($title, &$errors)
{
    if (empty($title)) {
        $errors['title'] = 'Enter book title';
    }
}

function validateBookPagesNumber($pagesNumber, &$errors)
{
    if (empty($pagesNumber)) {
        $errors['pages_number'] = 'Enter number of pages';
    } else if (!is_numeric($pagesNumber)) {
        $errors['pages_number'] = 'Enter pages in numeric format';
    } else if (intval($pagesNumber) <= 0) {
        $errors['pages_number'] = 'Enter a positive number';
    }
}

function validateBookPublicationYear($publicationYear, &$errors)
{
    $currentYear = date("Y");

    if (empty($publicationYear)) {
        $errors['publication_year'] = 'Enter year of publication';
    } else if (!is_numeric($publicationYear)) {
        $errors['publication_year'] = 'Enter year in numeric format';
    } else if ($publicationYear > $currentYear) {
        $errors['publication_year'] = 'Publication year cannot be in the future';
    }
}

function validateBookImgUrl($imgUrl, &$errors)
{
    if (empty($imgUrl)) {
        $errors['img_url'] = 'Book image are required';
    } else if (filter_var($imgUrl, FILTER_VALIDATE_URL) === false || !@getimagesize($imgUrl)) {
        $errors['img_url'] = 'Enter a valid URL link of the image';
    }
}
