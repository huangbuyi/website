-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2016-10-16 16:33:54
-- 服务器版本： 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `serials`
--

-- --------------------------------------------------------

--
-- 表的结构 `actors_name`
--

CREATE TABLE `actors_name` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `actors_name`
--

INSERT INTO `actors_name` (`id`, `name`) VALUES
(1, 'Julia'),
(2, 'Angela'),
(3, 'Grace'),
(4, 'Julia Ru'),
(5, ' Jamie Hans'),
(6, '赵日天'),
(7, '李颖'),
(8, '李莹'),
(9, '李瑛'),
(10, '123'),
(11, '456'),
(12, 'test'),
(13, 'Lady'),
(14, 'Gaga'),
(15, ';'),
(16, '/韦斯·本特利'),
(17, '/凯茜·贝茨'),
(18, '/莎拉·保罗森'),
(19, '/芬·维特洛克');

-- --------------------------------------------------------

--
-- 表的结构 `directors_name`
--

CREATE TABLE `directors_name` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `directors_name`
--

INSERT INTO `directors_name` (`id`, `name`) VALUES
(1, 'John'),
(2, '无'),
(3, 'Chandeller'),
(4, 'Lucia'),
(5, ''),
(6, 'Robin'),
(7, 'dy'),
(8, 'sb'),
(9, 'dog'),
(10, 'Liurui'),
(11, '666'),
(12, '肚导'),
(13, 'Martin'),
(14, '陈一发'),
(15, 'bin'),
(16, '飞儿'),
(17, '555'),
(18, 'cc'),
(19, 'haha'),
(20, 'Sebastián Silva'),
(21, 'nnn'),
(22, 'ooo'),
(23, 'test'),
(24, 'Ryan Murphy');

-- --------------------------------------------------------

--
-- 表的结构 `districts_name`
--

CREATE TABLE `districts_name` (
  `id` smallint(6) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL,
  `p_id` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `districts_name`
--

INSERT INTO `districts_name` (`id`, `name`, `p_id`) VALUES
(1, '美国', NULL),
(3, '日本', NULL),
(4, '英国', NULL),
(5, '内地', NULL),
(6, '', NULL),
(7, '大陆', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `issuers_name`
--

CREATE TABLE `issuers_name` (
  `id` smallint(6) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `issuers_name`
--

INSERT INTO `issuers_name` (`id`, `name`) VALUES
(6, ''),
(19, '20世纪福克斯'),
(7, '21 century'),
(14, '44444444'),
(15, '5555555'),
(16, 'hahahha'),
(8, 'HB0'),
(9, 'HBB'),
(2, 'HBO'),
(12, 'HGG'),
(11, 'HNC'),
(1, 'Netflix'),
(17, 'nnn'),
(18, 'types='),
(10, '斗鱼'),
(5, '无'),
(13, '魅友前有限公司');

-- --------------------------------------------------------

--
-- 表的结构 `movies_actors`
--

CREATE TABLE `movies_actors` (
  `s_id` smallint(5) UNSIGNED NOT NULL,
  `id` smallint(5) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `movies_images`
--

CREATE TABLE `movies_images` (
  `s_id` smallint(5) UNSIGNED NOT NULL,
  `path` varchar(500) NOT NULL,
  `type` tinyint(3) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `movies_info`
--

CREATE TABLE `movies_info` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `c_name` varchar(20) NOT NULL,
  `f_name` varchar(40) DEFAULT NULL,
  `director_id` smallint(5) UNSIGNED DEFAULT NULL,
  `issuer_id` smallint(5) UNSIGNED DEFAULT NULL,
  `district_id` smallint(5) UNSIGNED DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `duration` time DEFAULT NULL,
  `reco_index` tinyint(3) UNSIGNED DEFAULT '0',
  `type_index` tinyint(3) UNSIGNED DEFAULT '0',
  `douban_index` tinyint(3) UNSIGNED DEFAULT '0',
  `state` enum('updating','end','schedule','unknow') NOT NULL,
  `synopsis` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `movies_tags`
--

CREATE TABLE `movies_tags` (
  `s_id` smallint(5) UNSIGNED NOT NULL,
  `id` smallint(5) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `movies_types`
--

CREATE TABLE `movies_types` (
  `s_id` smallint(5) UNSIGNED NOT NULL,
  `id` smallint(5) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `musics`
--

CREATE TABLE `musics` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `m_id` varchar(10) NOT NULL,
  `type` tinyint(3) UNSIGNED NOT NULL DEFAULT '2',
  `comment` varchar(200) DEFAULT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `musics`
--

INSERT INTO `musics` (`id`, `m_id`, `type`, `comment`, `date`) VALUES
(1, '31284040', 2, '文艺女流氓', '2016-10-04'),
(2, '26418532', 2, '一首被和谐的歌', '2016-10-04'),
(3, '24343092', 2, '看了sense8，你一定会更喜欢这首歌', '2016-10-04'),
(4, '12914340', 3, '四川话版《谢谢你的爱》', '2016-10-04'),
(11, '105886', 2, '孤独的人唱着孤独的歌', '2016-10-06'),
(12, '35476049', 2, '这个年纪我已不再将就有些事情无法强求 ;该来的总会来该走的也无法挽留 ;青春慢慢从身边溜走我开始变的怀旧 ;喝光了这杯酒就再也无法回头。', '2016-10-06'),
(13, '35678973', 2, '做自己', '2016-10-06'),
(14, '35476883', 2, '女声有毒，宜用耳鸡', '2016-10-06'),
(15, '30260031', 2, '我没去过成都，但我一定会去', '2016-10-06'),
(16, '30394673', 2, '第一次听到这首歌，是一位女主播唱的，她会弹吉他，能拉二胡，唱歌也很好听。刚开始关注她，还是在当年十分火热的YY2080频道，当时流行的是边打网游边听2080歌手唱歌。现在，她已经换几个了平台，依然吸引了很多新粉丝，而那个2080频道不会再有当年的热闹了。', '2016-10-06'),
(17, '323523', 2, '《恭喜恭喜》是全球华人所共知的听了唱了千百遍的贺年歌曲，然而很多人并不知道，最开始这首贺年歌曲并不是用来庆贺新年的。近代的中国，是一个处在极端战乱贫困中的国度。当时的人民不仅衣不裹体食不果腹，更是分秒都在枪林弹雨中逃生。直到1945年抗日战争胜利，瓢泼的泪雨浸润了无数干瘪疲惫的心，疲惫了半世纪的中国人民终于有勇气期待明天。在这样的背景下，这首歌曲便诞生了。', '2016-10-06'),
(18, '167802', 2, '有的人把旅途的景色放进朋友圈，而有的人只是放进了心里。', '2016-10-06'),
(19, '149297', 2, '昨天看了电影《湄公河行动》，影片质量堪比美国大片。其实，国内有不少优秀的文艺工作者，但带着镣铐跳舞，这是很那发挥出实力的。', '2016-10-06'),
(20, '608667', 2, '这首歌是动画《CLANNAD》的片尾曲，看片是记得备好纸巾', '2016-10-06'),
(21, '26484066', 2, '戴上耳鸡，感受这个世界', '2016-10-06'),
(22, '28778772', 2, '失去了才懂得了要珍惜', '2016-10-06'),
(23, '791979519', 3, '爱《极挑》，爱黄渤 (黄渤版有版权，推荐听黄渤版)。有个段子，“黄渤：我唱歌的时候没人听，我火了你们又要我唱歌”。', '2016-10-06'),
(24, '93576', 2, '喜欢城市民谣的真实自然，喜欢郝云的略带痞性。', '2016-10-06'),
(25, '790704522', 3, '爷爷的那个年代，学的还是俄语，家里有本巨厚的俄语词典，除了我也没有人会再去翻它。高中毕业聚会，校长和化学老师声情并茂地合唱了一首三套车，我想老一辈的知识分子，都会有一些苏联共产主义式的浪漫情怀吧。现在很多人喜欢有车有房的富足感，而我却有些憧憬那种穷的只剩下快乐的时光。', '2016-10-06'),
(26, '417596830', 2, '如果多留心四周，你会发现美好事物其实就在离你不远的地方。', '2016-10-06'),
(27, '1698589', 2, '在《Skins》听到的这首歌。世界很残酷，希望你能照顾好自己。', '2016-10-12'),
(29, '413829859', 2, '暗杠，斗鱼主播，独立音乐人。最幸福的事莫过于做自己喜欢的事。', '2016-10-16'),
(30, '33166532', 2, '我的心上人，你在哪呢，过的还好吗？', '2016-10-16');

-- --------------------------------------------------------

--
-- 表的结构 `serials_actors`
--

CREATE TABLE `serials_actors` (
  `s_id` smallint(5) UNSIGNED NOT NULL,
  `id` smallint(5) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `serials_actors`
--

INSERT INTO `serials_actors` (`s_id`, `id`) VALUES
(60, 1),
(62, 7),
(62, 8),
(62, 9),
(123, 10),
(123, 11),
(1, 10),
(129, 10),
(138, 13),
(138, 14),
(138, 15),
(138, 16),
(138, 17),
(138, 18),
(138, 19);

-- --------------------------------------------------------

--
-- 表的结构 `serials_images`
--

CREATE TABLE `serials_images` (
  `s_id` smallint(5) UNSIGNED NOT NULL,
  `path` varchar(500) NOT NULL,
  `type` tinyint(3) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `serials_images`
--

INSERT INTO `serials_images` (`s_id`, `path`, `type`) VALUES
(130, '57934389-3035-43a2-af34-333e84501b1e/nacros.jpg', 1),
(130, 'e5025d44-3d23-41e7-ad4a-2303a39fcb74/nacros2.jpg', 1),
(130, 'e0c1c42f-b137-4f71-bec2-210aed0d2f8b/nacros4.jpg', 1),
(130, 'db6f8a65-0239-4600-bc74-ec932b9219d0/narcos3.jpg', 1),
(130, 'c051f75f-f09d-4576-8c7b-ee12f3ebc8df/Pablo Escobar.jpg', 0),
(130, 'd62fd868-af22-4d76-9994-06dce3cb0e69/Tata.jpg', 0),
(130, '299c581f-1c2b-428a-8c11-7eb5ed109828/xnCkiCB.jpg', 0),
(138, '1567694c-b39c-4f60-858d-ebfa84dd8bce/american-horror-story-hotel-men.jpg', 0),
(138, '7e584fcb-36fa-40f6-bb31-9a04406f1e31/brokenvows4.jpg', 0),
(138, 'f5895e96-59cd-4565-a743-14c7bc360e93/Capture1.jpg', 0),
(138, '5fd95d57-9de1-4af1-b991-21d5d76dd24b/maxresdefault.jpg', 0),
(138, '92fc7b52-460f-44c3-b1f9-d6743d325e46/d35e1c5ac5ee39177d.jpg.320.jpg', 1),
(139, '8932973c-d02d-4764-a410-c33300cd7108/20160212201336_35498.jpg', 1),
(140, '1a2d541e-25e6-46b7-b6c6-7094b653ddb0/p2377449669.jpg', 1),
(140, 'e50f66a2-5f1c-437a-82a7-011fc1af323e/113.jpg', 0),
(140, '202118bb-9d76-4cd5-bce3-ed6ba38cdde4/9966aa567fafe55b0df3e31d.jpg', 0);

-- --------------------------------------------------------

--
-- 表的结构 `serials_info`
--

CREATE TABLE `serials_info` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `c_name` varchar(20) NOT NULL,
  `f_name` varchar(40) DEFAULT NULL,
  `director_id` smallint(6) UNSIGNED DEFAULT NULL,
  `issuer_id` smallint(3) UNSIGNED DEFAULT NULL,
  `district_id` smallint(3) UNSIGNED DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `duration` smallint(5) UNSIGNED DEFAULT NULL,
  `episode_number` tinyint(3) UNSIGNED DEFAULT '1',
  `season_number` tinyint(3) UNSIGNED DEFAULT NULL,
  `reco_index` float UNSIGNED DEFAULT '0',
  `type_index` float UNSIGNED DEFAULT '0',
  `douban_index` float UNSIGNED DEFAULT '0',
  `state` enum('updating','end','schedule','unknow') NOT NULL DEFAULT 'unknow',
  `synopsis` varchar(800) DEFAULT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `serials_info`
--

INSERT INTO `serials_info` (`id`, `c_name`, `f_name`, `director_id`, `issuer_id`, `district_id`, `release_date`, `duration`, `episode_number`, `season_number`, `reco_index`, `type_index`, `douban_index`, `state`, `synopsis`, `date`) VALUES
(1, '迷失2', 'Lost2', 11, 12, 4, '2016-09-01', 120, 4, 5, 7, 6, 8, 'end', '', '2016-10-05'),
(3, '老友记', 'friends', 3, 2, 6, '2016-08-12', 20, 20, 10, 9, 9, 9, 'end', '666666666666', '2016-10-05'),
(4, '百万富翁', 'millions', 4, 5, 6, '2016-08-13', 40, 10, 1, 0, 0, 0, 'end', '666666666', '2016-10-05'),
(7, '好友记', 'friends', 3, 2, 6, '2016-08-12', 20, 20, 10, 9, 9, 9, 'end', '666666666666', '2016-10-05'),
(22, '谍影重重', 'dycc', 7, 7, 1, '2016-09-01', 150, 1, 1, 0, 0, 0, 'end', '不错', '2016-10-05'),
(25, '爆刘继芬', '', 14, 6, 7, '2022-02-02', 0, 1, 1, 0, 0, 0, 'end', '', '2016-10-05'),
(31, '虎口夺屎', '', 5, 6, 7, '2022-02-02', 0, 1, 1, 0, 0, 0, 'end', '', '2016-10-05'),
(41, '火线追姬', 'fire checkin', 9, 8, 7, '2016-10-01', 100, 1, 1, 0, 0, 0, 'end', '6666', '2016-10-05'),
(43, '火影', '', 5, 6, 7, '2022-02-02', 0, 1, 1, 0, 0, 0, 'end', '', '2016-10-05'),
(45, '等待', '', 5, 6, 7, '2022-02-02', 0, 1, 1, 0, 0, 0, 'end', '', '2016-10-05'),
(47, '克洛伊牧马', '', 5, 6, 7, '2022-02-02', 0, 1, 1, 0, 0, 0, 'end', '', '2016-10-05'),
(48, '火箭', '', 5, 6, 7, '2022-02-02', 0, 1, 1, 0, 0, 0, 'end', '', '2016-10-05'),
(49, '暗示', '', 5, 6, 7, '2022-02-02', 0, 1, 1, 0, 0, 0, 'end', '', '2016-10-05'),
(52, '惊悚', '', 5, 6, 7, '2022-02-02', 0, 1, 1, 0, 0, 0, 'end', '', '2016-10-05'),
(53, '海蜇王', '', 5, 6, 7, '2022-02-02', 0, 1, 1, 0, 0, 0, 'end', '', '2016-10-05'),
(54, '白雪公主', '', 5, 6, 7, '2022-02-02', 0, 1, 1, 0, 0, 0, 'end', '', '2016-10-05'),
(56, '尼古拉斯赵四', 'ngls', 5, 6, 6, '2022-02-02', 0, 1, 1, 0, 0, 0, 'end', '', '2016-10-05'),
(58, '赵小臭', '', 5, 6, 7, '2022-02-02', 0, 1, 1, 0, 0, 0, 'end', '', '2016-10-05'),
(59, '奶飞传奇', 'flye legend', 12, 6, 1, '2022-02-02', 5900, 4, 4, 10, 10, 10, 'end', '大大大大', '2016-10-05'),
(60, '金魂', 'Golden', 13, 11, 4, '2016-09-01', 2020, 10, 1, 0, 0, 0, 'end', '', '2016-10-05'),
(61, '毛妹', '', 5, 6, 7, '2022-02-02', 0, 1, 1, 0, 0, 0, 'end', '', '2016-10-05'),
(62, '花村', 'follower village', 15, 13, 7, '2016-09-01', 20, 10, 10, 2, 3, 4, 'end', '应该不好看', '2016-10-05'),
(63, '复仇者', '', 5, 6, 7, '2022-02-02', 0, 1, 1, 0, 0, 0, 'end', '', '2016-10-05'),
(64, '天机', '', 5, 6, 7, '2022-02-02', 0, 1, 1, 0, 0, 0, 'end', '', '2016-10-05'),
(65, '艾弗森', '', 5, 6, 7, '2022-02-02', 0, 1, 1, 0, 0, 0, 'end', '', '2016-10-05'),
(66, '谍影', '', 5, 6, 7, '2022-02-02', 0, 1, 1, 0, 0, 0, 'end', '', '2016-10-05'),
(67, '匿名1', '', 5, 6, 7, '2022-02-02', 0, 1, 1, 0, 0, 0, 'end', '', '2016-10-05'),
(68, '匿名2', '', 5, 6, 7, '2022-02-02', 0, 1, 1, 0, 0, 0, 'end', '', '2016-10-05'),
(69, '匿名3', '', 5, 6, 7, '2022-02-02', 0, 1, 1, 0, 0, 0, 'end', '', '2016-10-05'),
(70, '匿名4', '', 5, 6, 7, '2022-02-02', 0, 1, 1, 0, 0, 0, 'end', '', '2016-10-05'),
(71, '匿名6', '', 5, 6, 7, '2022-02-02', 0, 1, 1, 0, 0, 0, 'end', '', '2016-10-05'),
(75, '的发生大事发生法', '', 5, 6, 7, '2022-02-02', 0, 0, 0, 0, 0, 0, 'end', '', '2016-10-05'),
(76, '发大水发生的发生', '', 5, 6, 7, '2022-02-02', 0, 0, 0, 0, 0, 0, 'end', '', '2016-10-05'),
(77, 'dfasfadsfadsfads', '', 5, 6, 7, '2022-02-02', 0, 0, 0, 0, 0, 0, 'end', '', '2016-10-05'),
(78, 'dasfasdfdas', '', 5, 6, 7, '2022-02-02', 0, 0, 0, 0, 0, 0, 'end', '', '2016-10-05'),
(79, 'dfasasaaa', NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(80, 'zzzzzzzzzzzzzzx', NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(81, 'sssssssssssssss', NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(82, 'zzxxxxxxxxx', NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(83, 'qqqqqqqqqqqqqqq', 'qqq', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(84, 'aaaaaaaaaaaaaa', 'aaa', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(85, '666666666666', '23333', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(86, '2333333333', '233', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(87, '12222222', '122', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(88, '333333333', '2333333333333', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(89, '4444444444444', '4333333', NULL, 14, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(90, '555555555', '555', NULL, 15, 4, NULL, 14, 9, 10, 5, 5, 5, 'updating', '555555555555555555555555555555555555555555555555', '2016-10-05'),
(91, 'AAAAAAAAAAAAA', 'AA', NULL, NULL, NULL, '2016-09-01', NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(92, 'ccccccccccc', 'ccc', NULL, 6, NULL, '2016-09-01', NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(93, 'haha', 'ha', 19, 16, 1, '2016-09-01', 13, 14, 11, 8, 8, 8, 'schedule', '888888888888', '2016-10-05'),
(94, 'zzzzzzzz', 'zzz', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(95, '999999999', '999', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(96, '2581346', 'aaaaaaa', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(97, '123456789', '123', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(98, '987654', '999', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(99, '100', '100', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(100, 'dfsaasf', 'asfdsdf', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(101, '133.3333', '12222', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(102, 'kkkkkkkkkkkkk', 'kk', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(103, 'ccccccccccccc', NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(104, 'nnnnnnnnnnn', 'nn', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(105, 'hhhhhhhh', 'hh', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(106, 'ttttttttttt', 'tt', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(107, 'jjjjjjjjj', 'jjj', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(108, 'yuuuuuuuuuuu', 'uuuuuuuuuuu', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(109, 'kkkkkkkkkk', 'kk', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(110, 'yyyyyyyyyyyy', 'yy', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(111, 'llllllllll', 'll', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(112, 'dfasdasf', 'fdasfads', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(113, 'werqwer', NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(114, 'ghffhdgfhdfh', 'ghdf', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(115, 'gdfaga', NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(116, 'bnmbvnfg', 'vnb', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(117, '37777777777777', '377', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(118, '64684646', NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(119, 'aaaaaaaaaaa', 'Aaa', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(122, 'yyyyyyyyyyyyy', 'yyy', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(123, 'nnnnnnnnnn', 'nn', 21, 17, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(125, '无所谓', 'whatever', NULL, NULL, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(129, '女同学', 'classmate girl', 5, 6, NULL, NULL, NULL, 1, NULL, 0, 0, 0, 'unknow', NULL, '2016-10-05'),
(130, '毒枭第二季', 'Nacros S2', 20, 1, 1, '2016-09-02', NULL, 1, NULL, 9, 10, 9, 'end', '《毒枭》描写的是美国和哥伦比亚警方想要扳倒埃斯科巴贩毒王国的故事。巴勃罗·埃斯科巴（Pablo Escoba）是世界上著名的大毒枭，绰号“可卡因之王”的他，也是世界上最富有的毒贩。</br></br>\r\n前几天看了《湄公河行动》，讲的是中国打击毒枭糯康的故事。而这部剧讲述的是上个世纪哥伦比亚大毒枭Escoba的故事，他的事迹可比糯康精彩多了，杀警察、杀法官、杀总统，炸飞机、炸学校、炸最高法院，还竞选总统，劣迹斑斑，而他又是一个讲义气的兄弟、重感情的丈夫、疼爱孩子的父亲。为了自己，也为了家庭，他妄图用暴力换得政府的妥协，然而他失败了。一个人，即使他是毒枭之王，也很难与国家机器对抗。</br></br>\r\n哥伦比亚是个多灾多难的国家，毒贩、游击队、反政府武装，持续了半个多世纪的战争仍然笼罩着这个国家。今年诺贝尔和平奖获颁给了哥伦比亚总统胡安·曼努埃尔·桑托斯，他促成了政府和哥武的和平协议。然而讽刺的是，哥伦比亚人们却在和平协议公投上投出了反对票。这场战争什么时候才会结束了，这仍是个问题。', '2016-10-05'),
(138, '美国恐怖故事第五季-旅馆', 'american horror story S5: hotel', 24, 19, 1, '2015-10-01', 60, 12, NULL, 7.4, 7.6, 7.2, 'end', '原来的老板马奇死于非命后酒店就染上了一层神秘色彩。如今的老板伯爵夫人（Lady Gaga 饰）与她的情人多诺万似乎有着更不为人知的秘密。酒店的门店经理丽姿.泰勒与艾瑞斯似乎另有打算。看似平静的一切被一起连环凶杀案打破了，警察约翰进入酒店进行调查，却发现真相似乎更加的可怕。</br></br>\r\n美恐最精彩的是片头和前几集，但当你接受了剧情设定，后面部分惊悚和恐怖就淡了，因为后面的剧情并没有添加新的恐怖元素，有点虎头蛇尾。第五季杀人旅馆的设定应该是蛮有想象空间的，Lady Gaga的表演挺好的，几个男角颜值都挺高的。', '2016-10-11'),
(139, '纸牌屋第四季', 'house of cards S4', 5, 1, 1, '2016-03-04', 58, 13, 1, 9, 9.2, 9, 'end', '《纸牌屋第四季》是由奈飞公司（Netflix）出品的政治题材电视剧，改编自迈克尔·多布斯创作的同名小说，由詹姆斯·弗雷和大卫·芬奇等执导，由凯文·史派西、罗宾·怀特、迈克尔·凯利、拉斯·米科尔森等主演。 该季讲述了弗兰克·恩德伍德为了连任总统，与多方势力周旋，陷入四面楚歌的局面。</br></br>\r\n\r\n纸牌屋第四季上映时间正是美国总统选举年，今年美国大选的精彩程度毫不逊色于此剧。两党候选人，一个是深谙政场数十年的女强人，一个是毫无政治经验的地产商；一个被称为骗子，一个被称为疯子；一个是种子选手却为初选打压同僚，一个被当做笑话却击败十几位政治经验丰富的候选人。媒体的偏颇、政治的迫害和司法的偏袒，让这个民主灯塔黯然泯灭。', '2016-10-11'),
(140, '无耻之徒(美版)第七季', 'Shameless S7', 5, 6, 1, '2016-10-02', 46, 12, NULL, 9, 9.2, 9.7, 'end', '《无耻之徒》（Shameless）第七季。本季故事起始于「一个月之后」，Frank从昏迷中醒来后得知亲人背叛了他，于是向他们宣战。但是Fiona正忙于改善自己的生活，根本没时间关注Frank的威胁。尽管Fiona在第六季结尾遭到令人伤心的背叛，但她还是挺过来了。她是一个坚强的战士，没有什么能阻挡她追求新生活的努力——包括她的家人。<br />\r\nGallagher家的金童Lip完成了康复治疗，带着对酗酒问题的新认识回来了，他对自己的前景表示悲观。与之相反，曾经精神很不稳定的Ian如今有了一份正式职业（急救员），还收获了令人满意的爱情。Debbie仍然不知道如何做一个好母亲，即将成年的Carl必须做出一些重大决定。Fiona决心自己要活出个人样来，但是Gallagher家的其他人在没有她这个主心骨的情况下是否会分崩离析？Alicia Coppola扮演严肃的蓝领女性Sue，和Ian一起工作。她担任一群急救员的监管人。Arden Myrin扮演无家可归的New Monica/Delores，与Frank发生了关系。Pasha Lychnikoff扮演Svetlana的父亲Yvan。Ruby Modine扮演「Pasty Pies」馅饼餐厅新来的女服务员Sierra，Fiona刚刚成为餐厅的经理。', '2016-10-11'),
(141, '艾玛', 'emma', 5, 6, 4, '2009-10-04', 60, 4, NULL, 0, 0, 0, 'end', NULL, '2016-10-11');

-- --------------------------------------------------------

--
-- 表的结构 `serials_tags`
--

CREATE TABLE `serials_tags` (
  `s_id` smallint(6) UNSIGNED NOT NULL,
  `id` smallint(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `serials_tags`
--

INSERT INTO `serials_tags` (`s_id`, `id`) VALUES
(2, 1),
(2, 2),
(2, 3),
(3, 2),
(3, 4),
(60, 5),
(1, 5),
(1, 5),
(62, 9),
(62, 10),
(123, 11),
(123, 12),
(0, 13),
(0, 14),
(0, 15),
(0, 16),
(129, 11),
(138, 18);

-- --------------------------------------------------------

--
-- 表的结构 `serials_types`
--

CREATE TABLE `serials_types` (
  `s_id` smallint(6) UNSIGNED NOT NULL,
  `id` smallint(6) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `serials_types`
--

INSERT INTO `serials_types` (`s_id`, `id`) VALUES
(2, 6),
(2, 7),
(2, 8),
(3, 6),
(3, 0),
(3, 0),
(3, 9),
(4, 6),
(4, 10),
(4, 9),
(4, 11),
(60, 12),
(123, 13),
(123, 14),
(0, 12),
(129, 12),
(138, 15),
(138, 16),
(138, 17),
(138, 18),
(138, 19),
(138, 20),
(138, 21);

-- --------------------------------------------------------

--
-- 表的结构 `tags_name`
--

CREATE TABLE `tags_name` (
  `id` smallint(6) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `tags_name`
--

INSERT INTO `tags_name` (`id`, `name`) VALUES
(5, ''),
(15, '/'),
(11, '123'),
(12, '456'),
(14, ';'),
(17, 'release_date='),
(13, 'tg1'),
(16, 'tg2'),
(2, '中二'),
(1, '六人'),
(3, '大大大'),
(10, '大投资'),
(7, '大雾'),
(6, '好看'),
(8, '巨兽'),
(4, '暴力'),
(18, '杀人旅馆'),
(9, '自导自演');

-- --------------------------------------------------------

--
-- 表的结构 `types_name`
--

CREATE TABLE `types_name` (
  `id` smallint(6) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL,
  `p_id` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `types_name`
--

INSERT INTO `types_name` (`id`, `name`, `p_id`) VALUES
(1, '爱情', NULL),
(2, '喜剧', NULL),
(5, '情景喜剧', 2),
(6, '剧情片', NULL),
(7, '爱情片', NULL),
(8, '战争片', NULL),
(9, '动作片', NULL),
(10, '惊悚片', NULL),
(11, '公路片', NULL),
(12, '', NULL),
(13, '123', NULL),
(14, '456', NULL),
(15, 'Lady', NULL),
(16, 'Gaga', NULL),
(17, ';', NULL),
(18, '/韦斯·本特利', NULL),
(19, '/凯茜·贝茨', NULL),
(20, '/莎拉·保罗森', NULL),
(21, '/芬·维特洛克', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actors_name`
--
ALTER TABLE `actors_name`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `directors_name`
--
ALTER TABLE `directors_name`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `districts_name`
--
ALTER TABLE `districts_name`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `issuers_name`
--
ALTER TABLE `issuers_name`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `s_name` (`name`);

--
-- Indexes for table `movies_info`
--
ALTER TABLE `movies_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `c_name` (`c_name`);

--
-- Indexes for table `musics`
--
ALTER TABLE `musics`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `iframe` (`m_id`);

--
-- Indexes for table `serials_info`
--
ALTER TABLE `serials_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `c_name` (`c_name`);

--
-- Indexes for table `tags_name`
--
ALTER TABLE `tags_name`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `t_name` (`name`);

--
-- Indexes for table `types_name`
--
ALTER TABLE `types_name`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `type_name` (`name`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `actors_name`
--
ALTER TABLE `actors_name`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- 使用表AUTO_INCREMENT `directors_name`
--
ALTER TABLE `directors_name`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- 使用表AUTO_INCREMENT `districts_name`
--
ALTER TABLE `districts_name`
  MODIFY `id` smallint(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- 使用表AUTO_INCREMENT `issuers_name`
--
ALTER TABLE `issuers_name`
  MODIFY `id` smallint(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- 使用表AUTO_INCREMENT `movies_info`
--
ALTER TABLE `movies_info`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `musics`
--
ALTER TABLE `musics`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- 使用表AUTO_INCREMENT `serials_info`
--
ALTER TABLE `serials_info`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;
--
-- 使用表AUTO_INCREMENT `tags_name`
--
ALTER TABLE `tags_name`
  MODIFY `id` smallint(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- 使用表AUTO_INCREMENT `types_name`
--
ALTER TABLE `types_name`
  MODIFY `id` smallint(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
