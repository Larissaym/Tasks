-- Create admin and set password
DROP
user if exists 'adminTodo'@'localhost';
CREATE
user 'adminTodo'@'localhost' identified WITH mysql_native_password by 'password';

DROP
DATABASE if exists `todo`;
CREATE
DATABASE if not exists `todo`;

GRANT all privileges ON todo.* TO
'adminTodo'@'localhost';
FLUSH
PRIVILEGES;

USE
todo;

-- Create Table To-Do and Categories
DROP TABLE IF EXISTS `todos`;

CREATE TABLE `todos`
(
    `id`          int NOT NULL AUTO_INCREMENT,
    `title`       varchar(255),
    `description` text,
    `priority`    enum('CRITICAL', 'IMPORTANT', 'LOW', 'NORMAL'),
    `due_date`    date,
    `finished`    boolean NULL DEFAULT 0,
    `created_at`  datetime NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at`  datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    `category_id` int,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories`
(
    `id`         int NOT NULL AUTO_INCREMENT,
    `title`      varchar(255) DEFAULT NULL,
    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

ALTER TABLE `todos`
    ADD FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
