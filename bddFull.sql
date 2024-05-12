-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 12 mai 2024 à 20:35
-- Version du serveur : 8.2.0
-- Version de PHP : 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `apiback`
--

-- --------------------------------------------------------

--
-- Structure de la table `activites`
--

DROP TABLE IF EXISTS `activites`;
CREATE TABLE IF NOT EXISTS `activites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_debut` timestamp NOT NULL,
  `date_fin` timestamp NOT NULL,
  `adresse` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nb_place` int NOT NULL,
  `superviser_par` int DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_superviseur` (`superviser_par`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `activites`
--

INSERT INTO `activites` (`id`, `nom`, `description`, `date_debut`, `date_fin`, `adresse`, `nb_place`, `superviser_par`, `created_at`, `updated_at`) VALUES
(6, 'Activitée 3', 'Ceci est l\'activitée numéro 3', '2024-05-12 09:23:57', '2024-05-12 09:23:57', 'Ici', 10, 4, '2024-05-12 09:23:57', '2024-05-12 09:23:57'),
(8, 'Activitée 3', 'Ceci est l\'activitée numéro 3', '2024-05-12 09:29:48', '2024-05-12 09:29:48', 'Ici', 10, 4, '2024-05-12 09:29:48', '2024-05-12 09:29:48');

-- --------------------------------------------------------

--
-- Structure de la table `camions`
--

DROP TABLE IF EXISTS `camions`;
CREATE TABLE IF NOT EXISTS `camions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `immatriculation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `modele` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `poids` int DEFAULT NULL,
  `hauteur` int DEFAULT NULL,
  `capacite_max` int DEFAULT NULL,
  `date_dernier_controle` date DEFAULT NULL,
  `id_entrepot` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_entrepot` (`id_entrepot`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `camions`
--

INSERT INTO `camions` (`id`, `immatriculation`, `modele`, `type`, `status`, `poids`, `hauteur`, `capacite_max`, `date_dernier_controle`, `id_entrepot`, `created_at`, `updated_at`) VALUES
(4, '1234ABCD', 'Camion modèle B', 'camionnette', 'en panne', 5000, 250, 10000, '2024-04-25', 1, '2024-04-26 10:57:31', '2024-04-30 05:53:45'),
(5, '1234ABCD', 'Camion modèle X', 'Transport de marchandises', 'disponible', 5000, 250, 10000, '2024-04-25', 1, '2024-04-28 10:49:26', '2024-04-28 20:54:09'),
(6, '46ERT34', 'Gros camion', 'Transport de marchandises', 'Disponible', 5000, 250, 10000, '2024-04-25', 2, '2024-04-28 10:50:37', '2024-04-28 10:50:37'),
(7, '123456', 'Vroum vroum', 'semi-remorque', 'en panne', 1234, 1234, 1234, '2024-04-23', 1, '2024-04-29 14:22:25', '2024-04-29 14:22:25'),
(8, 'FF123', 'Vrouuuuuuuuum', 'semi-remorque', 'disponible', 123, 123, 123, '2024-04-24', 1, '2024-04-29 14:24:24', '2024-04-29 14:24:24'),
(9, '123FFF', 'The VROUMMMM', 'semi-remorque', 'en panne', 123, 123, 123, '2024-04-16', 1, '2024-04-29 14:25:05', '2024-04-29 14:25:05'),
(10, 'f', 'f', 'tracteur', 'en panne', 33, 33, 33, '2024-04-24', 1, '2024-04-29 14:25:18', '2024-04-29 14:25:18');

-- --------------------------------------------------------

--
-- Structure de la table `commercants`
--

DROP TABLE IF EXISTS `commercants`;
CREATE TABLE IF NOT EXISTS `commercants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `adresse` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `commercants`
--

INSERT INTO `commercants` (`id`, `nom`, `adresse`, `type`, `created_at`, `updated_at`) VALUES
(1, 'Supe U', '216 Rue de Paris, 02100 Saint-Quentin', 'Type du commercant', '2024-04-26 13:10:25', '2024-04-30 06:47:47'),
(3, 'KFC', '75 Rue Pontoile, 02100 Saint-Quentin', 'Type du commercant', '2024-04-30 06:46:14', '2024-04-30 06:46:14'),
(4, 'Grand frais', '28 Rue Antoine Lécuyer, 02100 Saint-Quentin', 'Type du commercant', '2024-04-30 06:49:29', '2024-05-01 08:57:41');

-- --------------------------------------------------------

--
-- Structure de la table `demandes`
--

DROP TABLE IF EXISTS `demandes`;
CREATE TABLE IF NOT EXISTS `demandes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `demande` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `permis` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `etat` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'en attente',
  `adresse` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` datetime NOT NULL,
  `id_user` int DEFAULT NULL,
  `updated_at` timestamp NOT NULL,
  `created_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `demandes`
--

INSERT INTO `demandes` (`id`, `type`, `demande`, `permis`, `etat`, `adresse`, `date`, `id_user`, `updated_at`, `created_at`) VALUES
(3, 'aide_service_administratif', 'Bonjour', 'A', 'fait', 'ff', '2024-04-27 12:12:00', 1, '2024-05-12 15:33:03', '2024-05-02 21:01:35'),
(4, 'aide_service_administratif', 'Test', 'A,B', 'en cours', '5 rue du PA', '2024-05-07 12:12:00', 1, '2024-05-09 22:23:16', '2024-05-09 22:23:16'),
(5, 'demande_visite', 'Test 2', 'A,B,C', 'en cours', NULL, '2024-04-27 12:12:00', 1, '2024-05-11 14:57:06', '2024-05-09 22:23:05'),
(24, 'collecte', 'Depart : 3 Brasseurs Saint-Quentin   Etape 1 : 75 Rue Pontoile, 02100 Saint-Quentin   Etape 2 : 216 Rue de Paris, 02100 Saint-Quentin   Destination : 29 Rue de Saint-Quentin 02100 Fayet', '0', 'valide', NULL, '2024-05-17 12:12:00', 3, '2024-05-12 18:27:09', '2024-05-12 18:27:09'),
(23, 'collecte', 'Depart : 29 Rue de Saint-Quentin 02100 Fayet   Etape 1 : 28 Rue Antoine Lécuyer, 02100 Saint-Quentin   Etape 2 : 216 Rue de Paris, 02100 Saint-Quentin   Destination : 3 Brasseurs Saint-Quentin', '0', 'valide', NULL, '2024-05-10 12:12:00', 3, '2024-05-12 09:02:13', '2024-05-12 09:02:13'),
(22, 'autre', 'Bonjour autre', '0', 'valide', '12 rue de ...', '2024-05-17 20:20:00', 3, '2024-05-11 14:56:37', '2024-05-11 11:13:03');

-- --------------------------------------------------------

--
-- Structure de la table `entrepots`
--

DROP TABLE IF EXISTS `entrepots`;
CREATE TABLE IF NOT EXISTS `entrepots` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `adresse` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `taille` int NOT NULL,
  `nb_etageres` int NOT NULL,
  `nb_etageres_remplie` int NOT NULL,
  `nb_etageres_max` int NOT NULL,
  `place_restante` int NOT NULL,
  `updated_at` timestamp NOT NULL,
  `created_at` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `entrepots`
--

INSERT INTO `entrepots` (`id`, `nom`, `adresse`, `taille`, `nb_etageres`, `nb_etageres_remplie`, `nb_etageres_max`, `place_restante`, `updated_at`, `created_at`) VALUES
(1, 'Saint Quentin', '29 Rue de Saint-Quentin 02100 Fayet', 380, 2, 0, 100, 2467, '2024-05-10 15:01:01', '0000-00-00 00:00:00'),
(2, 'Laon', '3 Brasseurs Saint-Quentin', 250, 2, 5, 15, 1, '2024-05-10 15:02:13', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `etageres`
--

DROP TABLE IF EXISTS `etageres`;
CREATE TABLE IF NOT EXISTS `etageres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `capacite_actuelle` int NOT NULL DEFAULT '25',
  `id_entrepot` int NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_entrepot` (`id_entrepot`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `etageres`
--

INSERT INTO `etageres` (`id`, `numero`, `capacite_actuelle`, `id_entrepot`, `created_at`, `updated_at`) VALUES
(1, 'A101', 2, 1, '2024-04-26 11:55:23', '2024-05-10 15:01:01'),
(5, 'A102', 10, 1, '2024-04-26 12:44:58', '2024-05-10 14:55:30'),
(6, 'A120', 22, 2, '2024-05-01 20:13:17', '2024-05-10 11:52:24'),
(7, 'B100', 19, 2, '2024-05-01 20:14:39', '2024-05-10 15:02:13');

-- --------------------------------------------------------

--
-- Structure de la table `evenements`
--

DROP TABLE IF EXISTS `evenements`;
CREATE TABLE IF NOT EXISTS `evenements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_debut` datetime NOT NULL,
  `date_fin` datetime NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `etat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ouvert',
  `adresse` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ville` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nb_participants` int NOT NULL DEFAULT '0',
  `updated_at` timestamp NOT NULL,
  `created_at` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `evenements`
--

INSERT INTO `evenements` (`id`, `nom`, `description`, `date_debut`, `date_fin`, `type`, `etat`, `adresse`, `ville`, `nb_participants`, `updated_at`, `created_at`) VALUES
(1, 'Evenement 1', 'Ceci est l\'evenement numéro 1', '2024-05-07 10:00:00', '2024-05-07 18:00:00', '', '', '', '', 0, '2024-05-07 13:54:21', '2024-05-07 13:54:21'),
(2, 'Evenement 2', 'Ceci est l\'evenement numéro 2', '2024-05-07 10:08:00', '2024-05-15 18:12:00', '', '', '', '', 0, '2024-05-07 20:07:11', '2024-05-07 20:07:11'),
(4, 'Evenement 4', 'Ceci est l\'evenement numéro 4', '2024-05-10 10:00:00', '2024-05-10 18:00:00', 'Maraude', 'ouvert', 'zeub', 'zubb', 1, '2024-05-07 20:07:35', '2024-05-07 20:07:35'),
(5, 'Evenement 4', 'Ceci est l\'evenement numéro 4', '2024-02-05 10:00:00', '2024-02-15 18:00:00', 'Maraude', 'ouvert', 'zeub', 'zubb', 0, '2024-05-01 16:05:05', '2024-05-01 16:05:05'),
(6, 'Evenement 4', 'Ceci est l\'evenement numéro 4', '2024-02-05 10:00:00', '2024-02-15 18:00:00', 'Maraude', 'ouvert', 'zeub', 'zubb', 0, '2024-05-01 16:41:19', '2024-05-01 16:41:19'),
(7, 'Je test le post pour voir', 'Ceci est l\'evenement numéro 4', '2024-02-05 10:00:00', '2024-02-15 18:00:00', 'Maraude', 'ouvert', 'zeub', 'zubb', 0, '2024-05-01 19:10:31', '2024-05-01 19:10:31'),
(8, 'Maraude du 2024-05-09T12:12', 'Depart : 29 Rue de Saint-Quentin 02100 Fayet  Etape 1 : 28 Rue Antoine Lécuyer, 02100 Saint-Quentin  Destination : 29 Rue de Saint-Quentin 02100 Fayet', '2024-05-09 12:12:00', '2024-05-10 10:12:00', 'Maraude', 'ouvert', 'Depart : 29 Rue de Saint-Quentin 02100 Fayet', 'FF', 0, '2024-05-01 19:10:45', '2024-05-01 19:10:45'),
(9, 'Maraude du 2024-05-08T12:12', 'Depart : 29 Rue de Saint-Quentin 02100 Fayet  Etape 1 : 28 Rue Antoine Lécuyer, 02100 Saint-Quentin  Destination : 29 Rue de Saint-Quentin 02100 Fayet', '2024-05-08 12:12:00', '2024-05-09 10:12:00', 'Maraude', 'ouvert', 'Depart : 29 Rue de Saint-Quentin 02100 Fayet', 'Saint-Quentin', 0, '2024-05-01 19:11:40', '2024-05-01 19:11:40'),
(10, 'Maraude du 2024-05-06T12:12', 'Depart : 29 Rue de Saint-Quentin 02100 Fayet   Etape 1 : 5 rue jules ferry, Yerres   Destination : 3 Brasseurs Saint-Quentin', '2024-05-06 12:12:00', '2024-05-07 10:12:00', 'Maraude', 'ouvert', 'Depart : 29 Rue de Saint-Quentin 02100 Fayet', 'Saint-Quentin', 0, '2024-05-03 05:51:33', '2024-05-03 05:51:33');

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `formations`
--

DROP TABLE IF EXISTS `formations`;
CREATE TABLE IF NOT EXISTS `formations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_debut` datetime NOT NULL,
  `date_fin` datetime NOT NULL,
  `adresse` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nb_place` int NOT NULL,
  `supervise_par` int DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_supervise_par` (`supervise_par`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `formations`
--

INSERT INTO `formations` (`id`, `nom`, `description`, `date_debut`, `date_fin`, `adresse`, `nb_place`, `supervise_par`, `created_at`, `updated_at`) VALUES
(4, 'Formation 3', 'Ceci est la formation numéro 3', '2024-05-06 10:00:00', '2024-05-06 18:00:00', '', 10, 4, '2024-05-08 13:59:01', '2024-05-08 13:59:01'),
(5, 'Formation 3', 'Ceci est la formation numéro 3', '2024-02-15 10:00:00', '2024-02-15 18:00:00', 'Ou ca ?', 9, 4, '2024-04-26 10:00:29', '2024-04-26 10:00:29'),
(6, 'Formation de trests', 'Ceci est la formation numéro 3', '2024-02-15 10:00:00', '2024-02-15 18:00:00', 'Ou ca ?', 9, 4, '2024-05-02 09:03:43', '2024-05-02 09:03:43');

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `missions`
--

DROP TABLE IF EXISTS `missions`;
CREATE TABLE IF NOT EXISTS `missions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_demande` int DEFAULT NULL,
  `realiser_par` int DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_demande` (`id_demande`),
  KEY `realiser_par` (`realiser_par`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `missions`
--

INSERT INTO `missions` (`id`, `id_demande`, `realiser_par`, `created_at`, `updated_at`) VALUES
(2, 4, 3, '2024-05-07 13:13:04', '2024-05-07 13:13:04'),
(15, 3, 3, '2024-05-11 14:31:44', '2024-05-11 14:31:44');

-- --------------------------------------------------------

--
-- Structure de la table `participe_a_s`
--

DROP TABLE IF EXISTS `participe_a_s`;
CREATE TABLE IF NOT EXISTS `participe_a_s` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int DEFAULT NULL,
  `id_activite` int DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_activite` (`id_activite`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `participe_e_s`
--

DROP TABLE IF EXISTS `participe_e_s`;
CREATE TABLE IF NOT EXISTS `participe_e_s` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int DEFAULT NULL,
  `id_evenement` int DEFAULT NULL,
  `updated_at` timestamp NOT NULL,
  `created_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_evenement` (`id_evenement`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `participe_e_s`
--

INSERT INTO `participe_e_s` (`id`, `id_user`, `id_evenement`, `updated_at`, `created_at`) VALUES
(7, 3, 1, '2024-05-12 09:42:48', '2024-05-12 09:42:48');

-- --------------------------------------------------------

--
-- Structure de la table `participe_f_s`
--

DROP TABLE IF EXISTS `participe_f_s`;
CREATE TABLE IF NOT EXISTS `participe_f_s` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int DEFAULT NULL,
  `id_formation` int DEFAULT NULL,
  `updated_at` timestamp NOT NULL,
  `created_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`id_user`),
  KEY `formation_id` (`id_formation`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `participe_f_s`
--

INSERT INTO `participe_f_s` (`id`, `id_user`, `id_formation`, `updated_at`, `created_at`) VALUES
(14, 3, 6, '2024-05-12 09:35:32', '2024-05-12 09:35:32');

-- --------------------------------------------------------

--
-- Structure de la table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=264 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 2, 'Personal Access Token', 'd0a86f614065fa4ad0661cbe8341bd48471d8dc03ae977ade0c086aebbfb3e92', '[\"*\"]', NULL, '2024-02-12 18:54:41', '2024-02-12 18:54:41'),
(2, 'App\\Models\\User', 2, 'Personal Access Token', '0b42e1f688341470a4d3bfca18c09a93dbdeafcfbb199827150d746c6751cf69', '[\"*\"]', '2024-02-12 18:55:44', '2024-02-12 18:55:31', '2024-02-12 18:55:44'),
(3, 'App\\Models\\User', 1, 'Personal Access Token', '0a621a014e11c45222abd3d277322a1bd26eb527f365e57662481840f4dac78a', '[\"*\"]', '2024-02-12 19:40:06', '2024-02-12 18:56:23', '2024-02-12 19:40:06'),
(4, 'App\\Models\\User', 1, 'Personal Access Token', '6b33f0788ce5af205a495de77162841782610f7d4786a787e8238f6810ff089a', '[\"*\"]', '2024-02-12 19:46:55', '2024-02-12 19:40:30', '2024-02-12 19:46:55'),
(20, 'App\\Models\\User', 13, 'Personal Access Token', '6948c022634ba50c3685a9e7e838c9cd001eb070289167bfae3f30ec118198a4', '[\"*\"]', NULL, '2024-04-03 11:27:13', '2024-04-03 11:27:13'),
(13, 'App\\Models\\User', 4, 'Personal Access Token', '4ea69d5be03e9e2c7963855d149e0ae32861f14ab727dfe6f94b7e6d6813aaf0', '[\"*\"]', '2024-02-16 15:06:57', '2024-02-12 23:01:47', '2024-02-16 15:06:57'),
(22, 'App\\Models\\User', 13, 'Personal Access Token', '71a37748ed26cb1fd8cbd140099ee5905a1fba42b38b2351268f627e0d7df06e', '[\"*\"]', NULL, '2024-04-03 13:07:44', '2024-04-03 13:07:44'),
(23, 'App\\Models\\User', 13, 'admin-access-token', '48f76fdaf009b21e0021168dffef7bfc99b20401eda6884514dca1d825445a77', '[\"*\"]', NULL, '2024-04-03 13:10:46', '2024-04-03 13:10:46'),
(24, 'App\\Models\\User', 13, 'admin-access-token', 'efb0b33f878bfc9405c6f7bf2c54bb3f3fc2ceb6a3c218d1b1b4723b235c94f4', '[\"*\"]', NULL, '2024-04-03 13:12:00', '2024-04-03 13:12:00'),
(25, 'App\\Models\\User', 13, 'admin-access-token', 'e46bc7f684910d338a3f42f3ef414dc7622eaf22bc98906168e46940fa500d7d', '[\"*\"]', NULL, '2024-04-03 13:12:12', '2024-04-03 13:12:12'),
(26, 'App\\Models\\User', 13, 'admin-access-token', 'be8db1a664ab9ddceee0040c1e28d775b54ca8e761b20dae2fb65fd625b63511', '[\"*\"]', NULL, '2024-04-04 07:13:59', '2024-04-04 07:13:59'),
(27, 'App\\Models\\User', 13, 'admin-access-token', '7a71a80a2d70cea92868d8ab79e2229880132e452d17cd87437e51136e293387', '[\"*\"]', NULL, '2024-04-04 07:14:20', '2024-04-04 07:14:20'),
(50, 'App\\Models\\User', 13, 'admin-access-token', '53e4823d85e70e11b498509ff0e98b55338c7175d64d65c9a9430feefebbca28', '[\"*\"]', '2024-05-12 07:43:25', '2024-04-20 12:49:53', '2024-05-12 07:43:25'),
(51, 'App\\Models\\User', 13, 'admin-access-token', '205db6ff7d4d93db831c12cdc4b4f608408b02619754e551b66336843ccd61e5', '[\"*\"]', '2024-04-20 13:00:59', '2024-04-20 12:59:37', '2024-04-20 13:00:59'),
(52, 'App\\Models\\User', 18, 'Personal Access Token', '91b4aad094d110f50c58dd2d26493e5eafaf962c8be2c17e4e031baf7ff17edd', '[\"*\"]', NULL, '2024-04-23 13:38:43', '2024-04-23 13:38:43'),
(54, 'App\\Models\\User', 13, 'admin-access-token', 'f1e23866accbf2f8d1046e9739e99e0b489d25f08a3ecf4158f53aae9100bc93', '[\"*\"]', '2024-05-02 18:58:02', '2024-04-24 06:42:17', '2024-05-02 18:58:02'),
(55, 'App\\Models\\User', 14, 'Personal Access Token', 'ecac86264543c1b204925702c7dd7a2164f9255eae23a7c53c322b30ebb0f4af', '[\"*\"]', '2024-04-26 10:08:01', '2024-04-26 10:07:52', '2024-04-26 10:08:01'),
(263, 'App\\Models\\User', 3, 'admin-access-token', 'a92a3507ab7c1cf2712daa857afcd794b5fd378cc26af47fced72dea0e71d43d', '[\"*\"]', '2024-05-12 18:27:14', '2024-05-12 17:55:58', '2024-05-12 18:27:14'),
(262, 'App\\Models\\User', 4, 'Personal Access Token', '37aefa1faca04f1f734da58c237b219b6e48be5d3ecc35d5f0454e982eee8979', '[\"*\"]', NULL, '2024-05-12 17:44:30', '2024-05-12 17:44:30'),
(261, 'App\\Models\\User', 4, 'Personal Access Token', 'b3bd41333e6e025c7f23a953b4d10ae2e92d931d4b54b1ec263365354acece9e', '[\"*\"]', '2024-05-12 15:36:01', '2024-05-12 15:05:23', '2024-05-12 15:36:01'),
(260, 'App\\Models\\User', 3, 'Personal Access Token', '0fffeca54b68e2c722e40caaf65ae1275cfcab9eda99cf4ed3ca8ab4d1084208', '[\"*\"]', '2024-05-12 11:06:37', '2024-05-12 11:04:20', '2024-05-12 11:06:37'),
(259, 'App\\Models\\User', 3, 'admin-access-token', '735e75a5cf938c262c028f767ec9da6d4aae984c77d52190d9d1400f7107361d', '[\"*\"]', '2024-05-12 11:04:10', '2024-05-12 10:40:37', '2024-05-12 11:04:10'),
(258, 'App\\Models\\User', 3, 'admin-access-token', '217811a8cb2b33881a83112d34e92ae18dfa570392a79450e0fe79f38f7cee45', '[\"*\"]', '2024-05-12 10:40:17', '2024-05-12 09:12:49', '2024-05-12 10:40:17');

-- --------------------------------------------------------

--
-- Structure de la table `planning`
--

DROP TABLE IF EXISTS `planning`;
CREATE TABLE IF NOT EXISTS `planning` (
  `id` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_datetime` datetime DEFAULT NULL,
  `end_datetime` datetime DEFAULT NULL,
  `plannable_id` int DEFAULT NULL,
  `plannable_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

DROP TABLE IF EXISTS `produits`;
CREATE TABLE IF NOT EXISTS `produits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_arrivee` date NOT NULL,
  `date_limite` date DEFAULT NULL,
  `id_etagere` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_etagere` (`id_etagere`)
) ENGINE=MyISAM AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `produits`
--

INSERT INTO `produits` (`id`, `nom`, `type`, `date_arrivee`, `date_limite`, `id_etagere`, `created_at`, `updated_at`) VALUES
(5, 'Produit A', 'Type A', '2024-04-25', '2024-05-25', 1, '2024-04-26 12:58:18', '2024-04-26 12:58:18'),
(7, 'Produit A', 'Type A', '2024-04-25', '2024-05-25', 1, '2024-04-28 12:40:24', '2024-04-28 12:40:24'),
(8, 'Produit A', 'Type A', '2024-04-25', '2024-05-25', 1, '2024-04-28 12:40:25', '2024-04-28 12:40:25'),
(9, 'Produit A', 'Type A', '2024-04-25', '2024-05-25', 1, '2024-04-28 17:53:51', '2024-04-28 17:53:51'),
(15, 'Dragibus', 'Type A', '2024-04-25', '2024-05-25', 1, '2024-05-01 20:02:12', '2024-05-01 20:02:12'),
(11, 'Produit A', 'Type A', '2024-04-25', '2024-05-25', 1, '2024-04-28 17:53:51', '2024-04-28 17:53:51'),
(12, 'Produit A', 'Type A', '2024-04-25', '2024-05-25', 1, '2024-04-28 17:53:52', '2024-04-28 17:53:52'),
(16, 'Dragibus', 'Harribots', '2024-04-25', '2024-05-25', 1, '2024-05-01 20:02:31', '2024-05-01 20:02:31'),
(17, 'Dragibus', 'Harribots', '2024-05-01', '2024-05-25', 1, '2024-05-01 20:02:55', '2024-05-01 20:02:55'),
(18, 'Dragibus', 'Harribots', '2024-05-01', '2024-05-08', 1, '2024-05-01 20:03:13', '2024-05-01 20:03:13'),
(19, 'ff', 'ff', '2024-05-02', '2024-05-09', 1, '2024-05-01 20:05:25', '2024-05-01 20:05:25'),
(20, 'C', 'C', '2024-05-16', '2024-05-16', 6, '2024-05-01 20:13:34', '2024-05-01 20:13:34'),
(21, 'fff', 'ffff', '2024-05-10', '2024-06-07', 1, '2024-05-03 11:24:06', '2024-05-03 11:24:06'),
(22, 'ff', 'ffff', '2024-05-03', '2024-05-31', 1, '2024-05-03 11:24:33', '2024-05-03 11:24:33'),
(23, 'PA', 'PA2', '2024-05-03', '2024-05-07', 5, '2024-05-03 14:40:28', '2024-05-03 14:40:28'),
(24, 'fqsd', 'qsdqsdqsdq', '2024-05-10', '2024-05-14', 1, '2024-05-10 11:16:01', '2024-05-10 11:16:01'),
(25, 'PA', 'PA2', '2024-05-10', '2024-05-31', 5, '2024-05-10 11:17:44', '2024-05-10 11:17:44'),
(26, 'PA', 'PA2', '2024-05-10', '2024-05-13', 5, '2024-05-10 11:19:06', '2024-05-10 11:19:06'),
(27, 'ff', 'fffff', '2024-05-15', '2024-05-29', 5, '2024-05-10 11:19:35', '2024-05-10 11:19:35'),
(28, 'C', 'C', '2024-05-10', '2024-05-17', 6, '2024-05-10 11:21:21', '2024-05-10 11:21:21'),
(29, 'Kt', 'kt', '2024-05-10', '2024-05-14', 7, '2024-05-10 11:22:57', '2024-05-10 11:22:57'),
(30, 'ff', 'ff', '2024-05-10', '2024-05-17', 7, '2024-05-10 11:23:18', '2024-05-10 11:23:18'),
(31, '232', '1234', '2024-05-10', '2024-05-14', 5, '2024-05-10 11:27:39', '2024-05-10 11:27:39'),
(32, 'raaaaaaaaaaa', 'raaaaaaarararar', '2024-05-10', '2024-05-16', 5, '2024-05-10 11:31:29', '2024-05-10 11:31:29'),
(33, 'dqsdq', 'ddqsdqsggze', '2024-05-10', '2024-05-17', 5, '2024-05-10 11:32:38', '2024-05-10 11:32:38'),
(34, 'ff', 'ff', '2024-05-17', '2024-05-24', 1, '2024-05-10 11:33:55', '2024-05-10 11:33:55'),
(35, 'hghghseaza', 'azqsxxwq', '2024-05-10', '2024-05-14', 1, '2024-05-10 11:45:11', '2024-05-10 11:45:11'),
(36, 'Produit  B', 'Produit  B', '2024-05-17', '2024-05-24', 1, '2024-05-10 11:49:05', '2024-05-10 11:49:05'),
(37, 'numero', 'numero', '2024-05-10', '2024-05-17', 6, '2024-05-10 11:52:24', '2024-05-10 11:52:24'),
(38, '<script src=\"QRCode.js\"></script>', '<script src=\"QRCode.js\"></script>', '2024-05-09', '2024-05-17', 1, '2024-05-10 11:56:06', '2024-05-10 11:56:06'),
(39, 'Produit A', 'Produit A', '2024-05-16', '2024-05-24', 1, '2024-05-10 12:01:03', '2024-05-10 12:01:03'),
(40, 'qsdq', 'qsdqsdqs', '2024-05-17', '2024-05-24', 5, '2024-05-10 12:02:23', '2024-05-10 12:02:23'),
(41, 'sdfsdf', 'sdfsdfsdfs', '2024-05-10', '2024-05-13', 1, '2024-05-10 12:13:32', '2024-05-10 12:13:32'),
(42, 'gzeza', 'dzerdfss', '2024-05-10', '2024-05-24', 1, '2024-05-10 12:21:53', '2024-05-10 12:21:53'),
(43, 'Produit A', 'Produit 1', '2024-05-10', '2024-05-17', 1, '2024-05-10 14:06:48', '2024-05-10 14:06:48'),
(44, 'Produit A', 'Produit A', '2024-05-10', '2024-05-17', 5, '2024-05-10 14:08:55', '2024-05-10 14:08:55'),
(45, 'Produit A', 'Produit A', '2024-05-10', '2024-05-17', 7, '2024-05-10 14:10:28', '2024-05-10 14:10:28'),
(46, 'ProduitA', 'ProuduitA', '2024-05-10', '2024-05-15', 7, '2024-05-10 14:32:03', '2024-05-10 14:32:03'),
(47, 'Prosduit B', 'Peofzfds>B', '2024-05-10', '2024-05-24', 5, '2024-05-10 14:33:11', '2024-05-10 14:33:11'),
(48, 'dsfsd', 'sdfsdfsdfs', '2024-05-10', '2024-05-17', 5, '2024-05-10 14:42:35', '2024-05-10 14:42:35'),
(49, 'gggggggggggg', 'gggggggggggg', '2024-05-10', '2024-05-16', 5, '2024-05-10 14:46:54', '2024-05-10 14:46:54'),
(50, 'n', 'n', '2024-05-10', '2024-05-17', 5, '2024-05-10 14:47:59', '2024-05-10 14:47:59'),
(51, 'PA', 'PA2', '2024-05-10', '2024-05-16', 5, '2024-05-10 14:48:55', '2024-05-10 14:48:55'),
(52, 'cxcxc', 'wxcqQ', '2024-05-17', '2024-05-24', 5, '2024-05-10 14:55:30', '2024-05-10 14:55:30'),
(53, 'C\'est fini', 'QRCode', '2024-05-10', '2024-05-17', 7, '2024-05-10 15:00:10', '2024-05-10 15:00:10'),
(54, 'qsd', 'qsd', '2024-05-10', '2024-05-17', 1, '2024-05-10 15:01:01', '2024-05-10 15:01:01'),
(55, 'C\'est vraiment fini', 'QRCode de mort', '2024-05-10', '2024-05-17', 7, '2024-05-10 15:02:13', '2024-05-10 15:02:13');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code_postal` int NOT NULL,
  `ville` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `adresse` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `num_telephone` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `code_postal`, `ville`, `adresse`, `num_telephone`, `email`, `password`, `role`, `remember_token`, `email_verified_at`, `created_at`, `updated_at`) VALUES
(1, 'John Doe', 0, '', '', '0', 'john.doe@example.com', 'test1234', 'beneficiaire', NULL, NULL, '2024-02-12 18:35:06', '2024-02-12 18:35:06'),
(2, 'John Doee', 0, '', '', '0', 'john.doee@example.com', '$2y$10$kvWAwMvJFR6h.yS1acV7T.TtSuQvxbuPB4jjG9DR0vMxr8nLigeou', 'beneficiaire', NULL, NULL, '2024-02-12 18:39:10', '2024-02-12 18:39:10'),
(3, 'Titouan Ch', 91331, 'Paris', '5 rue du pa', '0767141782', 'cocodoudo@gmail.com', '$2y$10$CVMCDeTNEZsdf23ElQAsyuk86yyo3JACrHYUctwU370kysiMO1MRu', 'admin', NULL, NULL, '2024-02-12 19:45:43', '2024-05-12 11:06:36'),
(4, 'Enz', 0, '', '', '0', 'cocodoudo1@gmail.com', '$2y$10$q7jBJMkSolJHk0cms/mmieTbVF5Vb3sAUhQU1Aab4sRqX1kLW9oJa', 'benevole', NULL, NULL, '2024-02-12 20:35:57', '2024-02-12 21:33:35'),
(7, 'Enza', 0, '', '', '0', 'cocodoudo69@gmail.com', 'Enzo1110&', 'benevole', NULL, NULL, '2024-02-16 15:33:31', '2024-02-16 15:33:31'),
(13, 'Enza', 0, '', '', '0', 'epartelpro@gmail.com', '$2y$10$HzCIfVy1vznOGdSGlXF8o.llNIj1ZFAZzTk3LT2/sOonh9b0FFumS', 'admin', NULL, NULL, '2024-02-16 16:08:09', '2024-02-16 16:08:09'),
(14, 'Enza', 28000, 'Chatres', 'Fati', '0123456789', 'bonjour@gmail.com', '$2y$10$yavbQUkfjnK24NLz9HN2tOA2qdU4zueoGDWpLcaHEe4irI5vZOVfa', 'benevole', NULL, NULL, '2024-04-23 13:19:21', '2024-04-23 13:19:21'),
(17, 'Edouard Sombier', 75000, 'Paris', 'On est la', '0123456789', 'sombier1@gmail.com', '$2y$10$vbWcRTT/G92yBsgyLwfIwOaXWRcJkBakyRz.XzZqxUcYdTPWkH95y', 'beneficiaire', NULL, NULL, '2024-04-23 13:24:47', '2024-04-23 13:24:47'),
(16, 'Edouard Sombier', 75000, 'Paris', 'On est la', '0123456789', 'sombier@gmail.com', '$2y$10$dSwYRoNkE2Ya3GtLchswwO6fFH4NHpDSkGyvYGjB0ULT3LIR3Y4R2', 'beneficiaire', NULL, NULL, '2024-04-23 13:23:02', '2024-04-23 13:23:02'),
(18, 'Fred Sananes', 75000, 'Paris', 'Pas la', '0123456789', 'fsananes@gmail.com', '$2y$10$FKo0T6IO7MJQ4V40MgHjBO6W.I4xowDx5REq.XoqLg6G0quGWlA3S', 'beneficiaire', NULL, NULL, '2024-04-23 13:34:01', '2024-04-23 13:34:01');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
