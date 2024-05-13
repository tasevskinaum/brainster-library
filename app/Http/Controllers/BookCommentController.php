<?php
session_start();

require_once(__DIR__ . '/../../../database/Connection.php');
require_once(__DIR__ . '/../../Helpers/helpers.php');

use database\Connection;

// BookCommentController.php
class BookCommentController extends Connection
{
    public function __construct()
    {
        parent::__construct();
    }

    public function add($commentData = null)
    {
        if (!isset($_SESSION['isLoggedIn']) || !$_SESSION['isLoggedIn']) {
            echo json_encode([
                'message' => 'You must be logged in to comment.',
                'status' => 400
            ]);
            return;
        }

        $userId = trim($commentData['user_id'] ?? '');
        $bookId = trim($commentData['book_id'] ?? '');
        $comment = trim($commentData['comment'] ?? '');

        $errors = [];


        if ($userId != $_SESSION['user']['id']) {
            echo json_encode([
                'message' => 'Something went wrong',
                'status' => 400
            ]);
            return;
        }

        if (empty($comment)) {
            $errors['comment'] = 'Enter comment!';
            echo json_encode([
                'errors' => $errors,
                'status' => 400
            ]);
            return;
        }

        $sql = "SELECT *
                FROM book_comment
                WHERE user_id = :user_id 
                    AND is_deleted = 0 
                    AND book_id = :book_id
                    AND (status_id = '1' OR status_id = '2')";

        $statement = $this->pdo->prepare($sql);
        $statement->execute([
            'user_id' => $userId,
            'book_id' => $bookId
        ]);
        $fetchedComment = $statement->fetch(PDO::FETCH_ASSOC);

        if ($fetchedComment) {
            echo json_encode([
                'message' => 'You already commented',
                'status' => 400
            ]);
            return;
        }

        $sql = "INSERT INTO book_comment (user_id, book_id,comment, created_at) 
        VALUES (:user_id, :book_id, :comment, :created_at)";
        $statement = $this->pdo->prepare($sql);
        $statement->execute([
            'user_id' => $userId,
            'book_id' => $bookId,
            'comment' => $comment,
            'created_at' => date('Y/m/d H:i:s', time())
        ]);

        echo json_encode([
            'message' => 'Comment added successfully',
            'data' => $this->getCommentById($this->pdo->lastInsertId()),
            'status' => 200
        ]);
    }

    public function allForAdmin($commentData = null)
    {
        $sql = "SELECT 
                    bc.comment,
                    bc.id as comment_id,
                    bc.created_at, 
                    u.username as user_username, 
                    u.first_name as user_firstname,
                    u.last_name as user_lastname,
                    u.id as user_id,
                    b.title as book_title,
                    bc.status_id
                FROM book_comment bc
                    INNER JOIN user u ON bc.user_id = u.id
                    INNER JOIN book b ON bc.book_id = b.id
                WHERE bc.is_deleted = 0";

        $statement = $this->pdo->prepare($sql);
        $statement->execute();

        $comments = $statement->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'data' => $comments,
            'status' => 200
        ]);
    }

    public function all($commentData = null)
    {
        $bookId = trim($commentData['book_id'] ?? '');

        $sql = "SELECT 
                    bc.comment,
                    bc.id as comment_id,
                    bc.created_at, 
                    u.username, 
                    u.first_name,
                    u.last_name,
                    u.id as user_id
                FROM book_comment bc
                    INNER JOIN user u ON bc.user_id = u.id
                WHERE bc.status_id = 2  && bc.is_deleted = 0 && bc.book_id = :book_id
                ORDER BY bc.created_at ASC";

        $statement = $this->pdo->prepare($sql);
        $statement->execute(
            ['book_id' => $bookId]
        );

        $comments = $statement->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'data' => $comments,
            'status' => 200
        ]);
    }

    public function getCommentById($bookId)
    {
        $sql = "SELECT 
                    bc.comment,
                    bc.id as comment_id,
                    bc.created_at, 
                    u.username, 
                    u.first_name,
                    u.last_name,
                    u.id as user_id
                FROM book_comment bc
                    INNER JOIN user u ON bc.user_id = u.id
                WHERE bc.id = :comment_id";
        $statement = $this->pdo->prepare($sql);
        if ($statement->execute(['comment_id' => $bookId])) {
            return $statement->fetch(PDO::FETCH_ASSOC);
        }
    }

    public function delete($commentData = null)
    {
        $commentId = trim($commentData['id'] ?? '');
        $userId = trim($commentData['user_id'] ?? '');

        if ($userId != $_SESSION['user']['id']) {
            echo json_encode([
                'message' => 'You can only delete your comment!',
                'status' => 400
            ]);
            return;
        }

        $sql = "UPDATE book_comment
                SET is_deleted = 1
                WHERE id = :id";

        $statement = $this->pdo->prepare($sql);

        if ($statement->execute(['id' => $commentId])) {
            echo json_encode([
                'message' => 'Comment deleted',
                'status' => 200
            ]);
        }
    }

    public function approve($commentData = null)
    {
        $commentId = trim($commentData['id'] ?? '');


        $sql = "UPDATE book_comment
                SET status_id = 2
                WHERE id = :id";

        $statement = $this->pdo->prepare($sql);

        if ($statement->execute(['id' => $commentId])) {
            echo json_encode([
                'message' => 'Comment approved',
                'status' => 200
            ]);
        }
    }

    public function reject($commentData = null)
    {
        $commentId = trim($commentData['id'] ?? '');

        $sql = "UPDATE book_comment
                SET status_id = 3
                WHERE id = :id";

        $statement = $this->pdo->prepare($sql);

        if ($statement->execute(['id' => $commentId])) {
            echo json_encode([
                'message' => 'Comment rejjected',
                'status' => 200
            ]);
        }
    }
}
