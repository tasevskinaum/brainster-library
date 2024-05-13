<?php
// HomeController.php
class HomeController
{
    public function redirect($data = null)
    {
        header('Location: home.php');
        die();
    }
}
