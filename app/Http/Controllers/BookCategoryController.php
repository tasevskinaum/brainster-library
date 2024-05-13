<?php
require_once(__DIR__ . '/../../../database/Connection.php');

use database\Connection;

// BookCategoryController.php
class BookCategoryController extends Connection
{
    public function __construct()
    {
        parent::__construct();
    }

    public function add($categoryData = null)
    {
        $category = trim(ucwords(strtolower($categoryData['category'] ?? '')));

        $errors = [];

        if (empty($category)) {
            $errors['category'] = 'Please enter category!';
            echo json_encode([
                'errors' => $errors,
                'status' => 400
            ]);
            return;
        }

        $statement = $this->pdo->prepare("SELECT * FROM book_category WHERE category = :category");
        $statement->execute([
            'category' => $category
        ]);
        $categoryExist = $statement->fetchAll(PDO::FETCH_ASSOC);

        if ($categoryExist) {
            $errors['category'] = 'Category exists';
            echo json_encode([
                'errors' => $errors,
                'data' => $this->getCategoryById($this->pdo->lastInsertId()),
                'status' => 400
            ]);
            return;
        }

        $statement = $this->pdo->prepare("INSERT INTO book_category (category)
                                          VALUES (:category)");
        $statement->execute([
            'category' => $category
        ]);

        echo json_encode([
            'message' => 'Category added successfully',
            'data' => $this->getCategoryById($this->pdo->lastInsertId()),
            'status' => 200
        ]);
    }

    public function all($data = null)
    {
        $sql = "SELECT * 
                FROM book_category
                WHERE is_deleted = 0";
        $statement = $this->pdo->prepare($sql);
        $statement->execute();
        $bookCategoryData = $statement->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'data' => $bookCategoryData,
            'status' => 200
        ]);
    }


    public function delete($categoryData = null)
    {
        $categoryId = trim($categoryData['id'] ?? '');

        $sql = "UPDATE book_category
                SET is_deleted = 1
                WHERE id = :id";

        $statement = $this->pdo->prepare($sql);

        if ($statement->execute(['id' => $categoryId])) {
            echo json_encode([
                'message' => 'Book deleted',
                'status' => 200
            ]);
        }
    }

    public function edit($categoryData = null)
    {
        $id = $categoryData['id'];
        $category = trim(ucwords(strtolower($categoryData['category'] ?? '')));

        $errors = [];

        if (empty($category)) {
            $errors['category'] = 'Please enter category!';
            echo json_encode([
                'errors' => $errors,
                'status' => 400
            ]);
            return;
        }

        $statement = $this->pdo->prepare("SELECT * FROM book_category WHERE category = :category");
        $statement->execute([
            'category' => $category
        ]);
        $categoryExist = $statement->fetchAll(PDO::FETCH_ASSOC);

        if ($categoryExist) {
            $errors['category'] = 'Category exists';
            echo json_encode([
                'errors' => $errors,
                'status' => 400
            ]);
            return;
        }

        $sql = "UPDATE book_category 
                SET 
                    category = :category
                 WHERE id = :id";
        $statement = $this->pdo->prepare($sql);

        $statement->execute([
            'id' => $id,
            'category' => $category
        ]);

        echo json_encode([
            'message' => 'Category edited successfully',
            'editedData' => $this->getCategoryById($id),
            'status' => 200
        ]);
    }

    public function getCategoryById($categoryId)
    {
        $sql = "SELECT * 
                FROM book_category
                WHERE id = :id";
        $statement = $this->pdo->prepare($sql);
        if ($statement->execute(['id' => $categoryId])) {
            return $statement->fetch(PDO::FETCH_ASSOC);
        }
    }
}
