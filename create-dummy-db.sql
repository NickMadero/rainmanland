-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: rainmanland-dev
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
  `appointment_id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `date_occuring` date NOT NULL,
  `is_complete` tinyint NOT NULL DEFAULT '0',
  `zone_amount` int DEFAULT NULL,
  `head_per_zone` int DEFAULT NULL,
  `controller_brand` enum('test_controller') DEFAULT NULL,
  `controller_is_outside` tinyint DEFAULT '0',
  PRIMARY KEY (`appointment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
INSERT INTO `appointment` VALUES (1,'275 Wilmer St, Glassboro, NJ 08028','2023-04-19',0,2,2,'test_controller',0),(2,'354 Egg Harbor Rd, Sewell, NJ 08080','2023-04-19',0,2,4,'test_controller',0),(3,'1 Berlin Rd Ste 3, Clementon, NJ 08021','2023-04-20',0,1,4,'test_controller',0),(4,'323 Delsea Dr, Westville, NJ 08093','2023-04-20',0,2,4,'test_controller',1);
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assigned_by`
--

DROP TABLE IF EXISTS `assigned_by`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assigned_by` (
  `assigned_by_id` int NOT NULL AUTO_INCREMENT,
  `date_time_created` datetime NOT NULL,
  `customer_id` int NOT NULL,
  `appointment_id` int NOT NULL,
  PRIMARY KEY (`assigned_by_id`),
  KEY `FK_assigned_by_appointment_idx` (`appointment_id`),
  KEY `FK_assigned_by_customer_idx` (`customer_id`),
  CONSTRAINT `FK_assigned_by_appointment` FOREIGN KEY (`assigned_by_id`) REFERENCES `appointment` (`appointment_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `FK_assigned_by_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assigned_by`
--

LOCK TABLES `assigned_by` WRITE;
/*!40000 ALTER TABLE `assigned_by` DISABLE KEYS */;
INSERT INTO `assigned_by` VALUES (1,'2023-03-17 22:07:06',1,1),(2,'2023-03-17 22:07:06',2,2),(3,'2023-03-17 22:07:06',3,3),(4,'2023-03-18 02:02:41',4,4);
/*!40000 ALTER TABLE `assigned_by` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boss`
--

DROP TABLE IF EXISTS `boss`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boss` (
  `user_id` int NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `FK_boss_user_idx` (`user_id`) /*!80000 INVISIBLE */,
  CONSTRAINT `FK_boss_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boss`
--

LOCK TABLES `boss` WRITE;
/*!40000 ALTER TABLE `boss` DISABLE KEYS */;
INSERT INTO `boss` VALUES (1);
/*!40000 ALTER TABLE `boss` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crew`
--

DROP TABLE IF EXISTS `crew`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `crew` (
  `crew_id` int NOT NULL AUTO_INCREMENT,
  `starting_location` varchar(255) NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`crew_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crew`
--

LOCK TABLES `crew` WRITE;
/*!40000 ALTER TABLE `crew` DISABLE KEYS */;
INSERT INTO `crew` VALUES (1,'539 Watsons Mill Rd, Woodstown, NJ 08098',1),(2,'539 Watsons Mill Rd, Woodstown, NJ 08098',1);
/*!40000 ALTER TABLE `crew` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crew_member`
--

DROP TABLE IF EXISTS `crew_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `crew_member` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `date_hired` date DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `FK_crew_member_user_idx` (`user_id`),
  CONSTRAINT `FK_crew_member_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crew_member`
--

LOCK TABLES `crew_member` WRITE;
/*!40000 ALTER TABLE `crew_member` DISABLE KEYS */;
INSERT INTO `crew_member` VALUES (1,'2023-03-20'),(2,'2023-03-20'),(3,'2023-03-20'),(4,'2023-03-20'),(5,'2023-03-20');
/*!40000 ALTER TABLE `crew_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `date_joined` date DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'john.doe@example.com','John','Doe','2023-01-15'),(2,'jane.doe@example.com','Jane','Doe','2023-02-10'),(3,'mike.smith@example.com','Mike','Smith','2023-03-05'),(4,'sarah.jones@example.com','Sarah','Jones','2023-02-12');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `half_day`
--

DROP TABLE IF EXISTS `half_day`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `half_day` (
  `half_day_id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `which_half` enum('first','second') NOT NULL,
  `is_available` tinyint NOT NULL DEFAULT '0',
  `is_full` tinyint NOT NULL DEFAULT '0',
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  PRIMARY KEY (`half_day_id`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `half_day`
--

LOCK TABLES `half_day` WRITE;
/*!40000 ALTER TABLE `half_day` DISABLE KEYS */;
INSERT INTO `half_day` VALUES (1,'2023-04-19','first',1,0,'06:00:00','12:00:00'),(2,'2023-04-19','second',1,0,'12:30:00','17:00:00'),(3,'2023-04-20','first',1,0,'06:00:00','12:00:00'),(4,'2023-04-20','second',1,0,'12:30:00','17:00:00');
/*!40000 ALTER TABLE `half_day` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `located_in`
--

DROP TABLE IF EXISTS `located_in`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `located_in` (
  `located_in_id` int NOT NULL AUTO_INCREMENT,
  `zip_code_id` int NOT NULL,
  `appointment_id` int NOT NULL,
  PRIMARY KEY (`located_in_id`),
  KEY `FK_located_in_appointment_idx` (`appointment_id`) /*!80000 INVISIBLE */,
  KEY `FK_located_in_zip_code_idx` (`zip_code_id`),
  CONSTRAINT `FK_located_in_appointment` FOREIGN KEY (`appointment_id`) REFERENCES `appointment` (`appointment_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `FK_located_in_zip_code` FOREIGN KEY (`zip_code_id`) REFERENCES `zip_code` (`zip_code_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `located_in`
--

LOCK TABLES `located_in` WRITE;
/*!40000 ALTER TABLE `located_in` DISABLE KEYS */;
INSERT INTO `located_in` VALUES (1,1,1),(2,2,2),(3,3,3),(4,4,4);
/*!40000 ALTER TABLE `located_in` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `occurs_on`
--

DROP TABLE IF EXISTS `occurs_on`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `occurs_on` (
  `occurs_on_id` int NOT NULL AUTO_INCREMENT,
  `appointment_id` int NOT NULL,
  `half_day_id` int NOT NULL,
  PRIMARY KEY (`occurs_on_id`),
  KEY `FK_occurs_on_appointment_idx` (`appointment_id`),
  KEY `FK_occurs_on_half_day_idx` (`half_day_id`),
  CONSTRAINT `FK_occurs_on_appointment` FOREIGN KEY (`appointment_id`) REFERENCES `appointment` (`appointment_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `FK_occurs_on_half_day` FOREIGN KEY (`half_day_id`) REFERENCES `half_day` (`half_day_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `occurs_on`
--

LOCK TABLES `occurs_on` WRITE;
/*!40000 ALTER TABLE `occurs_on` DISABLE KEYS */;
INSERT INTO `occurs_on` VALUES (1,1,1),(2,2,2),(3,3,3),(4,4,4);
/*!40000 ALTER TABLE `occurs_on` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `placed_on`
--

DROP TABLE IF EXISTS `placed_on`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `placed_on` (
  `placed_on_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `crew_id` int NOT NULL,
  PRIMARY KEY (`placed_on_id`),
  KEY `FK_placed_on_user_idx` (`user_id`),
  KEY `FK_placed_on_crew_idx` (`crew_id`),
  CONSTRAINT `FK_placed_on_crew` FOREIGN KEY (`crew_id`) REFERENCES `crew` (`crew_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `FK_placed_on_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `placed_on`
--

LOCK TABLES `placed_on` WRITE;
/*!40000 ALTER TABLE `placed_on` DISABLE KEYS */;
INSERT INTO `placed_on` VALUES (1,1,1),(2,2,2),(3,3,1),(4,4,2),(5,5,1);
/*!40000 ALTER TABLE `placed_on` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `responsible_for`
--

DROP TABLE IF EXISTS `responsible_for`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `responsible_for` (
  `responsible_for_id` int NOT NULL AUTO_INCREMENT,
  `crew_id` int NOT NULL,
  `half_day_id` int NOT NULL,
  PRIMARY KEY (`responsible_for_id`),
  KEY `FK_responsible_for_crew_idx` (`crew_id`),
  KEY `FK_responsible_for_half_day_idx` (`half_day_id`),
  CONSTRAINT `FK_responsible_for_crew` FOREIGN KEY (`crew_id`) REFERENCES `crew` (`crew_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `FK_responsible_for_half_day` FOREIGN KEY (`half_day_id`) REFERENCES `half_day` (`half_day_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responsible_for`
--

LOCK TABLES `responsible_for` WRITE;
/*!40000 ALTER TABLE `responsible_for` DISABLE KEYS */;
INSERT INTO `responsible_for` VALUES (1,1,1),(2,1,2),(3,2,3),(4,2,4);
/*!40000 ALTER TABLE `responsible_for` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services_area`
--

DROP TABLE IF EXISTS `services_area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services_area` (
  `services_area_id` int NOT NULL AUTO_INCREMENT,
  `crew_id` int NOT NULL,
  `zip_code_id` int NOT NULL,
  PRIMARY KEY (`services_area_id`),
  KEY `FK_services_area_zip_code_idx` (`zip_code_id`) /*!80000 INVISIBLE */,
  KEY `FK_services_area_crew_idx` (`crew_id`),
  CONSTRAINT `FK_services_area_crew` FOREIGN KEY (`crew_id`) REFERENCES `crew` (`crew_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `FK_services_area_zip_code` FOREIGN KEY (`zip_code_id`) REFERENCES `zip_code` (`zip_code_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services_area`
--

LOCK TABLES `services_area` WRITE;
/*!40000 ALTER TABLE `services_area` DISABLE KEYS */;
INSERT INTO `services_area` VALUES (1,1,1),(2,1,2),(3,1,3),(4,2,2),(5,2,3),(6,2,4);
/*!40000 ALTER TABLE `services_area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `setting`
--

DROP TABLE IF EXISTS `setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `setting` (
  `setting_id` int NOT NULL AUTO_INCREMENT,
  `setting_name` varchar(100) DEFAULT NULL,
  `setting_value` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`setting_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `setting`
--

LOCK TABLES `setting` WRITE;
/*!40000 ALTER TABLE `setting` DISABLE KEYS */;
INSERT INTO `setting` VALUES (1,'percentDiscountForGreenTime','10'),(2,'brandCostMultipliers','{\"Wyze\": 1.2, \"Netro\": 1.0}');
/*!40000 ALTER TABLE `setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `fist_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `phone_number` varchar(45) NOT NULL,
  `currently_working` tinyint NOT NULL DEFAULT '0',
  `user_type` enum('boss','crew_member') NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Travis','Turner','tt@example.com','84fed66ed1f9f518c6be15c7fdb46bf7bf979741','8562175555',1,'boss'),(2,'Dennis','Trantow','bupton@example.org','ac638dc055f48d6e9cb59bcadefdb89e67611b8d','100.174.4773',1,'crew_member'),(3,'Jack','Bauch','mack08@example.com','e14facbf7a268781535ed22f4ffe87a31b63b6f6','1-135-460-6815',0,'crew_member'),(4,'Zora','McDermott','porter.o\'hara@example.org','f5b3b2b81d13ea9ebf0e3e628faedae22ceacd42','040-228-4907x99882',1,'crew_member'),(5,'Cora','Lebsack','noemy.wilkinson@example.org','c065a4ff940dc757be0e03a6dd510d341f696eef','(767)026-4776x7401',1,'crew_member');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zip_code`
--

DROP TABLE IF EXISTS `zip_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zip_code` (
  `zip_code_id` int NOT NULL AUTO_INCREMENT,
  `is_available` tinyint NOT NULL DEFAULT '1',
  `zip_code` char(5) NOT NULL,
  PRIMARY KEY (`zip_code_id`),
  UNIQUE KEY `zip_code_UNIQUE` (`zip_code`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zip_code`
--

LOCK TABLES `zip_code` WRITE;
/*!40000 ALTER TABLE `zip_code` DISABLE KEYS */;
INSERT INTO `zip_code` VALUES (1,1,'08028'),(2,1,'08080'),(3,1,'08021'),(4,1,'08093'),(5,1,'08031'),(6,1,'08002'),(7,1,'08140'),(8,1,'08032'),(9,1,'08141'),(10,1,'08115'),(11,0,'52688'),(12,0,'66335'),(13,0,'18688'),(14,0,'68220'),(15,0,'23411'),(16,0,'44104'),(17,0,'60435'),(18,0,'16126'),(19,0,'63309'),(20,0,'77580'),(21,0,'51352'),(22,0,'31236'),(23,0,'91244'),(24,0,'44308'),(25,0,'54737'),(26,0,'24102'),(27,0,'97100'),(28,0,'82838'),(29,0,'32567'),(30,0,'07760'),(31,0,'30481'),(32,0,'50553'),(33,0,'54418'),(34,0,'87541'),(35,0,'23536'),(36,0,'69469'),(37,0,'09190'),(38,0,'07693'),(39,0,'43020'),(40,0,'76904'),(41,0,'29356'),(42,0,'92785'),(43,0,'90919'),(44,0,'18742'),(45,0,'55256'),(46,0,'35676'),(47,0,'64572'),(48,0,'64437'),(49,0,'44005'),(50,0,'75626'),(51,0,'94693'),(52,0,'11371'),(53,0,'12723'),(54,0,'18657'),(55,0,'55574'),(56,0,'38485'),(57,0,'85854'),(58,0,'26149'),(59,0,'40632'),(60,0,'34600'),(61,0,'55594'),(62,0,'82386'),(63,0,'47244'),(64,0,'56899'),(65,0,'57036'),(66,0,'82357'),(67,0,'44369'),(68,0,'22099'),(69,0,'42707'),(70,0,'56668'),(71,0,'76497'),(72,0,'31945'),(73,0,'20894'),(74,0,'61302'),(75,0,'49074'),(76,0,'11870'),(77,0,'41017'),(78,0,'27403'),(79,0,'57405'),(80,0,'12629'),(81,0,'41134'),(82,0,'33747'),(83,0,'01838'),(84,0,'69768'),(85,0,'14474'),(86,0,'86345'),(87,0,'26430'),(88,0,'45620'),(89,0,'91065'),(90,0,'71195'),(91,0,'03988'),(92,0,'66528'),(93,0,'61617'),(94,0,'54349'),(95,0,'24904'),(96,0,'69155'),(97,0,'95294'),(98,0,'43003'),(99,0,'91273'),(100,0,'53058');
/*!40000 ALTER TABLE `zip_code` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-17 22:17:39
