<?php
require_once(__DIR__ . '/../../../database/Connection.php');
require_once(__DIR__ . '/../../Helpers/helpers.php');

use database\Connection;

// BookController.php
class BookController extends Connection
{
    public function __construct()
    {
        parent::__construct();
    }

    public function add($bookData = null)
    {
        $authorId = trim($bookData['author'] ?? '');
        $bookCategoryId = trim($bookData['category'] ?? '');
        $title = trim($bookData['title'] ?? '');
        $pagesNumber = trim($bookData['pagesNumber'] ?? '');
        $publicationYear = trim($bookData['publicationYear'] ?? '');
        $imgUrl = trim($bookData['imgUrl'] ?? '');

        $errors = [];

        validateBookAuthor($authorId, $errors);
        validateBookCategory($bookCategoryId, $errors);
        validateBookTitle($title, $errors);
        validateBookPagesNumber($pagesNumber, $errors);
        validateBookPublicationYear($publicationYear, $errors);
        validateBookImgUrl($imgUrl, $errors);

        if (!empty($errors)) {
            echo json_encode([
                'errors' => $errors,
                'status' => 400
            ]);
            return;
        }

        $sql = "INSERT INTO book (author_id, book_category_id, title, pages_number, publication_year, img_url, created_at) 
                VALUES (:author_id, :book_category_id, :title, :pages_number, :publication_year, :img_url, :created_at)";
        $statement = $this->pdo->prepare($sql);
        $statement->execute([
            'author_id' => $authorId,
            'book_category_id' => $bookCategoryId,
            'title' => ucwords(strtolower($title)),
            'pages_number' => $pagesNumber,
            'publication_year' => $publicationYear,
            'img_url' => $imgUrl,
            'created_at' => date('Y/m/d H:i:s', time())
        ]);

        echo json_encode([
            'message' => 'Book added successfully',
            'data' => $this->getBookById($this->pdo->lastInsertId()),
            'status' => 200
        ]);
    }

    public function delete($bookData = null)
    {
        $bookId = trim($bookData['id'] ?? '');

        $sql = "UPDATE book 
                SET is_deleted = 1
                WHERE id = :id;

                UPDATE book_comment
                SET is_deleted = 1
                WHERE book_id = :book_id_comments;
                
                DELETE FROM personal_notes
                WHERE book_id = :book_id_notes";

        $statement = $this->pdo->prepare($sql);

        if ($statement->execute(['id' => $bookId, 'book_id_comments' => $bookId, 'book_id_notes' => $bookId])) {
            echo json_encode([
                'message' => 'Book deleted',
                'status' => 200
            ]);
        }
    }

    public function all($bookData = null)
    {
        $sql = "SELECT 
                    b.id as book_id, 
                    b.title, 
                    a.fist_name as author_firstname, 
                    a.last_name as author_lastname, 
                    b.pages_number, 
                    b.publication_year, 
                    bc.category,
                    b.is_deleted,
                    b.created_at,
                    b.img_url,
                    b.author_id as author_id,
                    b.book_category_id as book_category_id
                FROM book b
                    INNER JOIN author a ON b.author_id = a.id
                    INNER JOIN book_category bc ON b.book_category_id = bc.id
                WHERE b.is_deleted = 0
                ORDER BY b.created_at ASC";
        $statement = $this->pdo->prepare($sql);
        $statement->execute();
        $books = $statement->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'data' => $books,
            'status' => 200
        ]);
    }

    public function edit($bookData = null)
    {
        $bookId = trim($bookData['bookId'] ?? '');
        $authorId = trim($bookData['author'] ?? '');
        $bookCategoryId = trim($bookData['category'] ?? '');
        $title = trim($bookData['title'] ?? '');
        $pagesNumber = trim($bookData['pagesNumber'] ?? '');
        $publicationYear = trim($bookData['publicationYear'] ?? '');
        $imgUrl = trim($bookData['imgUrl'] ?? '');

        $errors = [];

        validateBookAuthor($authorId, $errors);
        validateBookCategory($bookCategoryId, $errors);
        validateBookTitle($title, $errors);
        validateBookPagesNumber($pagesNumber, $errors);
        validateBookPublicationYear($publicationYear, $errors);
        validateBookImgUrl($imgUrl, $errors);

        if (!empty($errors)) {
            echo json_encode([
                'errors' => $errors,
                'status' => 400
            ]);
            return;
        }

        $sql = "UPDATE book 
                SET 
                    author_id = :author_id, 
                    book_category_id = :book_category_id, 
                    title = :title, 
                    pages_number = :pages_number, 
                    publication_year = :publication_year, 
                    img_url = :img_url
                 WHERE id = :id";
        $statement = $this->pdo->prepare($sql);

        $statement->execute([
            'author_id' => $authorId,
            'book_category_id' => $bookCategoryId,
            'title' => ucwords(strtolower($title)),
            'pages_number' => $pagesNumber,
            'publication_year' => $publicationYear,
            'img_url' => $imgUrl,
            'id' => $bookId
        ]);

        echo json_encode([
            'message' => 'Book edited successfully',
            'editedData' => $this->getBookById($bookId),
            'status' => 200
        ]);
    }

    public function getBookById($bookId)
    {
        $sql = "SELECT 
                    b.id as book_id, 
                    b.title, 
                    a.fist_name as author_firstname, 
                    a.last_name as author_lastname, 
                    b.pages_number, 
                    b.publication_year, 
                    bc.category,
                    b.is_deleted,
                    b.created_at,
                    b.img_url,
                    b.author_id as author_id,
                    b.book_category_id as book_category_id
                FROM book b
                    INNER JOIN author a ON b.author_id = a.id
                    INNER JOIN book_category bc ON b.book_category_id = bc.id
                WHERE b.id = :id";

        $statement = $this->pdo->prepare($sql);

        if ($statement->execute(['id' => $bookId])) {
            return $statement->fetch(PDO::FETCH_ASSOC);
        }
    }

    public function getBook($bookData = null)
    {
        $bookId = trim($bookData['id'] ?? '');

        $sql = "SELECT 
        b.id as book_id, 
        b.title, 
        a.fist_name as author_firstname, 
        a.last_name as author_lastname, 
        b.pages_number, 
        b.publication_year, 
        bc.category,
        b.is_deleted,
        b.created_at,
        b.img_url,
        b.author_id as author_id,
        b.book_category_id as book_category_id
    FROM book b
        INNER JOIN author a ON b.author_id = a.id
        INNER JOIN book_category bc ON b.book_category_id = bc.id
    WHERE b.id = :id";

        $statement = $this->pdo->prepare($sql);
        $statement->execute(['id' => $bookId]);
        $book = $statement->fetch(PDO::FETCH_ASSOC);

        if (!empty($book)) {
            echo json_encode([
                'data' => $book,
                'status' => 200
            ]);
        } else {
            echo json_encode([
                'message' => "The book does not exist",
                'status' => 400
            ]);
        }
    }
}
