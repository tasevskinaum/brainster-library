<?php

$requestPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$routes = [
    '/' => 'HomeController@redirect',
    '/api/user/signup' => 'AuthController@signup',
    '/api/user/login' => 'AuthController@login',
    '/logout' => 'AuthController@logout',
    '/api/book/category/add' => 'BookCategoryController@add',
    '/api/book/category/all' => 'BookCategoryController@all',
    '/api/book/category/delete' => 'BookCategoryController@delete',
    '/api/book/category/edit' => 'BookCategoryController@edit',
    '/api/author/add' => 'AuthorController@add',
    '/api/author/all' => 'AuthorController@all',
    '/api/author/delete' => 'AuthorController@delete',
    '/api/author/edit' => 'AuthorController@edit',
    '/api/book/add' => 'BookController@add',
    '/api/book/delete' => 'BookController@delete',
    '/api/book/all' => 'BookController@all',
    '/api/book/edit' => 'BookController@edit',
    '/api/book/get' => 'BookController@getBook',
    '/api/book/comment/add' => 'BookCommentController@add',
    '/api/book/comment/all' => 'BookCommentController@all',
    '/api/book/comment/allForAdmin' => 'BookCommentController@allForAdmin',
    '/api/book/comment/delete' => 'BookCommentController@delete',
    '/book/comment/approve' => 'BookCommentController@approve',
    '/book/comment/reject' => 'BookCommentController@reject',
    '/book/note/add' => 'BookNoteController@add',
    '/api/book/note/all' => 'BookNoteController@all',
    '/api/book/note/delete' => 'BookNoteController@delete',
    '/api/book/note/edit' => 'BookNoteController@edit'
];

if (array_key_exists($requestPath, $routes)) {
    list($controller, $action) = explode('@', $routes[$requestPath]);

    require_once 'app/Http/Controllers/' . $controller . '.php';

    $controllerInstance = new $controller();
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data, true);
    $controllerInstance->$action($data);
} else {
    header('Location: ./home.php');
    die();
}
