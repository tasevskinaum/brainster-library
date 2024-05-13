<?php
session_start();

if (isset($_SESSION['isLoggedIn']) && $_SESSION['isLoggedIn'] && $_SESSION['user']['user_role_id'] == 1) {
    // var_dump($_SESSION);
} else {
    header("Location: home.php");
    die();
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Brainster Library</title>
    <meta charset="utf-8" />
    <meta name="keywords" content="" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />

    <!-- CSS script -->
    <link rel="stylesheet" href="./resources/scss/main.css" />
    <!-- Latest Font-Awesome CDN -->
    <script src="https://kit.fontawesome.com/b78630679a.js" crossorigin="anonymous"></script>
    <!-- Sweet Alert CDN -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <!-- favicon -->
    <link rel="icon" href="https://brainster.co/wp-content/uploads/2021/06/Favicon-1.png">
</head>

<body id="admin-dshbp-body">
    <nav class="navbar">
        <a href="./admin-dashboard.php" class="navbar-brand">
            <img src="https://brainster.co/wp-content/uploads/2021/08/Brainster.co_.png" alt="Brainster" />
        </a>
        <button class="navbar-toggler">
            <span class="bar bar-one"></span>
            <span class="bar bar-two"></span>
            <span class="bar bar-three"></span>
        </button>
        <div class="menu-wrapper">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a href="./home.php" class="nav-link">Home</a>
                </li>
                <li class="nav-item">
                    <a href="#books" class="nav-link">Manage Books</a>
                </li>
                <li class="nav-item">
                    <a href="#authors" class="nav-link">Manage Authors</a>
                </li>
                <li class="nav-item">
                    <a href="#categories" class="nav-link">Manage Categories</a>
                </li>
                <li class="nav-item">
                    <a href="#comments" class="nav-link">Manage Comments</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link log-out">Logout</a>
                </li>
            </ul>
        </div>
        <div class="auth-menu">
            <div class="item notification">
                <i class="fa-sharp fa-solid fa-bell text-white fa-lg"></i>
            </div>
            <div class="item">
                <div id="spc" class="user-avatar-navbar">
                    <img src="./resources/images/signup-user-avatar.png" alt="avatar">
                </div>
                <div class="dropdown">
                    <div id="log-out" class="log-out">
                        Log out
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <main>
        <div class="container">
            <div id="books" class="books">
                <div class="add-book adm-sec-cstmbg">
                    <form id="add-book">
                        <span class="title">Add book</span>
                        <div class="form-inner">
                            <div class="form-group">
                                <div class="inner">
                                    <span id="adb-author-fdb" class="ab-feedback"></span>
                                    <select name="author-select" id="author-select" class="form-control">
                                        <option value="" selected disabled>Select author..</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <span id="adb-category-fdb" class="ab-feedback"></span>
                                <div class="inner">
                                    <select name="category-select" id="category-select" class="form-control">
                                        <option value="" selected disabled>Select category...</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <span id="adb-title-fdb" class="ab-feedback"></span>
                                <div class="inner">
                                    <input type="text" name="book-title" id="book-title" class="form-control" placeholder="Title" />
                                </div>
                            </div>
                            <div class="form-group">
                                <span id="adb-pages-number-fdb" class="ab-feedback"></span>
                                <div class="inner">
                                    <input type="text" name="book-pages-number" id="book-pages-number" class="form-control" placeholder="Number of pages" />
                                </div>
                            </div>
                            <div class="form-group">
                                <span id="adb-publication-year-fdb" class="ab-feedback"></span>
                                <div class="inner">
                                    <input type="text" name="publication-year" id="publication-year" class="form-control" placeholder="Year of publication" />
                                </div>
                            </div>
                            <div class="form-group">
                                <span id="adb-img-url-fdb" class="ab-feedback"></span>
                                <div class="inner">
                                    <input type="text" name="book-img-url" id="book-img-url" class="form-control" placeholder="Image URL.." />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="inner">
                                    <button type="submit" class="form-control btn">Add</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="all-books adm-sec-cstmbg">
                    <span class="title">books</span>
                    <div class="table">
                        <table id="adm-all-bt">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Author</th>
                                    <th>Pages</th>
                                    <th>Year</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div id="authors" class="authors">
                <div class="inner">
                    <div class="add-author ">
                        <div class="inner adm-sec-cstmbg">
                            <span class="title">Add author</span>
                            <form id="add-author-form" action="">
                                <div class="form-group">
                                    <span id="ada-firstname-fdb" class="ab-feedback"></span>
                                    <input type="text" name="author-firstname" id="author-firstname" class="form-control" placeholder="Firstname" />
                                </div>
                                <div class="form-group">
                                    <span id="ada-lastname-fdb" class="ab-feedback"></span>
                                    <input type="text" name="author-lastname" id="author-lastname" class="form-control" placeholder="Lastname" />
                                </div>
                                <div class="form-group">
                                    <span id="ada-author-bio-fdb" class="ab-feedback"></span>
                                    <textarea name="author-bio" id="author-bio" rows="10" class="form-control" placeholder="Short bio.."></textarea>
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="form-control btn">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div class="all-authors">
                        <div class="inner adm-sec-cstmbg">
                            <span class="title">Authors</span>
                            <div class="table">
                                <table id="adm-all-at">
                                    <thead>
                                        <tr>
                                            <th>Firstname</th>
                                            <th>Lastname</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="categories" class="categoires">
                <div class="inner">
                    <div class="add-category">
                        <div class="inner adm-sec-cstmbg">
                            <span class="title">Add category</span>
                            <form id="add-category-form" action="">
                                <div class="form-group">
                                    <span id="adc-firstname-fdb" class="ab-feedback"></span>
                                    <input type="text" name="category" id="category" class="form-control" placeholder="Category" />
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="form-control btn">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div class="all-categories">
                        <div class="inner adm-sec-cstmbg">
                            <span class="title">Categories</span>
                            <div class="table">
                                <table id="adm-all-ct">
                                    <thead>
                                        <tr>
                                            <th>Category</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="comments" class="comments">
                <div class="pending-comments adm-sec-cstmbg">
                    <span class="title">Pending comments</span>
                    <div class="table">
                        <table id="adm-all-pc">
                            <thead>
                                <tr>
                                    <th>Book</th>
                                    <th>Commented by</th>
                                    <th>Comment</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="approved-comments adm-sec-cstmbg">
                    <span class="title">Approved Comments</span>
                    <div class="table">
                        <table id="adm-all-ac">
                            <thead>
                                <tr>
                                    <th>Book</th>
                                    <th>Commented by</th>
                                    <th>Comment</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="rejected-comments adm-sec-cstmbg">
                    <span class="title">Rejected Comments</span>
                    <div class="table">
                        <table id="adm-all-rc">
                            <thead>
                                <tr>
                                    <th>Book</th>
                                    <th>Commented by</th>
                                    <th>Comment</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <footer>
    </footer>



    <!--  -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

    <script src="./resources/js/IndexNavbar/navbar_script.js"></script>
    <script src="./resources/js/AdminDashboard/main.js" type="module"></script>
    <script src="./resources/js/Logout/logout.js" type="module"></script>
    <script src="./resources/js/Footer/footer.js"></script>
</body>

</html>