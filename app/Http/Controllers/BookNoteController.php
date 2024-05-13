<?php
session_start();

require_once(__DIR__ . '/../../../database/Connection.php');
require_once(__DIR__ . '/../../Helpers/helpers.php');

use database\Connection;

// BookNoteController.php
class BookNoteController extends Connection
{
    public function __construct()
    {
        parent::__construct();
    }

    public function add($noteData = null)
    {
        if (!isset($_SESSION['isLoggedIn']) || !$_SESSION['isLoggedIn']) {
            echo json_encode([
                'message' => 'You must be logged in to add note.',
                'status' => 400
            ]);
            return;
        }

        $userId = trim($noteData['user_id'] ?? '');
        $bookId = trim($noteData['book_id'] ?? '');
        $note_title = trim($noteData['note_title'] ?? '');
        $note = trim($noteData['note'] ?? '');

        $errors = [];


        if ($userId != $_SESSION['user']['id']) {
            echo json_encode([
                'message' => 'Something went wrong',
                'status' => 400
            ]);
            return;
        }

        if (empty($note_title)) {
            $errors['note_title'] = 'Enter title!';
        }

        if (empty($note)) {
            $errors['note'] = 'Enter note!';
        }

        if (!empty($errors)) {
            echo json_encode([
                'errors' => $errors,
                'status' => 400
            ]);
            return;
        }

        $sql = "INSERT INTO personal_notes (user_id, book_id,note_title, note) 
        VALUES (:user_id, :book_id, :note_title, :note)";
        $statement = $this->pdo->prepare($sql);
        $statement->execute([
            'user_id' => $userId,
            'book_id' => $bookId,
            'note_title' => $note_title,
            'note' => $note
        ]);

        echo json_encode([
            'message' => 'Note added successfully',
            'data' => $this->getNoteById($this->pdo->lastInsertId()),
            'status' => 200
        ]);
    }

    public function all($noteData = null)
    {
        $bookId = trim($noteData['book_id'] ?? '');
        $userId = trim($noteData['user_id'] ?? '');

        if (!isset($_SESSION['isLoggedIn']) || !$_SESSION['isLoggedIn']) {
            echo json_encode([
                'status' => 401
            ]);
            return;
        }

        if ($userId != $_SESSION['user']['id']) {
            echo json_encode([
                'message' => 'Something went wrong',
                'status' => 400
            ]);
            return;
        }

        $sql = "SELECT *
                FROM personal_notes ps
                WHERE book_id = :book_id AND user_id = :user_id";

        $statement = $this->pdo->prepare($sql);
        $statement->execute(
            [
                'book_id' => $bookId,
                'user_id' => $userId
            ]
        );

        $notes = $statement->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'data' => $notes,
            'status' => 200
        ]);
    }

    public function delete($commentData = null)
    {
        $noteId = trim($commentData['id'] ?? '');

        $sql = "DELETE FROM personal_notes
                WHERE id = :id";

        $statement = $this->pdo->prepare($sql);

        if ($statement->execute(['id' => $noteId])) {
            echo json_encode([
                'message' => 'Note deleted',
                'status' => 200
            ]);
        }
    }

    public function getNoteById($noteId)
    {
        $sql = "SELECT *
                FROM personal_notes          
                WHERE id = :id";
        $statement = $this->pdo->prepare($sql);
        if ($statement->execute(['id' => $noteId])) {
            return $statement->fetch(PDO::FETCH_ASSOC);
        }
    }

    public function edit($noteData = null)
    {
        $id = $noteData['id'];
        $noteTitle = trim($noteData['note_title'] ?? '');
        $note = trim($noteData['noten'] ?? '');

        $errors = [];

        if (empty($noteTitle)) {
            $errors['note_title'] = 'Enter title!';
        }

        if (empty($note)) {
            $errors['note'] = 'Enter note!';
        }

        if (!empty($errors)) {
            echo json_encode([
                'errors' => $errors,
                'status' => 400
            ]);
            return;
        }

        $sql = "UPDATE personal_notes 
                SET 
                    note_title = :note_title,
                    note = :note
                WHERE id = :id";
        $statement = $this->pdo->prepare($sql);

        $statement->execute([
            'id' => $id,
            'note_title' => $noteTitle,
            'note' => $note,
        ]);

        echo json_encode([
            'message' => 'Note edited successfully',
            'editedData' => $this->getNoteById($id),
            'status' => 200
        ]);
    }
}
