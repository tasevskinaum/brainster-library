<?php
require_once(__DIR__ . '/../../../database/Connection.php');
require_once(__DIR__ . '/../../Helpers/helpers.php');

use database\Connection;

// AuthorContoller.php
class AuthorController extends Connection
{
    public function __construct()
    {
        parent::__construct();
    }

    public function add($authorData = null)
    {
        $first_name = trim($authorData['firstname'] ?? '');
        $last_name = trim($authorData['lastname'] ?? '');
        $biography = trim($authorData['bio'] ?? '');

        $errors = [];

        // validations
        validateFirstName($first_name, $errors);
        validateLastName($last_name, $errors);

        if (empty($biography)) {
            $errors['biography'] = 'Enter BIO!';
        } else {
            if (strlen($biography) < 20) {
                $errors['biography'] = 'Minimum 20 characters';
            }
        }

        if (!empty($errors)) {
            echo json_encode([
                'errors' => $errors,
                'status' => 400
            ]);
            return;
        }

        $statement = $this->pdo->prepare("INSERT INTO author (fist_name, last_name, biography)
                                          VALUES (:first_name, :last_name, :biography)");
        $statement->execute([
            'first_name' => $first_name,
            'last_name' => $last_name,
            'biography' => $biography
        ]);

        echo json_encode([
            'message' => 'Author added successfully',
            'data' => $this->getAuthorById($this->pdo->lastInsertId()),
            'status' => 200
        ]);
    }

    public function all($data = null)
    {
        $sql = "SELECT * 
                FROM author
                WHERE is_deleted = 0";
        $statement = $this->pdo->prepare($sql);
        $statement->execute();
        $authorsData = $statement->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'data' => $authorsData,
            'status' => 200
        ]);
    }


    public function delete($authorData = null)
    {
        $bookId = trim($authorData['id'] ?? '');

        $sql = "UPDATE author 
                SET is_deleted = 1
                WHERE id = :id";

        $statement = $this->pdo->prepare($sql);

        if ($statement->execute(['id' => $bookId])) {
            echo json_encode([
                'message' => 'Book deleted',
                'status' => 200
            ]);
        }
    }

    public function edit($authorData = null)
    {
        $id = $authorData['id'];
        $firstname = trim($authorData['firstname'] ?? '');
        $lastname = trim($authorData['lastname'] ?? '');
        $biography = trim($authorData['biography'] ?? '');

        $errors = [];

        // validations
        validateFirstName($firstname, $errors);
        validateLastName($lastname, $errors);
        if (empty($biography)) {
            $errors['biography'] = 'Enter BIO!';
        } else {
            if (strlen($biography) < 20) {
                $errors['biography'] = 'Minimum 20 characters';
            }
        }

        if (!empty($errors)) {
            echo json_encode([
                'errors' => $errors,
                'status' => 400
            ]);
            return;
        }

        $sql = "UPDATE author 
                SET 
                    fist_name = :firstname,
                    last_name = :lastname,
                    biography = :biography
                 WHERE id = :id";
        $statement = $this->pdo->prepare($sql);

        $statement->execute([
            'id' => $id,
            'firstname' => $firstname,
            'lastname' => $lastname,
            'biography' => $biography
        ]);

        echo json_encode([
            'message' => 'Author edited successfully',
            'editedData' => $this->getAuthorById($id),
            'status' => 200
        ]);
    }

    public function getAuthorById($authorId)
    {
        $sql = "SELECT * 
                FROM author
                WHERE id = :id";
        $statement = $this->pdo->prepare($sql);
        if ($statement->execute(['id' => $authorId])) {
            return $statement->fetch(PDO::FETCH_ASSOC);
        }
    }
}
