SET NAMES utf8;
SET time_zone
= '+00:00';
SET foreign_key_checks
= 0;

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `todos`;
CREATE TABLE `todos`
(
  `uuid` varchar
(36) NOT NULL,
  `completed` tinyint
(4) NOT NULL COMMENT '1 = completed, 0 = not completed',
  `content` varchar
(256) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  UNIQUE KEY `uuid`
(`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;