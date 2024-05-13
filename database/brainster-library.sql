CREATE DATABASE brainster_library;
USE brainster_library;

-- 

CREATE TABLE user_role(
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	role VARCHAR(16) NOT NULL
);

INSERT INTO user_role (role)
VALUES ('admin'),
	   ('client');

-- 

CREATE TABLE user(
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	user_role_id INT UNSIGNED,
	first_name VARCHAR(16) NOT NULL,
	last_name VARCHAR(16) NOT NULL,
	username VARCHAR(16) NOT NULL,
	email VARCHAR(64) NOT NULL,
	password VARCHAR(64) NOT NULL,
	created_at DATETIME NOT NULL,
	CONSTRAINT fk_user_role FOREIGN KEY(user_role_id) REFERENCES user_role(id)
);

INSERT INTO user(`user_role_id`, `first_name`, `last_name`, `username`,`email`,`password`,`created_at`)
VALUES ('1','Admin','Admin' ,'admin', 'admin@library.mk', '$2y$10$.JSlXmaVvIGtg/r.vulJ8.296hArLrbBAbtcz/JpWQiTAuCjEocGy', '2023-11-06 19:00:00');

--

CREATE TABLE book_category(
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	category VARCHAR(32) NOT NULL,
	is_deleted TINYINT NOT NULL DEFAULT 0
);

INSERT INTO `book_category` (`id`, `category`, `is_deleted`) VALUES
(1, 'Poetry', 0),
(2, 'Fantasy', 0),
(3, 'Test', 0);

-- 

CREATE TABLE author(
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	fist_name VARCHAR(16) NOT NULL,
	last_name VARCHAR(16) NOT NULL,
	biography TEXT NOT NULL,
	is_deleted TINYINT NOT NULL DEFAULT 0
);

INSERT INTO `author` (`id`, `fist_name`, `last_name`, `biography`, `is_deleted`) VALUES
(1, 'Rupi', 'Kaur', 'Rupi Kaur is a Canadian poet, writer, and illustrator. She rose to fame with her debut poetry collection \"Milk and Honey,\" which has become a bestseller and gained widespread acclaim for its exploration of themes like love, trauma, and healing.', 0),
(2, 'Patrick', 'Rothfuss', 'Patrick Rothfuss (born 1973) is an American writer and college lecturer. He is best known for his debut fantasy novel, \"The Name of the Wind,\" which is part of the ongoing \"Kingkiller Chronicle\" series.', 0),
(3, 'Test', 'Test', 'Bladlfasfmadsmfkldsflsdfmskflmssdfdsa', 1);

-- 

CREATE TABLE book(
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	author_id INT UNSIGNED NOT NULL,
	book_category_id INT UNSIGNED NOT NULL,
	title VARCHAR(64) NOT NULL,
	pages_number SMALLINT NOT NULL,
	publication_year YEAR NOT NULL,
	img_url VARCHAR(512) NOT NULL,
	is_deleted TINYINT NOT NULL DEFAULT 0,
	created_at DATETIME NOT NULL,
	CONSTRAINT fk_author FOREIGN KEY(author_id) REFERENCES author(id),
	CONSTRAINT fk_book_category FOREIGN KEY(book_category_id) REFERENCES book_category(id)
);

INSERT INTO `book` (`id`, `author_id`, `book_category_id`, `title`, `pages_number`, `publication_year`, `img_url`, `is_deleted`, `created_at`) VALUES
(1, 1, 1, 'Milk And Honey', 203, '2014', 'https://m.media-amazon.com/images/I/71Eq55V2AvL._AC_UF1000,1000_QL80_.jpg', 0, '2023-11-27 22:03:33'),
(2, 2, 2, 'The Name Of The Wind', 662, '2007', 'https://m.media-amazon.com/images/I/611iKJa7a-L._AC_UF894,1000_QL80_.jpg', 0, '2023-11-27 22:06:07'),
(3, 3, 3, 'Test', 123, '2021', 'https://m.media-amazon.com/images/I/81UhKOBDrCL._AC_UF1000,1000_QL80_.jpg', 1, '2023-12-01 15:56:45');

--

CREATE TABLE comment_status(
	id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	status VARCHAR(16) NOT NULL
);


-- 

INSERT INTO comment_status(`status`)
VALUES ('pending'),
	   ('approved'),
	   ('rejected');

-- 

CREATE TABLE book_comment(
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	user_id INT UNSIGNED NOT NULL,
	book_id INT UNSIGNED NOT NULL,
	comment TINYTEXT NOT NULL,
	status_id TINYINT UNSIGNED NOT NULL DEFAULT 1,
	is_deleted TINYINT NOT NULL DEFAULT 0,
	created_at DATETIME NOT NULL,
	CONSTRAINT fk_user_1 FOREIGN KEY(user_id) REFERENCES user(id),
	CONSTRAINT fk_book_1 FOREIGN KEY(book_id) REFERENCES book(id),
	CONSTRAINT fk_comment_status FOREIGN KEY(status_id) REFERENCES comment_status(id)
);

-- 

CREATE TABLE personal_notes(
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	user_id INT UNSIGNED NOT NULL,
	book_id INT UNSIGNED NOT NULL,
	note_title VARCHAR(32) NOT NULL,
	note TEXT NOT NULL,
	CONSTRAINT fk_user_2 FOREIGN KEY(user_id) REFERENCES user(id),
	CONSTRAINT fk_book_2 FOREIGN KEY(book_id) REFERENCES book(id)
);