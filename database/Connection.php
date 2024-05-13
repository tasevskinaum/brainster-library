<?php

namespace database;

require_once(__DIR__ . '/config.php');

class Connection
{
    protected $pdo = NULL;

    public function __construct()
    {
        try {
            $this->pdo = new \PDO('mysql:host=' . HOST . ';dbname=' . DB_NAME, USERNAME, PASSWORD);
        } catch (\PDOException $e) {
            echo 'Database connection established';
            die();
        }
    }

    public function connect()
    {
        if (!$this->pdo) {
            $this->pdo = new self();
        }

        return $this->pdo;
    }
}
