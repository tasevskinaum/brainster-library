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

<body id="index-body">
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
  <main id="index-main-content">
    <header id="index-header">
      <div class="wrapper">
        <div class="content-box">
          <div class="inner">
            <span class="welcome">brainster book library</span>
            <h1>
              Explore, Discover, and Immerse Yourself in the World of
              Literature
            </h1>
            <a href="#hp-bs" class="blink-down-arrow">
              <span></span>
            </a>
          </div>
        </div>
        <div class="img-box">
          <div class="img">
            <img src="./resources/images/books-removebg.png" alt="Brainster Library" />
          </div>
        </div>
      </div>
    </header>
    <div class="sec">
      <div class="hp-bs" id="hp-bs">
        <h2>Books</h2>
        <div class="filter">
          <span id="filter-books">
            <span>Filter by category</span>
            <i class="fa-solid fa-angle-down fa-xl"></i>
          </span>
          <div id="filter-book-checkboxes">
            <ul class="ks-cboxtags">
            </ul>
          </div>
        </div>

        <div class="books">
        </div>
      </div>
    </div>
  </main>
  <footer>
  </footer>
  <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

  <!--  -->
  <script src="./resources/js/IndexNavbar/navbar_script.js"></script>
  <script src="./resources/js/IndexPage/index_page_script.js"></script>
  <script src="./resources/js/Logout/logout.js" type="module"></script>
  <script src="./resources/js/HomePage/main.js" type="module"></script>
  <script src="./resources/js/Footer/footer.js"></script>
</body>

</html>