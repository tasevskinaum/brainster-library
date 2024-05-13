<?php
session_start();

$statusAuthenticated = false;
$userData = [];
if (isset($_SESSION['isLoggedIn']) && $_SESSION['isLoggedIn']) {
    $statusAuthenticated = true;
    $userData = $_SESSION['user'];
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

<body id="book-body">
    <nav class="navbar">
        <a href="./home.php" class="navbar-brand">
            <img src="https://brainster.co/wp-content/uploads/2021/08/Brainster.co_.png" alt="Brainster" />
        </a>
        <button class="navbar-toggler">
            <span class="bar bar-one"></span>
            <span class="bar bar-two"></span>
            <span class="bar bar-three"></span>
        </button>

        <div class="menu-wrapper">
            <ul class="navbar-nav">

                <?php if (!$statusAuthenticated) { ?>
                    <li class="nav-item">
                        <a id="log-in" href="./login.php" class="nav-link log-in">Log in</a>
                    </li>
                <?php } ?>

                <?php if (!empty($userData) && $userData['user_role_id'] == 1) { ?>
                    <li class="nav-item">
                        <a href="./admin-dashboard.php" class="nav-link">Admin Dashboard</a>
                    </li>
                <?php } ?>

                <?php if ($statusAuthenticated) { ?>
                    <li class="nav-item">
                        <a class="nav-link log-out">Logout</a>
                    </li>
                <?php } ?>

            </ul>
        </div>

        <?php if ($statusAuthenticated) { ?>
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
        <?php } ?>

    </nav>
    <main>
        <div class="root">
            <div class="book">
                <div class="img">
                    <img src="" id="book-img">
                    <div id="book-info-container" class="info">
                    </div>
                </div>

            </div>
            <div class="comments-notes">
                <div class="choose">
                    <span id="choose-comments" class="btn">Comments</span>
                    <span id="choose-notes" class="btn">Notes</span>
                </div>
                <div id="comments-container">
                    <div class="title">
                        <h2>Comments</h2>
                    </div>
                    <div id="add-comment">
                        <form id="add-comment-form">
                            <div class="form-group">
                                <span id="adc-book-fdb" class="ab-feedback"></span>
                                <textarea name="comment" id="comment" class="form-control" placeholder="Add comment here..."></textarea>
                            </div>
                            <div class="form-group btn">
                                <button type="submit">Comment</button>
                            </div>
                        </form>
                    </div>
                    <div class="comments">
                    </div>
                </div>
                <div id="notes-container">
                    <div class="title">
                        <h2>Notes</h2>
                    </div>
                    <div id="add-note">
                        <form id="add-note-form">
                            <div class="form-group">
                                <span id="adnt-book-fdb" class="ab-feedback"></span>
                                <input type="text" name="note-title" id="note-title" class="form-control" placeholder="Note title..">
                            </div>
                            <div class="form-group">
                                <span id="adn-book-fdb" class="ab-feedback"></span>
                                <textarea name="note" id="note" class="form-control" placeholder="Note.."></textarea>
                            </div>
                            <div class="form-group btn">
                                <button type="submit">Add note</button>
                            </div>
                        </form>
                    </div>
                    <div class="notes">
                    </div>
                </div>
            </div>
        </div>
    </main>
    <footer>
    </footer>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

    <!--  -->
    <script src="./resources/js/IndexNavbar/navbar_script.js"></script>
    <script src="./resources/js/BookPage/main.js" type="module"></script>
    <script src="./resources/js/Logout/logout.js" type="module"></script>
    <script src="./resources/js/Footer/footer.js"></script>

</body>

</html>