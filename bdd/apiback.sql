CREATE DATABASE IF NOT EXISTS `apiback`;

USE `apiback`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

DROP TABLE IF EXISTS `activites`;
CREATE TABLE IF NOT EXISTS `activites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_debut` timestamp NOT NULL,
  `date_fin` timestamp NOT NULL,
  `adresse` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nb_place` int NOT NULL,
  `superviser_par` int DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_superviseur` (`superviser_par`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO `activites` (`id`, `nom`, `description`, `date_debut`, `date_fin`, `adresse`, `nb_place`, `superviser_par`, `created_at`, `updated_at`) VALUES
(2, 'Activitée 2', 'Ceci est l activitée numéro 2', '2024-02-15 09:00:00', '2024-02-15 17:00:00', '', 9, 4, '2024-02-23 12:58:42', '2024-02-23 13:40:50'),
(3, 'Activitée 3', 'Ceci est l activitée numéro 3', '2024-02-15 09:00:00', '2024-02-15 17:00:00', 'pas la', 10, 7, '2024-02-23 13:02:28', '2024-04-26 08:13:59');



DROP TABLE IF EXISTS `camions`;
CREATE TABLE IF NOT EXISTS `camions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `immatriculation` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `modele` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `poids` int DEFAULT NULL,
  `hauteur` int DEFAULT NULL,
  `capacite_max` int DEFAULT NULL,
  `date_dernier_controle` date DEFAULT NULL,
  `id_entrepot` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_entrepot` (`id_entrepot`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `camions`
--

INSERT INTO `camions` (`id`, `immatriculation`, `modele`, `type`, `status`, `poids`, `hauteur`, `capacite_max`, `date_dernier_controle`, `id_entrepot`, `created_at`, `updated_at`) VALUES
(4, '1234ABCD', 'Camion modèle B', 'Transport de marchandises', 'Disponible', 5000, 250, 10000, '2024-04-25', 1, '2024-04-26 10:57:31', '2024-04-26 10:58:12');

-- --------------------------------------------------------

--
-- Structure de la table `commercants`
--

DROP TABLE IF EXISTS `commercants`;
CREATE TABLE IF NOT EXISTS `commercants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `adresse` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `commercants`
--

INSERT INTO `commercants` (`id`, `nom`, `adresse`, `type`, `created_at`, `updated_at`) VALUES
(1, 'Nom du commercant 1', 'Adresse du commercant', 'Type du commercant', '2024-04-26 13:10:25', '2024-04-26 13:12:39');

-- --------------------------------------------------------

--
-- Structure de la table `demandes`
--

DROP TABLE IF EXISTS `demandes`;
CREATE TABLE IF NOT EXISTS `demandes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `demande` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `permis` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `etat` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'En attente',
  `date` date NOT NULL,
  `id_user` int DEFAULT NULL,
  `updated_at` timestamp NOT NULL,
  `created_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `demandes`
--

INSERT INTO `demandes` (`id`, `type`, `demande`, `permis`, `etat`, `date`, `id_user`, `updated_at`, `created_at`) VALUES
(1, 'typetest', 'Bonjour', NULL, '', '0000-00-00', 3, '2024-02-22 09:08:55', '2024-02-22 09:08:55'),
(3, 'demande_benevole', 'Bonjour', 'A', '', '0000-00-00', NULL, '2024-04-11 10:28:04', '2024-04-11 10:28:04'),
(4, 'demande_benevole', 'Test', 'A,B', '', '0000-00-00', NULL, '2024-04-11 10:42:43', '2024-04-11 10:42:43'),
(5, 'demande_benevole', 'Test 2', 'A,B,C', '', '0000-00-00', NULL, '2024-04-11 10:45:28', '2024-04-11 10:45:28'),
(8, 'demande_benevole', 'Bonjour Monsier', 'A', 'En attente', '0000-00-00', NULL, '2024-04-26 10:10:33', '2024-04-26 10:10:33'),
(9, 'demande_benevole', 'Bonjour Monsier', 'A', 'En attente', '0000-00-00', NULL, '2024-04-26 10:10:49', '2024-04-26 10:10:49'),
(10, 'aide_service_administratif', 'Bonjour', 'A', 'en attente', '2024-04-27', NULL, '2024-04-26 14:26:13', '2024-04-26 10:13:29');

-- --------------------------------------------------------

--
-- Structure de la table `entrepots`
--

DROP TABLE IF EXISTS `entrepots`;
CREATE TABLE IF NOT EXISTS `entrepots` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `adresse` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
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
(1, 'Saint Quentin', '', 380, 2, 0, 100, 2499, '2024-04-26 12:59:27', '0000-00-00 00:00:00'),
(2, 'Laon', '123 Rue de l Entrepôt', 250, 0, 0, 75, 1875, '2024-04-26 11:09:26', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `etageres`
--

DROP TABLE IF EXISTS `etageres`;
CREATE TABLE IF NOT EXISTS `etageres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `capacite_actuelle` int NOT NULL DEFAULT '25',
  `id_entrepot` int NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_entrepot` (`id_entrepot`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `etageres`
--

INSERT INTO `etageres` (`id`, `numero`, `capacite_actuelle`, `id_entrepot`, `created_at`, `updated_at`) VALUES
(1, 'A101', 24, 1, '2024-04-26 11:55:23', '2024-04-26 12:59:27'),
(5, 'A102', 25, 1, '2024-04-26 12:44:58', '2024-04-26 12:44:58');

-- --------------------------------------------------------

--
-- Structure de la table `evenements`
--

DROP TABLE IF EXISTS `evenements`;
CREATE TABLE IF NOT EXISTS `evenements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_debut` datetime NOT NULL,
  `date_fin` datetime NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `etat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ouvert',
  `adresse` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ville` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nb_participants` int NOT NULL DEFAULT '0',
  `updated_at` timestamp NOT NULL,
  `created_at` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `evenements`
--

INSERT INTO `evenements` (`id`, `nom`, `description`, `date_debut`, `date_fin`, `type`, `etat`, `adresse`, `ville`, `nb_participants`, `updated_at`, `created_at`) VALUES
(1, 'Evenement 1', 'Ceci est l evenement numéro 1', '2024-02-15 10:00:00', '2024-02-15 18:00:00', '', '', '', '', 0, '2024-02-13 11:40:28', '2024-02-13 11:40:28'),
(2, 'Evenement 2', 'Ceci est l evenement numéro 2', '2024-03-15 10:08:00', '2024-03-15 18:12:00', '', '', '', '', 0, '2024-02-13 11:44:34', '2024-02-13 11:42:02'),
(4, 'Evenement 4', 'Ceci est l evenement numéro 4', '2024-02-05 10:00:00', '2024-02-15 18:00:00', 'Maraude', 'ouvert', 'zeub', 'zubb', 1, '2024-04-26 10:08:01', '2024-02-20 11:28:42');

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_debut` datetime NOT NULL,
  `date_fin` datetime NOT NULL,
  `adresse` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nb_place` int NOT NULL,
  `supervise_par` int DEFAULT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_supervise_par` (`supervise_par`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `formations`
--

INSERT INTO `formations` (`id`, `nom`, `description`, `date_debut`, `date_fin`, `adresse`, `nb_place`, `supervise_par`, `created_at`, `updated_at`) VALUES
(1, 'Formation 1', 'Ceci est la formation numéro 1', '2024-02-15 10:00:00', '2024-02-15 18:00:00', '', 5, NULL, '2024-02-13 12:16:08', '2024-02-13 12:16:08'),
(2, 'Formation 2', 'Ceci est la formation numéro 2', '2024-02-15 10:00:00', '2024-02-15 18:00:00', '', 8, NULL, '2024-02-13 12:17:24', '2024-02-16 14:43:21'),
(4, 'Formation 3', 'Ceci est la formation numéro 3', '2024-02-15 10:00:00', '2024-02-15 18:00:00', '', 10, 4, '2024-02-16 15:01:25', '2024-02-16 15:01:25'),
(5, 'Formation 3', 'Ceci est la formation numéro 3', '2024-02-15 10:00:00', '2024-02-15 18:00:00', 'Ou ca ?', 10, 4, '2024-04-26 10:00:29', '2024-04-26 10:00:29');

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
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
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `missions`
--

INSERT INTO `missions` (`id`, `id_demande`, `realiser_par`, `created_at`, `updated_at`) VALUES
(1, 1, 3, '2024-02-28 13:51:38', '2024-02-28 13:51:38');

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
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `participe_a_s`
--

INSERT INTO `participe_a_s` (`id`, `id_user`, `id_activite`, `created_at`, `updated_at`) VALUES
(1, 3, 3, '2024-02-23 13:37:41', '2024-02-23 13:37:41'),
(3, 3, 2, '2024-04-29 06:57:52', '2024-04-29 06:57:52');

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
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `participe_e_s`
--

INSERT INTO `participe_e_s` (`id`, `id_user`, `id_evenement`, `updated_at`, `created_at`) VALUES
(1, 1, 1, '2024-02-21 12:22:40', '2024-02-21 12:22:40'),
(5, 3, 1, '2024-02-22 09:19:10', '2024-02-22 09:19:10'),
(6, 14, 4, '2024-04-26 10:08:01', '2024-04-26 10:08:01');

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
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `participe_f_s`
--

INSERT INTO `participe_f_s` (`id`, `id_user`, `id_formation`, `updated_at`, `created_at`) VALUES
(8, 3, 2, '2024-02-20 11:08:04', '2024-02-20 11:08:04'),
(2, 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 2, 1, '2024-02-16 14:36:51', '2024-02-16 14:36:51'),
(9, 13, 2, '2024-04-23 11:17:09', '2024-04-23 11:17:09');

-- --------------------------------------------------------

--
-- Structure de la table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 2, 'Personal Access Token', 'd0a86f614065fa4ad0661cbe8341bd48471d8dc03ae977ade0c086aebbfb3e92', '[\"*\"]', NULL, '2024-02-12 18:54:41', '2024-02-12 18:54:41'),
(2, 'App\\Models\\User', 2, 'Personal Access Token', '0b42e1f688341470a4d3bfca18c09a93dbdeafcfbb199827150d746c6751cf69', '[\"*\"]', '2024-02-12 18:55:44', '2024-02-12 18:55:31', '2024-02-12 18:55:44'),
(3, 'App\\Models\\User', 1, 'Personal Access Token', '0a621a014e11c45222abd3d277322a1bd26eb527f365e57662481840f4dac78a', '[\"*\"]', '2024-02-12 19:40:06', '2024-02-12 18:56:23', '2024-02-12 19:40:06'),
(4, 'App\\Models\\User', 1, 'Personal Access Token', '6b33f0788ce5af205a495de77162841782610f7d4786a787e8238f6810ff089a', '[\"*\"]', '2024-02-12 19:46:55', '2024-02-12 19:40:30', '2024-02-12 19:46:55'),
(21, 'App\\Models\\User', 3, 'admin-access-token', 'adfc71387c7c84d8c9d55ed8677416b43fff7557fc421117476f5ba24b2d2a8a', '[\"*\"]', NULL, '2024-04-03 11:48:11', '2024-04-03 11:48:11'),
(20, 'App\\Models\\User', 13, 'Personal Access Token', '6948c022634ba50c3685a9e7e838c9cd001eb070289167bfae3f30ec118198a4', '[\"*\"]', NULL, '2024-04-03 11:27:13', '2024-04-03 11:27:13'),
(19, 'App\\Models\\User', 3, 'admin-access-token', '12001c88ff81c2b17aab14a4b88cac02308f37f4fa62b83f7f8644fb3d4cba1e', '[\"*\"]', NULL, '2024-04-02 12:50:12', '2024-04-02 12:50:12'),
(18, 'App\\Models\\User', 3, 'admin-access-token', '48e5134efa65bb18caaa8d7504b9676bffbcef954e6879449f9fa39dccdaeb4f', '[\"*\"]', NULL, '2024-03-27 19:31:53', '2024-03-27 19:31:53'),
(13, 'App\\Models\\User', 4, 'Personal Access Token', '4ea69d5be03e9e2c7963855d149e0ae32861f14ab727dfe6f94b7e6d6813aaf0', '[\"*\"]', '2024-02-16 15:06:57', '2024-02-12 23:01:47', '2024-02-16 15:06:57'),
(17, 'App\\Models\\User', 3, 'admin-access-token', 'aa9440711fa385e3821d5f08fd65f13226701b61649aef436af31ad4d5c15a10', '[\"*\"]', NULL, '2024-03-27 19:02:57', '2024-03-27 19:02:57'),
(16, 'App\\Models\\User', 3, 'admin-access-token', '1dc553db3ad64b401afa35038cf79b671f8ac06265b77a6608031d42011a00cc', '[\"*\"]', NULL, '2024-03-27 19:02:45', '2024-03-27 19:02:45'),
(22, 'App\\Models\\User', 13, 'Personal Access Token', '71a37748ed26cb1fd8cbd140099ee5905a1fba42b38b2351268f627e0d7df06e', '[\"*\"]', NULL, '2024-04-03 13:07:44', '2024-04-03 13:07:44'),
(23, 'App\\Models\\User', 13, 'admin-access-token', '48f76fdaf009b21e0021168dffef7bfc99b20401eda6884514dca1d825445a77', '[\"*\"]', NULL, '2024-04-03 13:10:46', '2024-04-03 13:10:46'),
(24, 'App\\Models\\User', 13, 'admin-access-token', 'efb0b33f878bfc9405c6f7bf2c54bb3f3fc2ceb6a3c218d1b1b4723b235c94f4', '[\"*\"]', NULL, '2024-04-03 13:12:00', '2024-04-03 13:12:00'),
(25, 'App\\Models\\User', 13, 'admin-access-token', 'e46bc7f684910d338a3f42f3ef414dc7622eaf22bc98906168e46940fa500d7d', '[\"*\"]', NULL, '2024-04-03 13:12:12', '2024-04-03 13:12:12'),
(26, 'App\\Models\\User', 13, 'admin-access-token', 'be8db1a664ab9ddceee0040c1e28d775b54ca8e761b20dae2fb65fd625b63511', '[\"*\"]', NULL, '2024-04-04 07:13:59', '2024-04-04 07:13:59'),
(27, 'App\\Models\\User', 13, 'admin-access-token', '7a71a80a2d70cea92868d8ab79e2229880132e452d17cd87437e51136e293387', '[\"*\"]', NULL, '2024-04-04 07:14:20', '2024-04-04 07:14:20'),
(28, 'App\\Models\\User', 3, 'admin-access-token', '5e7b0959f0866042c955c92fbc13f72716d40145c4169622535e16757327e031', '[\"*\"]', NULL, '2024-04-04 07:27:56', '2024-04-04 07:27:56'),
(29, 'App\\Models\\User', 3, 'admin-access-token', '3d96703ce34b2b7bc5395fdd62695120df03a7ac0b4be1e59d13b89ad6660701', '[\"*\"]', NULL, '2024-04-04 07:49:33', '2024-04-04 07:49:33'),
(30, 'App\\Models\\User', 3, 'admin-access-token', '4c5bedc6a2af7dadff8bd9d9b4682c43640c83c263db768fac34b84fbc6df427', '[\"*\"]', NULL, '2024-04-07 16:56:02', '2024-04-07 16:56:02'),
(31, 'App\\Models\\User', 3, 'admin-access-token', '895457aafecf55d7a91faa5ab8d639dbae37ea4eed3d65487e351ab36b7183dc', '[\"*\"]', NULL, '2024-04-07 17:27:54', '2024-04-07 17:27:54'),
(32, 'App\\Models\\User', 3, 'admin-access-token', '843ec843aa136ecb8b5d2e7ab7d8b6c58b5cd709041c4e16639a218e09a75954', '[\"*\"]', NULL, '2024-04-07 17:35:21', '2024-04-07 17:35:21'),
(33, 'App\\Models\\User', 3, 'admin-access-token', '3cd72c2ae460bb584f259e3e06af00c30857c96bb2e0078f53ee3775da042cee', '[\"*\"]', NULL, '2024-04-07 17:35:37', '2024-04-07 17:35:37'),
(34, 'App\\Models\\User', 3, 'admin-access-token', '32ea586aa605fb30793f0404e3639189367af180b54284c2c4d75a4a5e33faf5', '[\"*\"]', NULL, '2024-04-07 17:48:23', '2024-04-07 17:48:23'),
(35, 'App\\Models\\User', 3, 'admin-access-token', '91f842aee53cf55f3a998531d6473ec1993bae873c876e623772b3fe96f3b821', '[\"*\"]', '2024-04-20 12:45:37', '2024-04-07 17:56:55', '2024-04-20 12:45:37'),
(36, 'App\\Models\\User', 3, 'Personal Access Token', 'f5a5e78740c042082a9abb6e3fd44cd887c17ee65b0edc3935eaead328fe8a16', '[\"*\"]', NULL, '2024-04-09 06:38:48', '2024-04-09 06:38:48'),
(37, 'App\\Models\\User', 3, 'Personal Access Token', '87373197e5d637e8f2d8fe6079b2a448fa5b4916156319919e609ca3d5514392', '[\"*\"]', NULL, '2024-04-09 06:39:08', '2024-04-09 06:39:08'),
(38, 'App\\Models\\User', 3, 'Personal Access Token', '171c112dfb2c0314836dde7268c8ff8db1f2eb402cc9b9f601051f0bdb1ce2a7', '[\"*\"]', NULL, '2024-04-09 06:41:38', '2024-04-09 06:41:38'),
(39, 'App\\Models\\User', 3, 'Personal Access Token', 'c3c29848483489773c60ef55c6f1ddeb677a737298c8823350926ea61cd380b3', '[\"*\"]', NULL, '2024-04-09 06:44:16', '2024-04-09 06:44:16'),
(40, 'App\\Models\\User', 3, 'Personal Access Token', '442bc2060409f3e0e48410d36a8560dc624374f4e9b0d7ec678b6e45d9616dc2', '[\"*\"]', NULL, '2024-04-09 06:45:51', '2024-04-09 06:45:51'),
(41, 'App\\Models\\User', 3, 'Personal Access Token', '0ea85b1d9c07c44ff5721916dc7653d44ee404633184d2b8f26d6f7740f92b2b', '[\"*\"]', NULL, '2024-04-11 09:55:03', '2024-04-11 09:55:03'),
(42, 'App\\Models\\User', 3, 'Personal Access Token', 'f9d576d011abe471264d6bf8b13410acff4bda07db3d2dce2d4d67eaeaae17c5', '[\"*\"]', NULL, '2024-04-11 09:55:22', '2024-04-11 09:55:22'),
(43, 'App\\Models\\User', 3, 'Personal Access Token', '258cfcb7ae3e858747bb0574a4c091ce2d33b32058e0c67e9ab14bcdb7367aed', '[\"*\"]', NULL, '2024-04-11 09:55:56', '2024-04-11 09:55:56'),
(44, 'App\\Models\\User', 3, 'Personal Access Token', 'b151b4eace26b699eb86cc8128fefd1c987b56ea958ef64152b5c1bd132f1611', '[\"*\"]', NULL, '2024-04-11 09:58:29', '2024-04-11 09:58:29'),
(45, 'App\\Models\\User', 3, 'Personal Access Token', 'a9f55b8c62f17d8f4eb30cc4b68e380cbf4f03b3e4eeb52a0b3b7f988cd7d5d6', '[\"*\"]', NULL, '2024-04-11 10:02:31', '2024-04-11 10:02:31'),
(46, 'App\\Models\\User', 3, 'Personal Access Token', 'de284a5a2253f10828c83167ada17f22e7c61ffc7971e566a10c7f67e3e69ce5', '[\"*\"]', NULL, '2024-04-11 10:02:35', '2024-04-11 10:02:35'),
(47, 'App\\Models\\User', 3, 'Personal Access Token', '3b710da33d9ed22b7f71b3119a956b20bfd39a7997ada85ddaaeabdfdb157971', '[\"*\"]', NULL, '2024-04-11 10:03:49', '2024-04-11 10:03:49'),
(48, 'App\\Models\\User', 3, 'Personal Access Token', '35526ae2e47e693708234f3547a3c2bb8f700f5ffe2b70a311c217cc8e3328de', '[\"*\"]', NULL, '2024-04-11 10:05:07', '2024-04-11 10:05:07'),
(49, 'App\\Models\\User', 3, 'Personal Access Token', 'b9a8ecf36a08dfce247972e7437eeffdc0b6974735efbef2c745bf797a044c4d', '[\"*\"]', NULL, '2024-04-11 10:20:50', '2024-04-11 10:20:50'),
(50, 'App\\Models\\User', 13, 'admin-access-token', '53e4823d85e70e11b498509ff0e98b55338c7175d64d65c9a9430feefebbca28', '[\"*\"]', '2024-04-29 07:00:55', '2024-04-20 12:49:53', '2024-04-29 07:00:55'),
(51, 'App\\Models\\User', 13, 'admin-access-token', '205db6ff7d4d93db831c12cdc4b4f608408b02619754e551b66336843ccd61e5', '[\"*\"]', '2024-04-28 08:38:23', '2024-04-20 12:59:37', '2024-04-28 08:38:23'),
(52, 'App\\Models\\User', 18, 'Personal Access Token', '91b4aad094d110f50c58dd2d26493e5eafaf962c8be2c17e4e031baf7ff17edd', '[\"*\"]', NULL, '2024-04-23 13:38:43', '2024-04-23 13:38:43'),
(53, 'App\\Models\\User', 3, 'Personal Access Token', 'de298778e98bde7b182d51ea8b510eef71cf206105fb64cc98e7c83e15725657', '[\"*\"]', NULL, '2024-04-24 06:42:08', '2024-04-24 06:42:08'),
(54, 'App\\Models\\User', 13, 'admin-access-token', 'f1e23866accbf2f8d1046e9739e99e0b489d25f08a3ecf4158f53aae9100bc93', '[\"*\"]', '2024-04-28 10:25:41', '2024-04-24 06:42:17', '2024-04-28 10:25:41'),
(55, 'App\\Models\\User', 14, 'Personal Access Token', 'ecac86264543c1b204925702c7dd7a2164f9255eae23a7c53c322b30ebb0f4af', '[\"*\"]', '2024-04-26 10:08:01', '2024-04-26 10:07:52', '2024-04-26 10:08:01'),
(56, 'App\\Models\\User', 13, 'admin-access-token', '21ca2920fb98678e70783a366fd860e6b6817b47340d835ed67cdc5fc9630ca3', '[\"*\"]', '2024-04-28 09:57:47', '2024-04-28 09:20:02', '2024-04-28 09:57:47'),
(57, 'App\\Models\\User', 3, 'Personal Access Token', 'ecb370bf94d5a0d402246f71da58f977cb4e952503cb97f6921b0651fe55bc27', '[\"*\"]', '2024-04-28 09:43:15', '2024-04-28 09:21:43', '2024-04-28 09:43:15'),
(58, 'App\\Models\\User', 3, 'Personal Access Token', '563469f7d94e541aa32efe292fffff1d8d38b1dd9f16126ae89397afbe48947b', '[\"*\"]', NULL, '2024-04-29 06:53:52', '2024-04-29 06:53:52'),
(59, 'App\\Models\\User', 13, 'admin-access-token', '1aa55f49d8a33d5e7b13576a2c51013d89cd7b323dcfc7429bf9487ae936e640', '[\"*\"]', '2024-04-29 06:56:06', '2024-04-29 06:54:37', '2024-04-29 06:56:06'),
(60, 'App\\Models\\User', 3, 'Personal Access Token', '1b28851f1d9ec9796929b6833b926bb49352ef6d04cfed3c7e3d7550d98a5d89', '[\"*\"]', NULL, '2024-04-29 06:56:23', '2024-04-29 06:56:23'),
(61, 'App\\Models\\User', 3, 'Personal Access Token', '9021f8cfec883bb2f1e893d7eb1c0cf117826a2c0478ee335a44d14d5e7b7408', '[\"*\"]', '2024-04-29 07:07:04', '2024-04-29 06:57:20', '2024-04-29 07:07:04');

-- --------------------------------------------------------

--
-- Structure de la table `planning`
--

DROP TABLE IF EXISTS `planning`;
CREATE TABLE IF NOT EXISTS `planning` (
  `id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_datetime` datetime DEFAULT NULL,
  `end_datetime` datetime DEFAULT NULL,
  `plannable_id` int DEFAULT NULL,
  `plannable_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_arrivee` date NOT NULL,
  `date_limite` date DEFAULT NULL,
  `id_etagere` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_etagere` (`id_etagere`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `produits`
--

INSERT INTO `produits` (`id`, `nom`, `type`, `date_arrivee`, `date_limite`, `id_etagere`, `created_at`, `updated_at`) VALUES
(5, 'Produit A', 'Type A', '2024-04-25', '2024-05-25', 1, '2024-04-26 12:58:18', '2024-04-26 12:58:18');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code_postal` int NOT NULL,
  `ville` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `adresse` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `num_telephone` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
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
(3, 'Enzo', 0, '', '', '0', 'cocodoudo@gmail.com', '$2y$10$CVMCDeTNEZsdf23ElQAsyuk86yyo3JACrHYUctwU370kysiMO1MRu', 'beneficiaire', NULL, NULL, '2024-02-12 19:45:43', '2024-02-12 19:45:43'),
(4, 'Enz', 0, '', '', '0', 'cocodoudo1@gmail.com', '$2y$10$q7jBJMkSolJHk0cms/mmieTbVF5Vb3sAUhQU1Aab4sRqX1kLW9oJa', 'benevole', NULL, NULL, '2024-02-12 20:35:57', '2024-02-12 21:33:35'),
(7, 'Enza', 0, '', '', '0', 'cocodoudo69@gmail.com', 'Enzo1110&', 'benevole', NULL, NULL, '2024-02-16 15:33:31', '2024-02-16 15:33:31'),
(13, 'Enza', 0, '', '', '0', 'epartelpro@gmail.com', '$2y$10$HzCIfVy1vznOGdSGlXF8o.llNIj1ZFAZzTk3LT2/sOonh9b0FFumS', 'admin', NULL, NULL, '2024-02-16 16:08:09', '2024-02-16 16:08:09'),
(14, 'Enza', 28000, 'Chatres', 'Fati', '0123456789', 'bonjour@gmail.com', '$2y$10$yavbQUkfjnK24NLz9HN2tOA2qdU4zueoGDWpLcaHEe4irI5vZOVfa', 'benevole', NULL, NULL, '2024-04-23 13:19:21', '2024-04-23 13:19:21'),
(17, 'Edouard Sombier', 75000, 'Paris', 'On est la', '0123456789', 'sombier1@gmail.com', '$2y$10$vbWcRTT/G92yBsgyLwfIwOaXWRcJkBakyRz.XzZqxUcYdTPWkH95y', 'beneficiaire', NULL, NULL, '2024-04-23 13:24:47', '2024-04-23 13:24:47'),
(16, 'Edouard Sombier', 75000, 'Paris', 'On est la', '0123456789', 'sombier@gmail.com', '$2y$10$dSwYRoNkE2Ya3GtLchswwO6fFH4NHpDSkGyvYGjB0ULT3LIR3Y4R2', 'beneficiaire', NULL, NULL, '2024-04-23 13:23:02', '2024-04-23 13:23:02'),
(18, 'Fred Sananes', 75000, 'Paris', 'Pas la', '0123456789', 'fsananes@gmail.com', '$2y$10$FKo0T6IO7MJQ4V40MgHjBO6W.I4xowDx5REq.XoqLg6G0quGWlA3S', 'beneficiaire', NULL, NULL, '2024-04-23 13:34:01', '2024-04-23 13:34:01');
COMMIT;

