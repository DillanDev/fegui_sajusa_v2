-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-08-2021 a las 19:18:03
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `fegui_sajusa`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `products_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`) VALUES
('Cuidado del oído'),
('Cuidado nasal'),
('Cuidado vocal');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `author` varchar(60) NOT NULL,
  `content` text NOT NULL,
  `like_count` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `surname` varchar(60) NOT NULL,
  `gender` varchar(15) NOT NULL,
  `email` varchar(60) NOT NULL,
  `telephone` varchar(15) DEFAULT NULL,
  `password` varchar(60) NOT NULL,
  `status` varchar(11) NOT NULL DEFAULT 'active',
  `city` varchar(30) NOT NULL,
  `region` varchar(30) NOT NULL,
  `zip` varchar(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updateAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `customers`
--

INSERT INTO `customers` (`id`, `name`, `surname`, `gender`, `email`, `telephone`, `password`, `status`, `city`, `region`, `zip`, `createdAt`, `updateAt`) VALUES
(34, 'ramon', 'arepa', 'masculino', 'ramon@gmail.com', '45345', '$2b$10$NyW.zQhQ2yH4HN0O3/O7iuwZLI9uhyMWIOCxaqDlAkBfSyrJ/XMdC', 'active', 'Bogota', 'Bogota', 'Cundinamarc', '2021-07-22 14:50:17', '2021-07-22 14:50:17'),
(104, 'dilan', 'gonzalez', 'masculino', 'dilangvidal@gmail.com', '+573014191174', '$2b$10$BpVO2WiWltx/1XzmGfdcKeM5mdfqttIsBZNcQU9HXM3aDZTshwnqi', 'active', 'Riohacha', 'Riohacha', 'LA GUAJIRA', '2021-07-22 14:55:34', '2021-07-22 14:55:34');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `details`
--

CREATE TABLE `details` (
  `id` int(11) NOT NULL,
  `products_id` int(11) NOT NULL,
  `orders_id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `price` float NOT NULL,
  `sku` varchar(60) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `surname` varchar(30) NOT NULL,
  `gender` varchar(15) NOT NULL,
  `email` varchar(60) NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `password` varchar(60) NOT NULL,
  `role` varchar(20) NOT NULL,
  `status` varchar(30) DEFAULT 'active',
  `city` varchar(30) NOT NULL,
  `region` varchar(30) NOT NULL,
  `zip` varchar(10) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `employees`
--

INSERT INTO `employees` (`id`, `name`, `surname`, `gender`, `email`, `telephone`, `password`, `role`, `status`, `city`, `region`, `zip`, `createdAt`, `updateAt`) VALUES
(118, 'dilan', 'gonzalez', 'masculino', 'dilangvidal@gmail.com', '+573014191174', '$2b$10$R770rv95x4LeWqAb86xtjuG4AxqwiWU9TtwdH1IcHKGmUbU3386Ze', 'admin', 'active', 'Riohacha', 'Riohacha', 'LA GUAJIRA', '2021-07-22 14:35:11', '2021-07-22 14:35:11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `employeesxproducts`
--

CREATE TABLE `employeesxproducts` (
  `id` int(11) NOT NULL,
  `employees_id` int(11) NOT NULL,
  `products_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `shippingName` varchar(60) NOT NULL,
  `shipAddress` varchar(60) NOT NULL,
  `shipAddress2` varchar(60) DEFAULT NULL,
  `city` varchar(60) NOT NULL,
  `region` varchar(60) NOT NULL,
  `zip` varchar(30) NOT NULL,
  `telephone` varchar(15) DEFAULT NULL,
  `shipping` varchar(30) NOT NULL,
  `email` varchar(60) NOT NULL,
  `date` datetime NOT NULL,
  `shipped` tinyint(1) NOT NULL,
  `tranckingNumber` varchar(80) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id`, `customer_id`, `shippingName`, `shipAddress`, `shipAddress2`, `city`, `region`, `zip`, `telephone`, `shipping`, `email`, `date`, `shipped`, `tranckingNumber`, `createdAt`, `updateAt`) VALUES
(1, 34, 'Dilan Gonzalez', 'Calle 36#10-20', 'Calle 37#9-27', 'Riohacha', 'La Guajira', '440001', '3014191174', 'medias ortopedicas', 'ramon@gmail.com', '2021-07-06 18:50:08', 0, '1423456789767653445656', '2021-07-06 16:52:59', '2021-07-06 16:52:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `payment_type` varchar(60) NOT NULL,
  `name` varchar(60) NOT NULL,
  `account_no` bigint(20) NOT NULL,
  `expiry` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `payment`
--

INSERT INTO `payment` (`id`, `customer_id`, `payment_type`, `name`, `account_no`, `expiry`) VALUES
(1, 34, 'mastercard', 'Ramon Garcia', 234567898639865, '2021-07-01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `employees_id` int(11) NOT NULL,
  `image` varchar(60) DEFAULT NULL,
  `title` text NOT NULL,
  `content` mediumtext NOT NULL,
  `comment_count` int(11) NOT NULL,
  `like_count` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category_id` varchar(30) NOT NULL,
  `discount` decimal(10,0) NOT NULL,
  `inventory` int(11) NOT NULL,
  `sku` varchar(80) NOT NULL,
  `name` varchar(60) NOT NULL,
  `price` float NOT NULL,
  `weight` float NOT NULL,
  `shortDesc` text NOT NULL,
  `longDesc` mediumtext NOT NULL,
  `image` varchar(60) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `category_id`, `discount`, `inventory`, `sku`, `name`, `price`, `weight`, `shortDesc`, `longDesc`, `image`, `createdAt`, `updateAt`) VALUES
(2, 'Cuidado del oído', '0', 4, 'generado', 'Lipo Flavonoid', 590, 1, '# 1 RECOMENDADO POR EL MÉDICO: considerado por los otorrinolaringólogos como la solución de venta libre más eficaz para reducir el zumbido en los oídos. | COMPLEJO BIOFLAVONOIDE DE LIMÓN NATURAL: contiene vitaminas C, B1, B2, B6, B12, calcio, bitartrato de colina, inositol, niacina y ácido pantoténico para brindar apoyo nutricional para el oído interno de personas con tinnitus y síndrome de Meniere. | ESTUDIADO CLÍNICAMENTE: el beneficio terapéutico ha sido ampliamente reconocido en más de 50 años de uso y observación para el tratamiento del tinnitus. | RÉGIMEN RECOMENDADO: tomar 2 comprimidos 3 veces al día (6 comprimidos en total cada día) durante al menos 60 días. | GARANTÍA DE DEVOLUCIÓN DE DINERO: si no encuentra alivio del zumbido en los oídos con el uso según las instrucciones durante 60 días, le reembolsaremos su compra.', 'El lipo-flavonoide es un producto bioflavonoide natural que se ha utilizado ampliamente durante décadas para proporcionar apoyo nutricional para el oído interno de pacientes con síndrome de Meniere y tinnitus. Es un producto seguro, a menudo efectivo, que puede brindar alivio a las personas que sufren de zumbido en los oídos. Lipo-Flavonoid contiene bioflavonoides de limón recomendados por los médicos número uno y otros nutrientes esenciales para ayudar a mantener la salud del oído interno. La dosificación adecuada es esencial para lograr resultados óptimos con Lipo-Flavonoid. Cuando se toma correctamente, el beneficio terapéutico ha sido ampliamente reconocido en más de 50 años de observación clínica. Tome 2 comprimidos 3 veces al día (6 comprimidos al día) durante al menos 60 días (un total de 360 comprimidos). Si bien no se conoce ningún tratamiento para el tinnitus que brinde un alivio completo a todos los pacientes, se ha demostrado que el lipo-flavonoide brinda alivio a algunas personas que sufren de zumbido en los oídos. Si bien Lipo-Flavonoid puede no funcionar para todos, respaldamos nuestro producto, nuestra historia y nuestros resultados. Si no encuentra alivio de los síntomas con el uso de los productos en comprimidos Lipo-Flavonoid como se indica durante 60 días, le reembolsaremos su compra.\r\n\r\nMarca: Visit the Lipo-Flavonoid Store\r\nFabricante: Visit the Lipo-Flavonoid Store\r\n\r\nPuedes visitar nuestro catalogo de productos en Mercado Libre, Durante todo el proceso estaremos en contacto contigo hasta el día de la entrega, Contamos con los precios mas accesibles para ti,\r\nA partir de tu 2da compra cuentas con asesoría personalizada para la búsqueda de tus productos según presupuesto, categorías, referencias y marcas al mejor precio. GARANTÍA:\r\nCuentas con garantía de 30 días efectiva a partir del recibido por calidad y funcionamiento, la cual atenderemos en el menor tiempo posible, para que logres disfrutar de tu producto. Tu dinero estará 100% protegido durante todo el proceso por la plataforma de Mercado Libre.\r\nSomos MercadoLider Platinum, Uno de los mejores del Sitio.', NULL, '2021-08-05 22:46:43', '2021-08-05 22:46:43'),
(3, 'Cuidado del oído', '0', 12, 'generado por el programa', ' La ciprofloxacina', 523, 1, 'La ciprofloxacina pertenece a una clase de antibióticos llamados fluoroquinolonas. Actúa eliminando las bacterias que causan las infecciones. Los antibióticos como la ciprofloxacina no funcionan para combatir resfriados, influenza u otras infecciones virales.', 'La ciprofloxacina se usa para tratar o prevenir ciertas infecciones causadas por bacterias como la neumonía; gonorrea (una enfermedad de transmisión sexual); fiebre tifoidea (una infección grave que es común en los países en desarrollo); diarrea infecciosa (infecciones que ocasionan una diarrea intensa); e infecciones de la piel, de los huesos, articulaciones, abdomen (área del estómago) y próstata (glándula reproductiva masculina). La ciprofloxacina también se usa para tratar o prevenir la peste (una infección grave que puede propagarse a propósito como parte de un ataque bioterrorista) e ántrax por inhalación (una infección grave que los gérmenes de ántrax pueden propagar en el aire a propósito como parte de un ataque bioterrorista.). La ciprofloxacina también se puede usar para tratar la bronquitis, infecciones de los senos nasales o infecciones del tracto urinario, pero no se debe usar para la bronquitis ni las infecciones de los senos nasales, ni para algunos tipos de infecciones del tracto urinario si hay otras opciones de tratamiento. Las tabletas de liberación prolongada (acción prolongada) de ciprofloxacina se usan para tratar infecciones de los riñones y del tracto urinario; sin embargo, algunos tipos de infecciones urinarias solo se deben tratar con las tabletas de liberación prolongada de ciprofloxacina si no hay otras opciones de tratamiento disponibles. La ciprofloxacina pertenece a una clase de antibióticos llamados fluoroquinolonas. Actúa eliminando las bacterias que causan las infecciones.\r\n\r\n', NULL, '2021-08-05 23:09:36', '2021-08-05 23:09:36');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `shoppingseccion`
--

CREATE TABLE `shoppingseccion` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `price` float NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_products` (`products_id`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_post` (`post_id`);

--
-- Indices de la tabla `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `telephone` (`telephone`);

--
-- Indices de la tabla `details`
--
ALTER TABLE `details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_productos` (`products_id`),
  ADD KEY `fk_orders` (`orders_id`);

--
-- Indices de la tabla `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `employeesxproducts`
--
ALTER TABLE `employeesxproducts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_id` (`employees_id`),
  ADD KEY `employees_id` (`products_id`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_customers` (`customer_id`);

--
-- Indices de la tabla `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_customer` (`customer_id`);

--
-- Indices de la tabla `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_employees` (`employees_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cartegory` (`category_id`);

--
-- Indices de la tabla `shoppingseccion`
--
ALTER TABLE `shoppingseccion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_customera` (`customer_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT de la tabla `details`
--
ALTER TABLE `details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT de la tabla `employeesxproducts`
--
ALTER TABLE `employeesxproducts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `shoppingseccion`
--
ALTER TABLE `shoppingseccion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `fk_products` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_post` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`);

--
-- Filtros para la tabla `details`
--
ALTER TABLE `details`
  ADD CONSTRAINT `fk_orders` FOREIGN KEY (`orders_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `fk_productos` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `employeesxproducts`
--
ALTER TABLE `employeesxproducts`
  ADD CONSTRAINT `employeesxproducts_ibfk_1` FOREIGN KEY (`employees_id`) REFERENCES `employees` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `employeesxproducts_ibfk_2` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_customers` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`);

--
-- Filtros para la tabla `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `fk_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`);

--
-- Filtros para la tabla `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `fk_employees` FOREIGN KEY (`employees_id`) REFERENCES `employees` (`id`);

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_cartegory` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Filtros para la tabla `shoppingseccion`
--
ALTER TABLE `shoppingseccion`
  ADD CONSTRAINT `fk_customera` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
