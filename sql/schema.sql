DROP TABLE IF EXISTS `donors`;
CREATE TABLE `donors` (
  `id`           INTEGER PRIMARY KEY AUTO_INCREMENT,
  `first_name`   VARCHAR(60) NOT NULL,
  `middle_name`  VARCHAR(60),
  `last_name`    VARCHAR(60) NOT NULL,
  `email`        VARCHAR(255) NOT NULL UNIQUE,
  `company_name` VARCHAR(100),
  `phone_number` VARCHAR(60),
  `password`     VARCHAR(255) NOT NULL,
  `created_at`   DATETIME,
  `updated_at`   DATETIME
);
