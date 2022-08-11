-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 11, 2022 at 06:58 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sugar_tracker`
--

-- --------------------------------------------------------

--
-- Table structure for table `amrit_table`
--

CREATE TABLE `amrit_table` (
  `id` int(11) NOT NULL,
  `sugar_level` varchar(255) DEFAULT NULL,
  `morning_meal` varchar(255) NOT NULL,
  `launch` varchar(255) NOT NULL,
  `dinner` varchar(255) NOT NULL,
  `exercise_time` varchar(255) DEFAULT NULL,
  `health_issues` varchar(1000) NOT NULL,
  `date` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `amrit_table`
--

INSERT INTO `amrit_table` (`id`, `sugar_level`, `morning_meal`, `launch`, `dinner`, `exercise_time`, `health_issues`, `date`) VALUES
(1, '170', 'Daal Rice and egg', 'chowmein', 'Rice dal and chicken', '25', 'Headache', '7/6/2022'),
(2, '132', 'Rice and mushroom ', 'Chwmein with cold drink', 'Braed, curd, lauka vendi', '60', 'no', '7/7/2022'),
(3, '90', 'Rice, daal and karela', 'Chowmein', 'Rice Chicken and Daal', '12', 'Have  common cold', '7/9/2022'),
(4, '140', 'Rice with Daal and ', 'Chowmein and cold drinks', 'Rice with chicken', '50', 'no', '7/11/2022'),
(5, '160', 'Rice with dal and potato vegetable ', 'Chicken Momo', 'Chicken with rice ', '35', 'Headache', '7/12/2022'),
(6, '80', 'Rice and Egg', 'Chowmein and cold-drink', 'Rice and milk', '80', 'Headache', '7/13/2022');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_table`
--

CREATE TABLE `doctor_table` (
  `id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `phone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor_table`
--

INSERT INTO `doctor_table` (`id`, `user_id`, `name`, `email`, `phone`) VALUES
(23, 318, 'Dr Sibam Bastola', 'sibamlaurey14@gmail.com', '9825116414');

-- --------------------------------------------------------

--
-- Table structure for table `nikesh111_table`
--

CREATE TABLE `nikesh111_table` (
  `id` int(11) NOT NULL,
  `sugar_level` varchar(255) DEFAULT NULL,
  `morning_meal` varchar(255) NOT NULL,
  `launch` varchar(255) NOT NULL,
  `dinner` varchar(255) NOT NULL,
  `exercise_time` varchar(255) DEFAULT NULL,
  `health_issues` varchar(1000) NOT NULL,
  `date` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `predict_table`
--

CREATE TABLE `predict_table` (
  `id` int(11) NOT NULL,
  `user_id` int(10) NOT NULL,
  `pregnancy` varchar(10) NOT NULL,
  `glucose` varchar(10) NOT NULL,
  `blood_pressure` varchar(10) NOT NULL,
  `skin_thickness` varchar(10) NOT NULL,
  `insulin` varchar(10) NOT NULL,
  `bmi` varchar(10) NOT NULL,
  `predegree_function` varchar(10) NOT NULL,
  `output` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `predict_table`
--

INSERT INTO `predict_table` (`id`, `user_id`, `pregnancy`, `glucose`, `blood_pressure`, `skin_thickness`, `insulin`, `bmi`, `predegree_function`, `output`) VALUES
(1, 314, '6', '23', '5', '3', '33', '32', '23', ''),
(2, 314, '6', '23', '5', '3', '33', '32', '23', ''),
(3, 314, '6', '23', '5', '3', '33', '32', '23', ''),
(4, 314, '1', '22', '22', '22', '22', '22', '20', ''),
(5, 314, '2', '22', '22', '22', '22', '22', '22', ''),
(6, 314, '3', '33', '33', '34', '32', '32', '22', ''),
(7, 314, '3', '33', '33', '34', '32', '32', '22', ''),
(8, 314, '3', '33', '33', '34', '32', '32', '22', ''),
(9, 314, '3', '33', '33', '34', '32', '32', '22', ''),
(10, 314, '3', '33', '33', '34', '32', '32', '22', ''),
(11, 314, '2', '43', '22', '43', '65', '65', '44', ''),
(12, 314, '2', '23', '22', '22', '22', '22', '44', ''),
(13, 314, '2', '23', '22', '22', '22', '22', '44', ''),
(14, 314, '2', '23', '22', '22', '22', '22', '44', ''),
(15, 314, '2', '23', '22', '22', '22', '22', '44', ''),
(16, 314, '2', '23', '22', '22', '22', '22', '44', ''),
(17, 314, '2', '23', '22', '22', '223', '22', '44', ''),
(18, 314, '2', '23', '22', '222', '223', '22', '44', ''),
(19, 314, '2', '212', '22', '222', '223', '22', '44', ''),
(20, 314, '2', '212', '22', '222', '223', '22', '12', ''),
(21, 314, '2', '212', '22', '222', '22.3', '22', '12', ''),
(22, 314, '2', '212', '22', '222', '22.3', '44.5', '12', ''),
(23, 314, '0', '123', '0', '0', '0', '44.5', '12', ''),
(24, 314, '0', '123', '0', '0', '0', '44.5', '12', ''),
(25, 315, '1', '1', '1', '1', '1', '1', '1', ''),
(26, 315, '1', '1', '1', '1', '1', '1', '1', ''),
(27, 315, '1', '123', '1', '1', '1', '1', '1', ''),
(28, 315, '1', '123', '1', '1', '1', '1', '13', ''),
(29, 315, '1', '123', '1', '14', '1', '1', '13', ''),
(30, 315, '2', '123', '0', '14', '1', '1', '13', ''),
(31, 315, '2', '123', '0', '14', '0', '1', '13', ''),
(32, 315, '2', '123', '0', '0', '0', '3', '13', ''),
(33, 315, '2', '123', '0', '0', '0', '0', '13', ''),
(34, 315, '2', '123', '0', '45', '0', '0', '13', ''),
(35, 315, '23', '123', '0', '45', '0', '0', '13', ''),
(36, 315, '1', '4', '4', '4', '45', '4', '4', ''),
(37, 315, '12', '34', '4', '0', '6', '44', '54', ''),
(38, 315, '12', '34', '4', '0', '6', '44', '54', ''),
(39, 315, '12', '344', '4', '0', '6', '44', '54', ''),
(40, 315, '12', '2', '4', '0', '6', '44', '54', ''),
(41, 315, '12', '199', '4', '0', '6', '44', '54', ''),
(42, 315, '43', '34', '34', '5', '5', '5', '53', ''),
(43, 315, '43', '345', '34', '5', '5', '5', '53', ''),
(44, 315, '43', '345', '34', '5', '5', '5', '53', ''),
(45, 315, '43', '34', '34', '5', '5', '5', '53', ''),
(46, 315, '43', '34', '34', '5', '5', '5', '53', ''),
(47, 315, '43', '34', '34', '5', '55', '5', '53', ''),
(48, 315, '43', '34', '345', '5', '55', '5', '53', ''),
(49, 315, '43', '34', '345', '555', '55', '5', '53', ''),
(50, 315, '43', '34', '345', '555', '55', '555', '53', ''),
(51, 315, '9', '34', '345', '555', '55', '555', '53', ''),
(52, 315, '9', '34', '345', '555', '55', '555', '53', ''),
(53, 315, '9', '34', '345', '555', '55', '555', '53', ''),
(54, 315, '9', '34', '345', '555', '55', '555', '53', ''),
(55, 315, '9', '34', '345', '555', '55', '555', '53', ''),
(56, 315, '9', '34', '345', '555', '55', '555', '53', ''),
(57, 315, '9', '34', '345', '555', '55', '555', '53', ''),
(58, 315, '9', '34', '345', '555', '55', '555', '53', ''),
(59, 315, '9', '34', '345', '555', '55', '555', '53', ''),
(60, 315, '9', '34', '345', '555', '55', '555', '53', ''),
(61, 315, '9', '34', '345', '555', '55', '555', '53', ''),
(62, 315, '9', '34', '345', '555', '55', '555', '53', ''),
(63, 315, '9', '34', '345', '555', '55', '555', '53', ''),
(64, 315, '9', '34', '345', '555', '55', '555', '53', ''),
(65, 315, '9', '34', '345', '555', '55', '555', '53', ''),
(66, 315, '9', '34', '345', '555', '55', '555', '53', ''),
(67, 315, '9', '34', '345', '555', '55', '555', '53', ''),
(68, 315, '9', '34', '345', '555', '55', '555', '53', ''),
(69, 315, '9', '34', '345', '555', '55', '555', '53', ''),
(70, 315, '9', '34', '345', '555', '55', '555', '53', ''),
(71, 315, '9', '34', '345', '555', '55', '555', '53', ''),
(72, 315, '9', '34', '345', '555', '55', '555', '53', ''),
(73, 315, '9', '34', '345', '555', '55', '555', '53', ''),
(74, 315, '9', '34', '345', '555', '55', '555', '53', ''),
(75, 315, '9', '34', '345', '555', '55', '555', '53', ''),
(76, 315, '9', '34', '345', '555', '55', '55', '53', ''),
(77, 315, '9', '34', '345', '55', '55', '55', '53', ''),
(78, 315, '9', '34', '345', '55', '5', '55', '53', ''),
(79, 315, '9', '34', '34', '55', '5', '55', '53', ''),
(80, 315, '9', '34', '34', '55', '5', '5', '53', ''),
(81, 315, '23', '332', '32', '4', '4', '5', '4', ''),
(82, 315, '23', '33', '32', '4', '4', '5', '4', ''),
(83, 315, '34', '43', '43', '43', '44', '54', '54', ''),
(84, 315, '34', '43', '43', '43', '44', '5', '54', ''),
(85, 318, '12', '22', '22', '212', '212', '222', '22', ''),
(86, 318, '12', '22', '22', '212', '212', '22', '22', ''),
(87, 318, '12', '2', '22', '21', '212', '22', '22', ''),
(88, 318, '12', '233', '22', '21', '212', '22', '22', ''),
(89, 318, '12', '21', '21', '21', '121', '22', '21', ''),
(90, 318, '12', '215', '21', '21', '121', '22', '21', ''),
(91, 318, '1', '122', '2', '43', '4', '5', '5', ''),
(92, 318, '1', '149', '2', '43', '4', '5', '5', ''),
(93, 318, '78', '8', '82', '8', '2', '2', '2', ''),
(94, 319, '12', '21', '12', '121', '12', '21', '12', ''),
(95, 319, '12', '21', '12', '12', '12', '21', '12', ''),
(96, 319, '12', '214', '12', '12', '12', '21', '12', ''),
(97, 319, '12', '212', '12', '12', '12', '21', '12', ''),
(98, 319, '12', '21', '12', '12', '12', '21', '12', ''),
(99, 319, '12', '21', '2', '12', '12', '21', '12', ''),
(100, 319, '0', '21', '2', '12', '12', '21', '12', ''),
(101, 319, '0', '21', '0', '12', '12', '21', '12', ''),
(102, 319, '0', '21', '0', '12', '978', '21', '12', ''),
(103, 319, '0', '21', '0', '12', '9', '21', '12', ''),
(104, 319, '0', '21', '0', '12', '9', '277', '12', ''),
(105, 319, '0', '216', '0', '12', '9', '277', '12', ''),
(106, 318, '1', '93', '70', '31', '0', '30.4', '0.135', ''),
(107, 318, '1', '126', '70', '31', '0', '30.4', '0.135', ''),
(108, 318, '1', '126', '70', '0', '0', '30.4', '0.135', ''),
(109, 318, '1', '126', '70', '0', '0', '30.4', '0.349', ''),
(110, 318, '1', '126', '60', '0', '0', '30.4', '0.349', ''),
(111, 318, '1', '126', '60', '0', '0', '30.1', '0.349', ''),
(112, 318, '12', '54', '0', '15', '51', '15', '12', ''),
(113, 318, '12', '542', '0', '15', '51', '15', '12', ''),
(114, 318, '1', '12', '12', '12', '12', '22', '122', ''),
(115, 318, '0', '12', '22', '22', '11', '11', '22', ''),
(116, 318, '0', '12', '12', '54', '21', '212', '21', ''),
(117, 318, '0', '13', '14', '23', '45', '45', '0', ''),
(118, 318, '0', '80', '100', '0.23', '120', '35', '0.67', ''),
(119, 318, '0', '80', '100', '0.23', '120', '35', '0.67', ''),
(120, 318, '0', '80', '100', '0.23', '120', '35', '0.67', ''),
(121, 318, '0', '80', '100', '12', '120', '35', '0.67', ''),
(122, 318, '0', '80', '100', '12', '120', '35.6', '0.67', ''),
(123, 318, '0', '15', '120', '65', '32', '22', '0', ''),
(124, 318, '0', '126', '120', '65', '32', '22', '0', ''),
(125, 318, '0', '15', '120', '65', '140', '22', '0', ''),
(126, 318, '0', '126', '120', '65', '140', '22', '0', ''),
(127, 318, '0', '125', '120', '65', '140', '22', '0', ''),
(128, 318, '0', '125', '120', '65', '140', '22', '0', ''),
(129, 318, '0', '100', '120', '65', '140', '22', '0', ''),
(130, 318, '0', '99', '120', '65', '140', '22', '0', ''),
(131, 318, '0', '67', '120', '65', '140', '22', '0', ''),
(132, 318, '0', '100', '80', '32', '120', '40', '1', ''),
(133, 318, '0', '120', '80', '32', '80', '40', '1', ''),
(134, 318, '0', '150', '80', '32', '80', '40', '1', ''),
(135, 318, '0', '150', '80', '32', '140', '40', '1', '');

-- --------------------------------------------------------

--
-- Table structure for table `sibam14_table`
--

CREATE TABLE `sibam14_table` (
  `id` int(11) NOT NULL,
  `sugar_level` varchar(255) DEFAULT NULL,
  `morning_meal` varchar(255) NOT NULL,
  `launch` varchar(255) NOT NULL,
  `dinner` varchar(255) NOT NULL,
  `exercise_time` varchar(255) DEFAULT NULL,
  `health_issues` varchar(1000) NOT NULL,
  `date` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `usersignup`
--

CREATE TABLE `usersignup` (
  `id` int(11) NOT NULL,
  `fullname` varchar(200) NOT NULL,
  `name` varchar(50) NOT NULL,
  `age` int(2) NOT NULL,
  `weight` varchar(10) NOT NULL,
  `gender` varchar(30) NOT NULL,
  `image` varchar(500) NOT NULL,
  `email` varchar(80) NOT NULL,
  `password` varchar(500) NOT NULL,
  `haveDiabetes` varchar(300) NOT NULL,
  `code` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usersignup`
--

INSERT INTO `usersignup` (`id`, `fullname`, `name`, `age`, `weight`, `gender`, `image`, `email`, `password`, `haveDiabetes`, `code`) VALUES
(314, 'Sibam Laurey', 'Sibam14', 24, '60', 'male', '', 'sibam@gmail.com', '$2b$10$GUR2eYPAaQEPnOjHCIuP/ep7U31m6xmw/Ltwx8wwUbzeO6H1X.H6a', '', 0),
(318, 'Amrit Acharya', 'amrit', 47, '76', 'male', 'public\\images\\1657481467802Photo pp.jpg', 'amritach222@gmail.com', '$2b$10$V9CI3IkAxhieqKa4NSm1DOuOKwyPUed99ollioPJaQTEeI5J/oPJu', 'Yes', 5242),
(321, 'Nikesh Shrestha', 'nikesh111', 22, '45', 'male', '', 'nikesh.shestha54@gmail.com', '$2b$10$2upJLn515ujrdPzaD0.pgegiOg9LnUpyqohfnDQvVcFG..mwaIbry', 'Yes', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `amrit_table`
--
ALTER TABLE `amrit_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctor_table`
--
ALTER TABLE `doctor_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nikesh111_table`
--
ALTER TABLE `nikesh111_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `predict_table`
--
ALTER TABLE `predict_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sibam14_table`
--
ALTER TABLE `sibam14_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usersignup`
--
ALTER TABLE `usersignup`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `amrit_table`
--
ALTER TABLE `amrit_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `doctor_table`
--
ALTER TABLE `doctor_table`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `nikesh111_table`
--
ALTER TABLE `nikesh111_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `predict_table`
--
ALTER TABLE `predict_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT for table `sibam14_table`
--
ALTER TABLE `sibam14_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usersignup`
--
ALTER TABLE `usersignup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=322;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
