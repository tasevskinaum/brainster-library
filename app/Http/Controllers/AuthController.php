<?php
session_start();

require_once(__DIR__ . '/../../../database/Connection.php');
require_once(__DIR__ . '/../../Helpers/helpers.php');

use database\Connection;

// AuthController.php
class AuthController extends Connection
{
    public function __construct()
    {
        parent::__construct();
    }

    public function signup($userData = null)
    {
        $first_name = trim($userData['firstname'] ?? '');
        $last_name = trim($userData['lastname'] ?? '');
        $username = trim($userData['username'] ?? '');
        $email = trim($userData['email'] ?? '');
        $password = trim($userData['password'] ?? '');

        $errors = [];

        // validations
        validateFirstName($first_name, $errors);
        validateLastName($last_name, $errors);
        validateUserRegisterUsername($username, $errors, $this->pdo);
        validateUserRegisterEmail($email, $errors, $this->pdo);
        validateUserRegisterPassword($password, $errors);

        if (!empty($errors)) {
            echo json_encode([
                'errors' => $errors,
                'status' => 400
            ]);
            return;
        }

        $data = [
            'first_name' => $first_name,
            'last_name' => $last_name,
            'username' => $username,
            'email' => $email,
            'password' => password_hash($password, PASSWORD_BCRYPT),
        ];

        $user = [
            'role_id' => 2,
            'created_at' => date('Y/m/d H:i:s', time())
        ];

        $user = array_merge($user, $data);

        $statement = $this->pdo->prepare("INSERT INTO user (user_role_id, first_name, last_name, username, email, password, created_at)
                                    VALUES (:role_id ,:first_name, :last_name, :username, :email, :password, :created_at)");
        $statement->execute($user);

        echo json_encode([
            'message' => 'User created successfully',
            'status' => 201
        ]);
    }

    public function login($userData = null)
    {
        $username = $userData['username'] ?? '';
        $password = $userData['password'] ?? '';

        $errors = [];

        if (empty($username)) {
            $errors['username'] = 'Enter username';
        }

        if (empty($password)) {
            $errors['password'] = 'Enter password';
        }

        if (!empty($errors)) {
            echo json_encode([
                'errors' => $errors,
                'status' => 401
            ]);
            return;
        }

        $sql = "SELECT * FROM user WHERE username = :username";
        $statement = $this->pdo->prepare($sql);
        $statement->execute([
            'username' => $username
        ]);

        $user = $statement->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            $response = [
                'message' => "User logged in successfully",
                'status' => 200,
                'userID' => $user['id'],
                'userROLE' => $user['user_role_id']
            ];

            unset($user['password']);
            $_SESSION['user'] = $user;
            $_SESSION['isLoggedIn'] = true;
        } else {
            if (!$user) {
                $errors['username'] = 'Username does not exist';
            }
            if ($user && !password_verify($password, $user['password'])) {
                $errors['password'] = 'Incorrect password';
            }
            $response = [
                'message' => 'Login failed',
                'status' => 401,
                'errors' => $errors
            ];
        }

        echo json_encode($response);
    }
    public function logout($data = null)
    {
        session_unset();
        session_destroy();
        echo json_encode([
            'message' => 'Signed out',
            'status' => 200
        ]);
    }
}
