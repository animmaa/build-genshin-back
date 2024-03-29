DROP TABLE IF EXISTS `card_deck`;
DROP TABLE IF EXISTS `card`;
DROP TABLE IF EXISTS `deck`;
DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `pseudo` VARCHAR(30) NOT NULL UNIQUE,
    `avatar` VARCHAR(255),
    `password` VARCHAR(255) NOT NULL
);

CREATE TABLE `deck` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `namedeck` VARCHAR(255) NOT NULL,
    `imgdeckone` VARCHAR(255) NOT NULL,
    `imgdecktwo` VARCHAR(255) NOT NULL,
    `imgdeckthree` VARCHAR(255) NOT NULL,
    `publish` BOOLEAN NOT NULL DEFAULT 0,
    `user_id` INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE `card` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `element` VARCHAR(255),
    `url` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL
);

CREATE TABLE `card_deck` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `deck_id` INT NOT NULL,
    FOREIGN KEY (deck_id) REFERENCES deck(id)
    ON DELETE CASCADE,
    `card_id` INT NOT NULL,
    FOREIGN KEY (card_id) REFERENCES card(id)
);

-- INSERT INTO `user` (`pseudo`, `password`) VALUES ('toto', 'totopass'), ('tata', 'tatapass'), ('titi', 'titipass');

-- INSERT INTO `deck` (`namedeck`, `user_id`) VALUES ('decknumero1', 1), ('decknumero2', 2), ('decknumero3', 1);

-- INSERT INTO `card` (`name`, `element`) VALUES ('keqing', 'electro'), ('diluc', 'pyro'), ('mona', 'hydro'), ('shenhe', 'cryo'), ('kazuha', 'anemo');

-- INSERT INTO `card_deck` (`deck_id`, `card_id`) VALUES (1, 1), (1, 2), (1, 3), (2, 1), (2, 4), (2, 5);

