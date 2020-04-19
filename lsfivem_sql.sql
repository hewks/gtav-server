-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 26, 2017 at 11:07 PM
-- Server version: 5.7.20-0ubuntu0.16.04.1
-- PHP Version: 7.0.22-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lsfivem_server`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `login` varchar(64) NOT NULL DEFAULT '',
  `password` varchar(64) NOT NULL DEFAULT '',
  `banned` int(11) NOT NULL DEFAULT '0',
  `balance` int(11) NOT NULL DEFAULT '0',
  `email` varchar(128) NOT NULL DEFAULT '',
  `phone` varchar(128) NOT NULL DEFAULT '',
  `code` varchar(128) DEFAULT '',
  `group_id` int(11) NOT NULL DEFAULT '0',
  `ip_reg` varchar(128) NOT NULL DEFAULT '',
  `ip_last` varchar(128) NOT NULL DEFAULT '',
  `create_time` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `login`, `password`, `banned`, `balance`, `email`, `phone`, `code`, `group_id`, `ip_reg`, `ip_last`, `create_time`) VALUES
(1, 'tellarion', 'lsfm0x166450042d16bd4a7c19ea7f02bc067d==', 0, 2, 'lsfm0xYWRtaW5AbHNmaXZlbS5jb20=xf', 'lsfm0xNzk3NzM3MzcxODc=xf', 'lsfm0x12b6e17626d341adfab25d548b4291f0==', 3, '5.76.229.149', '95.59.123.94', '2017-11-08 07:00:21');

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `id` int(11) NOT NULL,
  `person` varchar(64) NOT NULL DEFAULT '',
  `car_name` varchar(48) NOT NULL DEFAULT 'NONE',
  `car_color_r` int(11) NOT NULL,
  `car_color_g` int(11) NOT NULL,
  `car_color_b` int(11) NOT NULL,
  `car_neon_state` int(11) NOT NULL,
  `car_neon_r` int(11) NOT NULL,
  `car_neon_g` int(11) NOT NULL,
  `car_neon_b` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`id`, `person`, `car_name`, `car_color_r`, `car_color_g`, `car_color_b`, `car_neon_state`, `car_neon_r`, `car_neon_g`, `car_neon_b`) VALUES
(0, 'Tellarion_Foldring', 'Sultan', 95, 210, 252, 0, 0, 0, 0),
(1, 'Tellarion_Foldring', 'Infernus', 87, 253, 115, 0, 0, 0, 0),
(2, 'Tellarion_Foldring', 'Bullet', 206, 250, 29, 0, 0, 0, 0),
(3, 'Tellarion_Foldring', 'Adder', 250, 125, 31, 0, 0, 0, 0),
(4, 'Tellarion_Foldring', 'Cheetah', 61, 51, 10, 0, 0, 0, 0),
(5, 'Tellarion_Foldring', 'Vacca', 72, 1, 100, 0, 0, 0, 0),
(6, 'Tellarion_Foldring', 'Voltic', 70, 31, 15, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `donate`
--

CREATE TABLE `donate` (
  `id` int(11) NOT NULL,
  `account` varchar(64) NOT NULL DEFAULT 'NONE',
  `money` int(11) NOT NULL DEFAULT '0',
  `use` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `houses`
--

CREATE TABLE `houses` (
  `id` int(11) NOT NULL,
  `pickup` int(11) DEFAULT '0',
  `pos_x` float NOT NULL DEFAULT '0',
  `pos_y` float NOT NULL DEFAULT '0',
  `pos_z` float NOT NULL DEFAULT '0',
  `pos_heading` float NOT NULL DEFAULT '0',
  `state` int(11) NOT NULL DEFAULT '0',
  `rare` int(11) NOT NULL DEFAULT '0',
  `owner` varchar(128) NOT NULL DEFAULT 'NONE',
  `coast` int(11) NOT NULL DEFAULT '0',
  `interior` int(11) NOT NULL DEFAULT '0',
  `garage` int(11) NOT NULL DEFAULT '0',
  `garage_enter_pos_x` float NOT NULL DEFAULT '0',
  `garage_enter_pos_y` float NOT NULL DEFAULT '0',
  `garage_enter_pos_z` float NOT NULL DEFAULT '0',
  `garage_enter_pos_r` int(11) NOT NULL,
  `max_cars_count` int(11) NOT NULL DEFAULT '1',
  `max_cars_pos` varchar(2018) NOT NULL DEFAULT '',
  `atr_lock` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `houses`
--

INSERT INTO `houses` (`id`, `pickup`, `pos_x`, `pos_y`, `pos_z`, `pos_heading`, `state`, `rare`, `owner`, `coast`, `interior`, `garage`, `garage_enter_pos_x`, `garage_enter_pos_y`, `garage_enter_pos_z`, `garage_enter_pos_r`, `max_cars_count`, `max_cars_pos`, `atr_lock`) VALUES
(0, 0, 85.4992, -1959.44, 21.1217, 231.57, 0, 0, 'NONE', 100000, 0, 0, 0, 0, 0, 0, 1, '[{"x":88.96917724609375,"y":-1967.377197265625,"z":20.747447967529297,"r":316.5727233886719}]', 0),
(1, 0, 114.293, -1961.17, 21.3343, 213.367, 0, 0, 'NONE', 100000, 0, 0, 0, 0, 0, 0, 1, '[{"x":88.29222869873047,"y":-1968.3214111328125,"z":20.747453689575195,"r":322.0846252441406}]', 0),
(2, 0, 126.825, -1929.95, 21.3824, 216.343, 1, 0, 'Tellarion_Foldring', 100000, 0, 0, 0, 0, 0, 0, 1, '[{"x":115.2136001586914,"y":-1934.1644287109375,"z":20.59546661376953,"r":29.907238006591797}]', 0),
(3, 0, -881.726, 363.957, 85.3627, 229.543, 0, 2, 'NONE', 2500000, 0, 2, -888.374, 365.209, 0, 0, 4, '[{"x":"NONE","y":"NONE","z":"NONE"},{"x":"NONE","y":"NONE","z":"NONE"},{"x":"NONE","y":"NONE","z":"NONE"},{"x":"NONE","y":"NONE","z":"NONE"}]', 0),
(4, 0, -824.045, 806.049, 202.784, 199.76, 0, 2, 'NONE', 5000000, 2, 3, -812.261, 808.543, 202.108, 23, 7, '[{"x":224.16061401367188,"y":-1004.6085205078125,"z":-98.99995422363281,"r":230.9367370605469},{"x":224.16061401367188,"y":-996.6085205078125,"z":-98.99995422363281,"r":230.9367370605469},{"x":224.16061401367188,"y":-988.6085205078125,"z":-98.99995422363281,"r":230.9367370605469},{"x":224.16061401367188,"y":-980.6085205078125,"z":-98.99995422363281,"r":230.9367370605469},{"x":232.04319763183594,"y":-985.688232421875,"z":-98.99993896484375,"r":130.57059478759766},{"x":232.48822021484375,"y":-993.688232421875,"z":-98.99993896484375,"r":130.57059478759766},{"x":233.21250915527344,"y":-1000.688232421875,"z":-98.99993896484375,"r":130.57059478759766}]', 0),
(5, 0, 76.5446, -1948.21, 21.1741, 53.5632, 0, 0, 'NONE', 100000, 0, 0, 0, 0, 0, 0, 1, '[{"x":90.45074462890625,"y":-1939.2852783203125,"z":20.65102195739746,"r":31.034435272216797}]', 0),
(6, 0, 55.4727, -1921.69, 21.9111, 142.116, 0, 0, 'NONE', 100000, 0, 0, 0, 0, 0, 0, 1, '[{"x":69.954345703125,"y":-1918.7520751953125,"z":21.207565307617188,"r":228.46336364746094}]', 0),
(7, 0, 39.3061, -1911.75, 21.9535, 51.1889, 0, 0, 'NONE', 100000, 0, 0, 0, 0, 0, 0, 1, '[{"x":40.22001647949219,"y":-1923.0958251953125,"z":21.666017532348633,"r":318.66900634765625}]', 0),
(8, 0, 5.13019, -1884.25, 23.6973, 231.418, 0, 0, 'NONE', 100000, 0, 0, 0, 0, 0, 0, 1, '[{"x":18.488544464111328,"y":-1882.138916015625,"z":22.994962692260742,"r":320.71063232421875}]', 0),
(9, 0, -20.7984, -1858.71, 25.4087, 228.376, 0, 0, 'NONE', 100000, 0, 0, 0, 0, 0, 0, 1, '[{"x":-22.568178176879883,"y":-1851.9884033203125,"z":25.098249435424805,"r":320.7036437988281}]', 0),
(10, 0, 21.1056, -1844.49, 24.6017, 223.883, 0, 0, 'NONE', 100000, 0, 0, 0, 0, 0, 0, 1, '[{"x":6.637002944946289,"y":-1849.32666015625,"z":24.26659393310547,"r":226.8239288330078}]', 0),
(11, 0, 46.0157, -1864.37, 23.2783, 317.414, 0, 0, 'NONE', 100000, 0, 0, 0, 0, 0, 0, 1, '[{"x":42.45672607421875,"y":-1854.600830078125,"z":22.831562042236328,"r":131.0502471923828}]', 0),
(12, 0, 128.098, -1896.81, 23.6737, 246.776, 0, 0, 'NONE', 100000, 0, 0, 0, 0, 0, 0, 1, '[{"x":140.85494995117188,"y":-1886.8680419921875,"z":23.27077865600586,"r":245.03639221191406}]', 0),
(13, 0, 171.294, -1871.43, 24.4002, 246.596, 0, 0, 'NONE', 100000, 0, 0, 0, 0, 0, 0, 1, '[{"x":166.19898986816406,"y":-1860.6666259765625,"z":24.14579963684082,"r":155.1488494873047}]', 0),
(14, 0, 178.959, -1924.35, 21.371, 317.683, 0, 0, 'NONE', 100000, 0, 0, 0, 0, 0, 0, 1, '[{"x":166.8881378173828,"y":-1928.2801513671875,"z":21.012596130371094,"r":232.663818359375}]', 0);

-- --------------------------------------------------------

--
-- Table structure for table `persons`
--

CREATE TABLE `persons` (
  `id` int(11) NOT NULL,
  `account` varchar(128) NOT NULL DEFAULT '',
  `status` int(11) NOT NULL DEFAULT '0',
  `warns` int(11) NOT NULL,
  `ip` varchar(128) NOT NULL DEFAULT '',
  `g_online` int(11) NOT NULL DEFAULT '0',
  `g_name` varchar(64) NOT NULL DEFAULT '',
  `g_sex` int(11) NOT NULL DEFAULT '0',
  `g_bio` varchar(128) NOT NULL DEFAULT '',
  `g_character_create` int(11) NOT NULL DEFAULT '0',
  `g_character_style_1` varchar(1703) NOT NULL DEFAULT '',
  `g_character_style_2` varchar(1703) NOT NULL DEFAULT '',
  `g_character_style_3` varchar(1703) NOT NULL DEFAULT '',
  `g_character_head_color` int(11) NOT NULL DEFAULT '0',
  `g_money` int(11) NOT NULL DEFAULT '0',
  `g_victims` int(11) NOT NULL DEFAULT '0',
  `g_respect` int(11) NOT NULL DEFAULT '0',
  `g_zavisim` int(11) NOT NULL DEFAULT '0',
  `g_drugs` int(11) NOT NULL DEFAULT '0',
  `g_materials` int(11) NOT NULL DEFAULT '0',
  `g_health` int(11) NOT NULL DEFAULT '0',
  `g_armour` int(11) NOT NULL DEFAULT '0',
  `g_job` int(11) NOT NULL DEFAULT '0',
  `g_fraction` int(11) NOT NULL DEFAULT '0',
  `g_fraction_clothes` int(11) NOT NULL DEFAULT '0',
  `g_fraction_rang` int(11) NOT NULL DEFAULT '0',
  `g_gang` int(11) NOT NULL DEFAULT '0',
  `g_gang_clothes` int(11) NOT NULL DEFAULT '0',
  `g_gang_rang` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `persons`
--

INSERT INTO `persons` (`id`, `account`, `status`, `warns`, `ip`, `g_online`, `g_name`, `g_sex`, `g_bio`, `g_character_create`, `g_character_style_1`, `g_character_style_2`, `g_character_style_3`, `g_character_head_color`, `g_money`, `g_victims`, `g_respect`, `g_zavisim`, `g_drugs`, `g_materials`, `g_health`, `g_armour`, `g_job`, `g_fraction`, `g_fraction_clothes`, `g_fraction_rang`, `g_gang`, `g_gang_clothes`, `g_gang_rang`) VALUES
(1, 'tellarion', 2, 0, '95.59.123.94', 0, 'Tellarion', 0, '', 1, '[{"drawable":255,"palette":0,"texture":0},{"drawable":255,"palette":0,"texture":0},{"drawable":4,"palette":0,"texture":0},{"drawable":0,"palette":0,"texture":0},{"drawable":1,"palette":0,"texture":0},{"drawable":255,"palette":0,"texture":0},{"drawable":1,"palette":0,"texture":0},{"drawable":255,"palette":0,"texture":0},{"drawable":1,"palette":0,"texture":0},{"drawable":255,"palette":0,"texture":0},{"drawable":255,"palette":0,"texture":0},{"drawable":1,"palette":0,"texture":0}]', '[{"drawable":255,"texture":0},{"drawable":255,"texture":0},{"drawable":255,"texture":0}]', '[20,16,15,4]', 9, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(2, 'senatorls', 2, 0, '95.154.171.147', 0, 'Senator', 0, '', 1, '[{"drawable":255,"palette":0,"texture":0},{"drawable":255,"palette":0,"texture":0},{"drawable":255,"palette":0,"texture":0},{"drawable":0,"palette":0,"texture":0},{"drawable":1,"palette":0,"texture":0},{"drawable":255,"palette":0,"texture":0},{"drawable":1,"palette":0,"texture":0},{"drawable":255,"palette":64,"texture":1},{"drawable":1,"palette":0,"texture":0},{"drawable":255,"palette":156,"texture":87},{"drawable":255,"palette":64,"texture":195},{"drawable":1,"palette":0,"texture":0}]', '[{"drawable":255,"texture":91},{"drawable":255,"texture":211},{"drawable":255,"texture":92}]', '[17,11,18,36]', 0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(5, 'dmitriytimofeev', 2, 0, '37.140.189.197', 0, 'Dmitriy_Timofeev', 0, '', 1, '[{"drawable":255,"palette":144,"texture":0},{"drawable":255,"palette":51,"texture":10},{"drawable":2,"palette":0,"texture":0},{"drawable":0,"palette":0,"texture":0},{"drawable":1,"palette":0,"texture":0},{"drawable":255,"palette":0,"texture":0},{"drawable":1,"palette":0,"texture":0},{"drawable":255,"palette":0,"texture":0},{"drawable":1,"palette":0,"texture":0},{"drawable":255,"palette":51,"texture":9},{"drawable":255,"palette":0,"texture":85},{"drawable":1,"palette":0,"texture":0}]', '[{"drawable":255,"texture":0},{"drawable":255,"texture":0},{"drawable":255,"texture":0}]', '[3,7,6,1]', 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(4, 'light', 2, 0, '5.3.182.14', 0, 'Light', 0, '123', 1, '[{"drawable":255,"palette":144,"texture":0},{"drawable":255,"palette":223,"texture":108},{"drawable":15,"palette":0,"texture":0},{"drawable":0,"palette":0,"texture":0},{"drawable":1,"palette":0,"texture":0},{"drawable":255,"palette":0,"texture":0},{"drawable":1,"palette":0,"texture":0},{"drawable":255,"palette":0,"texture":34},{"drawable":1,"palette":0,"texture":0},{"drawable":255,"palette":223,"texture":108},{"drawable":255,"palette":0,"texture":85},{"drawable":1,"palette":0,"texture":0}]', '[{"drawable":255,"texture":223},{"drawable":255,"texture":85},{"drawable":255,"texture":0}]', '[24,10,14,5]', 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(6, 'kobalt232', 2, 0, '195.248.187.199', 0, 'Myers_Chipitto', 0, '', 0, '[{"drawable":255,"palette":248,"texture":0},{"drawable":255,"palette":160,"texture":1},{"drawable":15,"palette":0,"texture":0},{"drawable":0,"palette":0,"texture":0},{"drawable":1,"palette":0,"texture":0},{"drawable":255,"palette":0,"texture":0},{"drawable":1,"palette":0,"texture":0},{"drawable":255,"palette":0,"texture":0},{"drawable":1,"palette":0,"texture":0},{"drawable":255,"palette":0,"texture":0},{"drawable":255,"palette":0,"texture":0},{"drawable":1,"palette":0,"texture":0}]', '[{"drawable":255,"texture":0},{"drawable":255,"texture":0},{"drawable":255,"texture":0}]', '[1,1,25,30]', 0, 0, 0, 0, 0, 0, 0, 100, 100, 0, 0, 0, 0, 0, 0, 0),
(7, 'popp11', 2, 0, '77.111.245.10', 0, 'Jhonson_Kliford', 0, '', 1, '[{"drawable":255,"palette":0,"texture":0},{"drawable":255,"palette":0,"texture":0},{"drawable":15,"palette":0,"texture":0},{"drawable":0,"palette":0,"texture":0},{"drawable":1,"palette":0,"texture":0},{"drawable":255,"palette":0,"texture":0},{"drawable":1,"palette":0,"texture":0},{"drawable":255,"palette":127,"texture":255},{"drawable":1,"palette":0,"texture":0},{"drawable":255,"palette":245,"texture":96},{"drawable":255,"palette":0,"texture":85},{"drawable":1,"palette":0,"texture":0}]', '[{"drawable":255,"texture":0},{"drawable":255,"texture":127},{"drawable":255,"texture":0}]', '[19,16,25,37]', 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(8, 'veit', 2, 0, '128.74.179.171', 0, 'Alejandro_Cortez', 0, '', 0, '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(9, 'reed', 2, 0, '5.254.65.177', 0, 'Ray_Reed', 0, '', 0, '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(10, 'arkansa', 2, 0, '93.92.114.90', 0, 'William_Arkansa', 0, '', 1, '[{"drawable":255,"palette":83,"texture":76},{"drawable":255,"palette":86,"texture":73},{"drawable":19,"palette":0,"texture":0},{"drawable":0,"palette":0,"texture":0},{"drawable":1,"palette":0,"texture":0},{"drawable":255,"palette":0,"texture":0},{"drawable":1,"palette":0,"texture":0},{"drawable":255,"palette":0,"texture":0},{"drawable":1,"palette":0,"texture":0},{"drawable":255,"palette":6,"texture":0},{"drawable":255,"palette":0,"texture":0},{"drawable":1,"palette":0,"texture":0}]', '[{"drawable":255,"texture":41},{"drawable":255,"texture":255},{"drawable":255,"texture":0}]', '[35,29,13,1]', 27, 1000, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 17, 0, 0, 0),
(11, 'reed', 2, 0, '5.254.65.177', 0, 'Ray_Collins', 0, '', 0, '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(12, 'arkansa', 2, 0, '93.92.114.90', 0, 'Joseph_Oshie', 0, '', 1, '[{"drawable":255,"palette":249,"texture":0},{"drawable":255,"palette":60,"texture":159},{"drawable":255,"palette":0,"texture":26},{"drawable":0,"palette":0,"texture":0},{"drawable":1,"palette":0,"texture":0},{"drawable":255,"palette":0,"texture":0},{"drawable":1,"palette":0,"texture":0},{"drawable":255,"palette":26,"texture":123},{"drawable":1,"palette":0,"texture":0},{"drawable":255,"palette":150,"texture":18},{"drawable":255,"palette":0,"texture":41},{"drawable":1,"palette":0,"texture":0}]', '[{"drawable":255,"texture":150},{"drawable":255,"texture":41},{"drawable":255,"texture":0}]', '[1,1,13,24]', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(13, 'smesh', 2, 0, '95.67.197.82', 0, 'Egor_Mitrofanov', 0, 'Отучился 11 классов поступил в МГУ  и потом переехал в Лос-Сантогс', 0, '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(14, 'hannibal', 2, 0, '46.174.114.187', 0, 'Mycroft_Livingston', 0, '', 1, '[{"drawable":255,"palette":0,"texture":0},{"drawable":255,"palette":5,"texture":0},{"drawable":17,"palette":0,"texture":0},{"drawable":0,"palette":0,"texture":0},{"drawable":1,"palette":0,"texture":0},{"drawable":255,"palette":195,"texture":17},{"drawable":1,"palette":0,"texture":0},{"drawable":255,"palette":0,"texture":0},{"drawable":1,"palette":0,"texture":0},{"drawable":255,"palette":0,"texture":0},{"drawable":255,"palette":5,"texture":0},{"drawable":1,"palette":0,"texture":0}]', '[{"drawable":255,"texture":73},{"drawable":255,"texture":109},{"drawable":255,"texture":204}]', '[8,22,4,1]', 29, 1000, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `suspects`
--

CREATE TABLE `suspects` (
  `id` int(11) NOT NULL,
  `officer` varchar(128) NOT NULL DEFAULT 'NONE',
  `suspect` varchar(128) NOT NULL DEFAULT 'NONE',
  `reason` varchar(128) NOT NULL DEFAULT 'NONE',
  `wanted` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `donate`
--
ALTER TABLE `donate`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `houses`
--
ALTER TABLE `houses`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `persons`
--
ALTER TABLE `persons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suspects`
--
ALTER TABLE `suspects`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=987;
--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `donate`
--
ALTER TABLE `donate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `houses`
--
ALTER TABLE `houses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;
--
-- AUTO_INCREMENT for table `persons`
--
ALTER TABLE `persons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=240;
--
-- AUTO_INCREMENT for table `suspects`
--
ALTER TABLE `suspects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
