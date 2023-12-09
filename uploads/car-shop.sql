-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Дек 09 2023 г., 10:18
-- Версия сервера: 8.0.30
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `car-shop`
--

-- --------------------------------------------------------

--
-- Структура таблицы `brand`
--

CREATE TABLE `brand` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `brand`
--

INSERT INTO `brand` (`id`, `name`) VALUES
(1, 'BMW'),
(2, 'Ford'),
(3, 'Audi'),
(4, 'Acura\r\n');

-- --------------------------------------------------------

--
-- Структура таблицы `car`
--

CREATE TABLE `car` (
  `id` int NOT NULL,
  `brandId` int NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `model` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `price` decimal(20,2) NOT NULL,
  `year` int NOT NULL,
  `color` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `engineType` enum('Бензиновый','Дизельный','Электрический') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `transmission` enum('Автоматическая','Ручная','Роботизированная') COLLATE utf8mb4_general_ci DEFAULT NULL,
  `range` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `car`
--

INSERT INTO `car` (`id`, `brandId`, `image`, `model`, `price`, `year`, `color`, `engineType`, `transmission`, `range`) VALUES
(1, 1, 'https://70.img.avito.st/image/1/1.dapMuLa42UN6ERtGKuFojUsa20XyGVtLOhzbQfwR0Un6.-wNMytz8EzEXsztr-ROycK7IMIOTS9rtgR0cZ0tMPPA', 'X5', '7980000.00', 2022, '#000', 'Бензиновый', 'Автоматическая', 11111),
(2, 2, 'https://70.img.avito.st/image/1/1.dapMuLa42UN6ERtGKuFojUsa20XyGVtLOhzbQfwR0Un6.-wNMytz8EzEXsztr-ROycK7IMIOTS9rtgR0cZ0tMPPA', 'X5', '7980000.00', 2022, '#000', 'Бензиновый', 'Автоматическая', 11111),
(3, 3, 'https://cdn.bigboytoyz.com/new-version/products/whatsapp-image-2023-10-21-at-11.02.28-am.jpeg', 'RS Q8', '1000000.00', 2022, '#000', 'Бензиновый', 'Автоматическая', 11111),
(4, 3, 'https://stat.overdrive.in/wp-content/odgallery/2017/04/35019_AudiA3Cabriolet201735TFSI-015_468x263.JPG', 'A3', '6000000.00', 2022, '#fff', 'Бензиновый', 'Автоматическая', 11111),
(5, 1, 'https://70.img.avito.st/image/1/1.dapMuLa42UN6ERtGKuFojUsa20XyGVtLOhzbQfwR0Un6.-wNMytz8EzEXsztr-ROycK7IMIOTS9rtgR0cZ0tMPPA', 'X5', '7980000.00', 2022, '#000', 'Бензиновый', 'Автоматическая', 11111),
(6, 1, 'https://70.img.avito.st/image/1/1.dapMuLa42UN6ERtGKuFojUsa20XyGVtLOhzbQfwR0Un6.-wNMytz8EzEXsztr-ROycK7IMIOTS9rtgR0cZ0tMPPA', 'X5', '7980000.00', 2022, '#000', 'Бензиновый', 'Автоматическая', 11111),
(7, 1, 'https://70.img.avito.st/image/1/1.dapMuLa42UN6ERtGKuFojUsa20XyGVtLOhzbQfwR0Un6.-wNMytz8EzEXsztr-ROycK7IMIOTS9rtgR0cZ0tMPPA', 'X5', '7980000.00', 2022, '#000', 'Бензиновый', 'Автоматическая', 11111),
(8, 1, 'https://70.img.avito.st/image/1/1.dapMuLa42UN6ERtGKuFojUsa20XyGVtLOhzbQfwR0Un6.-wNMytz8EzEXsztr-ROycK7IMIOTS9rtgR0cZ0tMPPA', 'X5', '7980000.00', 2022, '#000', 'Бензиновый', 'Автоматическая', 11111),
(9, 1, 'https://70.img.avito.st/image/1/1.dapMuLa42UN6ERtGKuFojUsa20XyGVtLOhzbQfwR0Un6.-wNMytz8EzEXsztr-ROycK7IMIOTS9rtgR0cZ0tMPPA', 'X5', '7980000.00', 2022, '#000', 'Бензиновый', 'Автоматическая', 11111),
(10, 1, 'https://70.img.avito.st/image/1/1.dapMuLa42UN6ERtGKuFojUsa20XyGVtLOhzbQfwR0Un6.-wNMytz8EzEXsztr-ROycK7IMIOTS9rtgR0cZ0tMPPA', 'X5', '7980000.00', 2022, '#000', 'Бензиновый', 'Автоматическая', 11111),
(11, 1, 'https://70.img.avito.st/image/1/1.dapMuLa42UN6ERtGKuFojUsa20XyGVtLOhzbQfwR0Un6.-wNMytz8EzEXsztr-ROycK7IMIOTS9rtgR0cZ0tMPPA', 'X5', '7980000.00', 2022, '#000', 'Бензиновый', 'Автоматическая', 11111),
(12, 1, 'https://70.img.avito.st/image/1/1.dapMuLa42UN6ERtGKuFojUsa20XyGVtLOhzbQfwR0Un6.-wNMytz8EzEXsztr-ROycK7IMIOTS9rtgR0cZ0tMPPA', 'X5', '7980000.00', 2022, '#000', 'Бензиновый', 'Автоматическая', 11111),
(13, 1, 'https://70.img.avito.st/image/1/1.dapMuLa42UN6ERtGKuFojUsa20XyGVtLOhzbQfwR0Un6.-wNMytz8EzEXsztr-ROycK7IMIOTS9rtgR0cZ0tMPPA', 'X5', '7980000.00', 2022, '#000', 'Бензиновый', 'Автоматическая', 11111),
(14, 1, 'https://70.img.avito.st/image/1/1.dapMuLa42UN6ERtGKuFojUsa20XyGVtLOhzbQfwR0Un6.-wNMytz8EzEXsztr-ROycK7IMIOTS9rtgR0cZ0tMPPA', 'X5', '7980000.00', 2022, '#000', 'Бензиновый', 'Автоматическая', 11111),
(15, 1, 'https://70.img.avito.st/image/1/1.dapMuLa42UN6ERtGKuFojUsa20XyGVtLOhzbQfwR0Un6.-wNMytz8EzEXsztr-ROycK7IMIOTS9rtgR0cZ0tMPPA', 'X5', '7980000.00', 2022, '#000', 'Бензиновый', 'Автоматическая', 11111),
(16, 1, 'https://70.img.avito.st/image/1/1.dapMuLa42UN6ERtGKuFojUsa20XyGVtLOhzbQfwR0Un6.-wNMytz8EzEXsztr-ROycK7IMIOTS9rtgR0cZ0tMPPA', 'X5', '7980000.00', 2022, '#000', 'Бензиновый', 'Автоматическая', 11111),
(17, 1, 'https://70.img.avito.st/image/1/1.dapMuLa42UN6ERtGKuFojUsa20XyGVtLOhzbQfwR0Un6.-wNMytz8EzEXsztr-ROycK7IMIOTS9rtgR0cZ0tMPPA', 'X5', '7980000.00', 2022, '#000', 'Бензиновый', 'Автоматическая', 11111),
(18, 1, 'https://70.img.avito.st/image/1/1.dapMuLa42UN6ERtGKuFojUsa20XyGVtLOhzbQfwR0Un6.-wNMytz8EzEXsztr-ROycK7IMIOTS9rtgR0cZ0tMPPA', 'X5', '7980000.00', 2022, '#000', 'Бензиновый', 'Автоматическая', 11111),
(19, 2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmm0eitFRqN2U-ZaSq4-7zDxx6q3vMepYJF7xIsn5Y_w&s', 'Lineup', '1000.00', 2021, '#140808', 'Электрический', NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `car_configuration`
--

CREATE TABLE `car_configuration` (
  `carId` int NOT NULL,
  `configurationId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `car_configuration`
--

INSERT INTO `car_configuration` (`carId`, `configurationId`) VALUES
(1, 3),
(1, 4),
(1, 5),
(19, 5),
(1, 6),
(19, 6);

-- --------------------------------------------------------

--
-- Структура таблицы `configuration`
--

CREATE TABLE `configuration` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `configuration`
--

INSERT INTO `configuration` (`id`, `name`) VALUES
(1, 'регулировка сидений'),
(2, 'регулировка руля'),
(3, 'бортовой компьютер'),
(4, 'камера заднего вида'),
(5, 'обогрев руля'),
(6, 'обогрев сидений'),
(7, 'тонированные стекла'),
(8, 'усилитель руля'),
(9, 'электростеклоподъемники'),
(10, 'темный салон'),
(11, 'кондиционер'),
(12, 'антипробуксовочная система'),
(13, 'подушка безопасности '),
(14, 'галогеновые фары'),
(15, 'противотуманные фары'),
(16, 'центральный замок'),
(17, 'штатный иммобилайзер');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`id`),
  ADD KEY `brandId` (`brandId`);

--
-- Индексы таблицы `car_configuration`
--
ALTER TABLE `car_configuration`
  ADD PRIMARY KEY (`carId`,`configurationId`),
  ADD UNIQUE KEY `car_configuration_configurationId_carId_unique` (`carId`,`configurationId`),
  ADD KEY `configurationId` (`configurationId`);

--
-- Индексы таблицы `configuration`
--
ALTER TABLE `configuration`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `brand`
--
ALTER TABLE `brand`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `car`
--
ALTER TABLE `car`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT для таблицы `configuration`
--
ALTER TABLE `configuration`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `car`
--
ALTER TABLE `car`
  ADD CONSTRAINT `car_ibfk_1` FOREIGN KEY (`brandId`) REFERENCES `brand` (`id`) ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `car_configuration`
--
ALTER TABLE `car_configuration`
  ADD CONSTRAINT `car_configuration_ibfk_1` FOREIGN KEY (`carId`) REFERENCES `car` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `car_configuration_ibfk_2` FOREIGN KEY (`configurationId`) REFERENCES `configuration` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
