<?php
session_start();

if (isset($_SESSION['isLoggedIn']) && $_SESSION['isLoggedIn']) {
  header('Location: home.php');
  die();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <title>Login</title>
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

<body>
  <div id="lsp">
    <div class="wrapper">
      <div class="inner">
        <div class="ls-avatar">
          <img src="./resources/images/signup-user-avatar.png" alt="" />
        </div>
        <form id="user-register-form">
          <h3>Sign up!</h3>
          <span id="s-firstname-feedback" class="ls-feedback"></span>
          <div class="form-group">
            <i class="fa-solid fa-user icon"></i>
            <input type="text" name="signupFirstname" id="signupFirstname" class="form-control" placeholder="First name" />
          </div>
          <span id="s-lastname-feedback" class="ls-feedback"></span>
          <div class="form-group">
            <i class="fa-solid fa-user icon"></i>
            <input type="text" name="signupLastname" id="signupLastname" class="form-control" placeholder="Last name" />
          </div>
          <span id="s-username-feedback" class="ls-feedback"></span>
          <div class="form-group">
            <i class="fa-solid fa-user icon"></i>
            <input type="text" name="signupUsername" id="signupUsername" class="form-control" placeholder="Username" />
          </div>
          <span id="s-email-feedback" class="ls-feedback"></span>
          <div class="form-group">
            <i class="fa-solid fa-envelope icon"></i>
            <input type="text" name="signupEmail" id="signupEmail" class="form-control" placeholder="E-mail" />
          </div>
          <span id="s-password-feedback" class="ls-feedback"></span>
          <div class="form-group">
            <i class="fa-solid fa-lock icon"></i>
            <input type="password" name="signupPassword" id="signupPassword" class="form-control" placeholder="Password" />
          </div>
          <div class="form-group">
            <button type="submit">Register</button>
          </div>
          <small><i>All fields are required</i></small>
        </form>
      </div>
    </div>
  </div>
  <footer>
  </footer>


  <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

  <!--  -->
  <script src="./resources/js/SignUp/signup.js" type="module"></script>
  <script src="./resources/js/Footer/footer.js"></script>
</body>

</html>