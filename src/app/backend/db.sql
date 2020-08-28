-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 28, 2020 at 02:46 PM
-- Server version: 8.0.20-0ubuntu0.20.04.1
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` float NOT NULL,
  `image` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL DEFAULT 'No description.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `image`, `description`) VALUES
(1, 'ONEPLUS', 300, 'assets/img/phones/oneplus.jpg', 'No description.'),
(2, 'HUAWEI', 400, 'assets/img/phones/huawei.jpg', 'No description.'),
(3, 'APPLE', 1000, 'assets/img/phones/apple.jpg', 'No description.'),
(4, 'MOTOROLA', 500, 'assets/img/phones/motorola.jpg', 'No description.'),
(5, 'LG', 200, 'assets/img/phones/lg.jpg', 'No description.'),
(6, 'OPPO', 1000, 'assets/img/phones/oppo.jpg', 'No description.'),
(7, 'INFINIX', 300, 'assets/img/phones/infinix.jpg', 'No description.'),
(8, 'NEXUS', 200, 'assets/img/phones/nexus.jpg', 'No description.'),
(9, 'NOKIA', 500, 'assets/img/phones/nokia.jpg', 'No description.'),
(10, 'BLACKBERRY', 600, 'assets/img/phones/blackberry.jpg', 'No description.'),
(11, 'SAMSUNG', 600, 'assets/img/phones/samsung.jpg', 'No description.'),
(12, 'SONY', 400, 'assets/img/phones/sony.jpg', 'No description.');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `created`, `modified`) VALUES
(1, 'Emmanuel', 'Adu Gyamfi', 'emm7494@gmail.com', '$2y$10$vr/ym9PugKK2pI0Mq4p7weGYjs2H4CSO6eO.3HU8GqiC73dSaquF.', '2020-08-28 14:40:48', '2020-08-28 14:40:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
