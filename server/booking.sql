-- phpMyAdmin SQL Dump
-- version 5.2.0
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Creato il: Giu 06, 2023 alle 09:35
-- Versione del server: 10.4.27-MariaDB
-- Versione PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booking`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `citta`
--

CREATE TABLE `citta` (
  `id` int(11) NOT NULL,
  `citta` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `hotel`
--

INSERT INTO `citta` (`id`, `citta`) VALUES
(1, 'Alba'),
(2, 'Torino'),
(3, 'Barolo'),
(4, 'Novello'),
(5, 'Treiso');


-- --------------------------------------------------------

--
-- Struttura della tabella `hotel`
--

CREATE TABLE `hotel` (
  `codHotel` int(11) NOT NULL,
  `nomeHotel` text NOT NULL,
  `CAP` varchar(5) NOT NULL,
  `citta` text NOT NULL,
  `siglaProvincia` varchar(2) NOT NULL,
  `indirizzo` text NOT NULL,
  `stelle` int(11) NOT NULL,
  `descrizione` text NOT NULL,
  `img` text NOT NULL,
  
  `stanzeSingole` int(11) NOT NULL,
  `stanzeDoppie` int(11) NOT NULL,
  `stanzeTriple` int(11) NOT NULL,
  `stanzeQuadruple` int(11) NOT NULL,
  `suites` int(11) NOT NULL,

  `singolePrenotate` int(11) NOT NULL,
  `doppiePrenotate` int(11) NOT NULL,
  `triplePrenotate` int(11) NOT NULL,
  `quadruplePrenotate` int(11) NOT NULL,
  `suitesPrenotate` int(11) NOT NULL,
  
  `wifi` tinyint(1) NOT NULL,
  `piscina` tinyint(1) NOT NULL,
  `spa` tinyint(1) NOT NULL,
  `colazioneInclusa` tinyint(1) NOT NULL,
  `cenaInclusa` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `hotel`
--

INSERT INTO `hotel` (`codHotel`, `nomeHotel`, `CAP`, `citta`, `siglaProvincia`, `indirizzo`, `stelle`, `descrizione`, `img`, `stanzeSingole`, `stanzeDoppie`, `stanzeTriple`, `stanzeQuadruple`, `suites`, `wifi`, `piscina`, `spa`, `colazioneInclusa`, `cenaInclusa`, `singolePrenotate`, `doppiePrenotate`, `triplePrenotate`, `quadruplePrenotate`, `suitesPrenotate`) VALUES
(1, 'Hotel Langhe', '12051', 'Alba', 'CN', 'Strada Profonda 21', 4, 'Questo incantevole hotel, ospitato in un cascinale ristrutturato e circondato da un rigoglioso giardino, dista 2,6 km dal Duomo di Alba e 10 km dal Castello di Grinzane Cavour.', 'HotelLanghe1.jpg', 10, 20, 2, 6, 4,    1, 1, 0, 1, 1,   0,0,0,0,0),
(3, 'Hotel Savona', '12051', 'Alba', 'CN', 'Via Roma 1', 3, 'Questo sontuoso hotel dista 10 minuti a piedi dalla Diocesi di Alba e 9 km dal Castello di Grinzane Cavour', 'HotelSavona1.jpg', 15, 12, 16, 20, 8,   1, 0, 0, 0, 1,   0,0,0,0,0),
(4, 'Alba Hotel', '12051', 'Alba', 'CN', 'Corso Asti 5', 4, 'Il bivio tra Langhe e Roero si chiama Alba Hotel, un luogo dove potrai soggiornare o riposarti, mangiare la tipica cucina della tradizione, accompagnata da vini delle nostre terre.', 'AlbaHotel1.jpg', 13, 15, 14, 6, 10,    1, 1, 1, 1, 1,   0,0,0,0,0),
(5, 'Hotel Medea', '12051', 'Alba', 'CN', 'Corso Unità d''Italia 64/D', 3, 'Un business Hotel alle porte di Alba che offre a chi è in viaggio per lavoro o in vacanza un ambiente moderno dotato di tutti i comforts.', 'HotelMedea1.jpg', 13, 15, 13, 10, 6,    1, 0, 0, 1, 0,   0,0,0,0,0),
(6, 'Hotel Calissano', '12051', 'Alba', 'CN', 'Via Pola 8', 3, 'L’Hotel Calissano è posto in un’area situata a ridosso della centralissima Piazza M. Ferrero, una delle piazze più belle del Piemonte, nota altresì come “il Salotto di Alba”. Città romana e medievale che ogni anno attrae migliaia di intenditori e turisti per merito della grandezza dei nostri Vini, dell’eccellente cucina e dell’intenso aroma del Tartufo Bianco d’Alba', 'HotelCallissano1.jpg', 12, 14, 8, 12, 4,   1, 0, 1, 1, 0,   0,0,0,0,0),
(7, 'Hotel I Castelli', '12051', 'Alba', 'CN', 'C.So Torino 14', 4, 'L’Hotel I Castelli si trova a pochi minuti dal cuore del centro storico di Alba, ed è in una posizione strategica anche per visitare le Langhe ed il Roero.', 'HotelICastelli1.jpg', 14, 16, 12, 10, 6,    1, 1, 1, 1, 1,   0,0,0,0,0),
(8, 'DoubleTree by Hilton Turin Lingotto', '10126', 'Torino', 'TO', 'Via Nizza 230', 4, 'L''hotel DoubleTree by Hilton Turin Lingotto è situato nello storico ex stabilimento FIAT, accanto al Centro congressi Lingotto e alla stazione della metropolitana.', 'DoubleTreebyHiltonTurinLingotto1.jpg', 11, 12, 14, 14, 8,    1, 0, 1, 1, 0,   0,0,0,0,0),
(9, 'Hotel Victoria', '10123', 'Torino', 'TO', 'Via Nino Costa 4', 4, 'L''Hotel Victoria è situato in una tranquilla via pedonale nel cuore del centro aulico della città, a soli tre isolati da Piazza San Carlo, il raffinato salotto di Torino. ', 'HotelVictoria1.jpg', 15, 15, 12, 6, 6,    1, 0, 1, 1, 1,   0,0,0,0,0),
(10, 'Turin Palace Hotel', '10128', 'Torino', 'TO', 'Via Paolo Sacchi 8', 5, 'Al Turin Palace Hotel vivrete un indimenticabile soggiorno immersi in un’atmosfera unica, ricca di charme e comfort assoluto. Il nostro hotel vicino a Torino Porta Nuova si trova nel centro della città ', 'TurinPalaceHotel1.jpg', 16, 10, 14, 12, 5,   1, 0, 1, 1, 1,   0,0,0,0,0),
(11, 'Hotel Barolo', '12060', 'Barolo', 'CN', 'Via Monforte 54', 3, 'L’Hotel Barolo è dotato di camere complete di ogni confort e minuziosamente preparate. Molto silenziose, stile raffinato, ideale per un soggiorno piacevole e confortevole', 'HotelBarolo1.jpg', 16, 13, 13, 12, 3,    1, 0, 0, 1, 0,   0,0,0,0,0),
(12, 'Hotel Cannubi', '12060', 'Barolo', 'CN', 'Via Roma 42', 4, 'Questo elegante hotel ha quattro stelle. La struttura è ubicata nelle immediate vicinanze della stazione ferroviaria, a pochi passi dal centro storico e dai principali monumenti della Città.  Nel raggio di 200 m sono disponibili negozi, ristoranti, e bar. Aereoporto di Levaldigi a 45 km.', 'HotelCannubi1.jpg', 16, 14, 12, 8, 8,    1, 0, 1, 1, 1,   0,0,0,0,0),
(14, 'Grand Hotel Novello', '12060', 'Novello', 'CN', 'Via Monforte 5', 5, 'Nel cuore delle Langhe, il Grand Hotel Novello & SPA rappresenta l’eleganza sontuosa e affascinante dei Grand Hotel di Lusso italiani. ',  'GrandHotel1.jpg', 10, 10, 15, 6, 6,    1, 0, 1, 1, 1,   0,0,0,0,0),
(15, 'Hotel Garassino', '12050', 'Treiso', 'CN', 'Via Belvedere 20', 4, 'Il Grand Hotel Dino combina i vantaggi di un grande albergo con l''eleganza e la quiete della vita nel cuor delle Langhe. A una struttura eclettica e versatile, che abbina un centro congressi all''avanguardia ad aree per il benessere e il relax di alto profilo, fa da cornice un quadro naturale incantevole, tra giardini secolari e il panorama delle Langhe. ', 'HotelGarassino1.jpg', 14, 12, 15, 8, 8,    1, 1, 1, 1, 1,   0,0,0,0,0);

-- --------------------------------------------------------

--
-- Struttura della tabella `foto`
--

CREATE TABLE `foto` (
  `id` int(11) NOT NULL,
  `codHotel` int(11) NOT NULL,
  `url` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `foto`
--

INSERT INTO `foto` (`id`, `codHotel`, `url`) VALUES
(1,  4, 'AlbaHotel1.jpg'),
(2,  4, 'AlbaHotel2.jpg'),
(3,  4, 'AlbaHotel3.jpg'),
(4,  8, 'DoubleTreebyHiltonTurinLingotto1.jpg'),
(5,  8, 'DoubleTreebyHiltonTurinLingotto2.jpg'),
(6,  8, 'DoubleTreebyHiltonTurinLingotto3.jpg'),
(7,  11, 'HotelBarolo1.jpg'),
(8,  11, 'HotelBarolo2.jpg'),
(9,  11, 'HotelBarolo3.jpg'),
(10, 6, 'HotelCallissano1.jpg'),
(11, 6, 'HotelCallissano2.jpg'),
(12, 6, 'HotelCallissano3.jpg'),
(13, 12, 'HotelCannubi1.jpg'),
(14, 7, 'HotelICastelli1.jpg'),
(15, 7, 'HotelICastelli2.jpg'),
(16, 7, 'HotelICastelli3.jpg'),
(17, 1, 'HotelLanghe1.jpg'),
(18, 1, 'HotelLanghe2.jpg'),
(19, 1, 'HotelLanghe3.jpg'),
(20, 5, 'HotelMedea1.jpg'),
(21, 5, 'HotelMedea2.jpg'),
(22, 5, 'HotelMedea3.jpg'),
(23, 3, 'HotelSavona1.jpg'),
(24, 3, 'HotelSavona2.jpg'),
(25, 3, 'HotelSavona3.jpg'),
(26, 9, 'HotelVictoria1.jpg'),
(27, 9, 'HotelVictoria2.jpg'),
(28, 9, 'HotelVictoria3.jpg'),
(29, 10, 'TurinPalaceHotel1.jpg'),
(30, 10, 'TurinPalaceHotel2.jpg'),
(31, 10, 'TurinPalaceHotel3.jpg'),
(32, 12, 'HotelCannubi2.jpg'),
(33, 12, 'HotelCannubi3.jpg'),
(34, 14, 'GrandHotel1.jpg'),
(35, 14, 'GrandHotel2.jpg'),
(36, 14, 'GrandHotel3.jpg'),
(37, 15, 'HotelGarassino1.jpg'),
(38, 15, 'HotelGarassino2.jpg'),
(39, 15, 'HotelGarassino3.jpg');

-- --------------------------------------------------------

--
-- Struttura della tabella `tariffe`
--

CREATE TABLE `tariffe` (
  `id` int(11) NOT NULL,
  `codHotel` int(11) NOT NULL,
  `dataInizio` text NOT NULL,
  `dataFine` text NOT NULL,
  `prezzo` float NOT NULL,
  `stagione` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `tariffe`
--

INSERT INTO `tariffe` (`id`, `codHotel`, `dataInizio`, `dataFine`, `prezzo`, `stagione`) VALUES
(1, 1, '2024-01-01', '2024-03-15', 85, 'Bassa Stagione'),
(2, 1, '2024-03-16', '2024-06-10', 95, 'Media Stagione'),
(3, 1, '2024-06-11', '2024-09-10', 119, 'Alta Stagione'),
(4, 1, '2024-09-11', '2024-10-15', 99, 'Media Stagione'),
(5, 1, '2024-10-16', '2024-12-31', 80, 'Bassa Stagione'),
(6, 3, '2024-01-01', '2024-03-15', 75, 'Bassa Stagione'),
(7, 3, '2024-03-15', '2024-06-10', 85, 'Media Stagione'),
(8, 3, '2024-06-10', '2024-09-10', 109, 'Alta Stagione'),
(9, 3, '2024-09-10', '2024-10-15', 89, 'Media Stagione'),
(10, 3, '2024-10-15', '2024-12-31', 75, 'Bassa Stagione'),
(11, 4, '2024-01-01', '2024-03-15', 90, 'Bassa Stagione'),
(12, 4, '2024-03-15', '2024-06-10', 95, 'Media Stagione'),
(13, 4, '2024-06-10', '2024-09-10', 129, 'Alta Stagione'),
(14, 4, '2024-09-10', '2024-10-15', 89, 'Media Stagione'),
(15, 4, '2024-10-15', '2024-12-31', 80, 'Bassa Stagione'),
(16, 5, '2024-01-01', '2024-03-10', 75, 'Bassa Stagione'),
(17, 5, '2024-03-10', '2024-06-15', 85, 'Media Stagione'),
(18, 5, '2024-06-15', '2024-09-20', 109, 'Alta Stagione'),
(19, 5, '2024-09-20', '2024-10-15', 89, 'Media Stagione'),
(20, 5, '2024-10-15', '2024-12-31', 75, 'Bassa Stagione'),
(21, 6, '2024-01-01', '2024-03-15', 70, 'Bassa Stagione'),
(22, 6, '2024-03-15', '2024-06-10', 80, 'Media Stagione'),
(23, 6, '2024-06-10', '2024-09-10', 105, 'Alta Stagione'),
(24, 6, '2024-09-10', '2024-10-15', 85, 'Media Stagione'),
(25, 6, '2024-10-15', '2024-12-31', 70, 'Bassa Stagione'),
(26, 7, '2024-01-01', '2024-03-15', 80, 'Bassa Stagione'),
(27, 7, '2024-03-15', '2024-06-10', 90, 'Media Stagione'),
(28, 7, '2024-06-10', '2024-09-10', 110, 'Alta Stagione'),
(29, 7, '2024-09-10', '2024-12-31', 90, 'Media Stagione'),
(30, 8, '2024-01-01', '2024-03-15', 80, 'Bassa Stagione'),
(31, 8, '2024-03-15', '2024-06-10', 90, 'Media Stagione'),
(32, 8, '2024-06-10', '2024-09-10', 109, 'Alta Stagione'),
(33, 8, '2024-09-10', '2024-10-15', 89, 'Media Stagione'),
(34, 8, '2024-10-15', '2024-12-31', 80, 'Bassa Stagione'),
(35, 9, '2024-01-01', '2024-03-15', 85, 'Bassa Stagione'),
(36, 9, '2024-03-15', '2024-06-10', 95, 'Media Stagione'),
(37, 9, '2024-06-10', '2024-09-20', 109, 'Alta Stagione'),
(38, 9, '2024-09-20', '2024-12-31', 85, 'Bassa Stagione'),
(39, 10, '2024-01-01', '2024-03-15', 100, 'Bassa Stagione'),
(40, 10, '2024-03-15', '2024-06-10', 125, 'Media Stagione'),
(41, 10, '2024-06-10', '2024-09-10', 150, 'Alta Stagione'),
(42, 10, '2024-09-10', '2024-10-15', 130, 'Media Stagione'),
(43, 10, '2024-10-15', '2024-12-31', 120, 'Bassa Stagione');

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `codUtente` int(11) NOT NULL,
  `username` text NOT NULL,
  `psw` text NOT NULL,
  `imgProfilo` text NOT NULL,
  `citta` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`codUtente`, `username`, `psw`, `imgProfilo`, `citta`) VALUES
(1, 'Alberto Chierici', '5f4dcc3b5aa765d61d8327deb882cf99', 'albertoChierici.jpg', 'Alba'),
(2, 'Calippo Fina', '5f4dcc3b5aa765d61d8327deb882cf99', 'calippoFina.jpg', 'Novara'),
(3, 'Ermenigilda Fassi', '5f4dcc3b5aa765d61d8327deb882cf99', 'ermenigildaFassi.jpg', 'Novara'),
(4, 'Ciccio Caputo', '5f4dcc3b5aa765d61d8327deb882cf99', 'ciccioCaputo.jpg', 'Alba'),
(5, 'Pietro Milanelli', '5f4dcc3b5aa765d61d8327deb882cf99', 'pietroMilanelli.jpg', 'Alba'),
(6, 'Lorenza Falliti', '5f4dcc3b5aa765d61d8327deb882cf99', 'lorenzaFalliti.jpg', 'Alba'),
(7, 'Michela Roascio', '5f4dcc3b5aa765d61d8327deb882cf99', 'michelaRoascio.jpg', 'Alba'),
(8, 'Enrica Sarti', '5f4dcc3b5aa765d61d8327deb882cf99', 'enricaSarti.jpg', 'Alba'),
(9, 'Matteo Lotito', '5f4dcc3b5aa765d61d8327deb882cf99', 'matteoLotito.jpg', 'Alba'),
(10, 'Luciana Battisti', '5f4dcc3b5aa765d61d8327deb882cf99', 'lucianaBattisti.jpg', 'Torino'),
(11, 'Nicola Servitti', '5f4dcc3b5aa765d61d8327deb882cf99', 'nicolaServiti.jpg', 'Torino'),
(12, 'Andrea Tornelliti', '5f4dcc3b5aa765d61d8327deb882cf99', 'andreaTornelliti.jpg', 'Torino\r\n'),
(13, 'Umberto Casellati', '5f4dcc3b5aa765d61d8327deb882cf99', 'umbertoCasellati.jpg', 'Stresa'),
(14, 'Ahmed Comrad', '5f4dcc3b5aa765d61d8327deb882cf99', 'ahmedComrad.jpg', 'Baveno'),
(15, 'Piera Carena', '5f4dcc3b5aa765d61d8327deb882cf99', 'pieraCarena.jpg', 'Manta'),
(16, 'Lucca Bonacci', '5f4dcc3b5aa765d61d8327deb882cf99', 'luccaBonacci.jpg', 'Savigliano'),
(17, 'Enry Dannis', '5f4dcc3b5aa765d61d8327deb882cf99', 'enryDannis.jpg', 'Rocca de Baldi'),
(18, 'Franca Ambrogio', '5f4dcc3b5aa765d61d8327deb882cf99', 'francaAmbrogio.jpg', 'Ceva');

-- --------------------------------------------------------

--
-- Struttura della tabella `recensioni`
--

CREATE TABLE `recensioni` (
  `id` int(11) NOT NULL,
  `codHotel` int(11) NOT NULL,
  `codUtente` int(11) NOT NULL,
  `stelle` int(11) NOT NULL,
  `testoRecensione` text NOT NULL,
  `data` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `recensioni`
--

INSERT INTO `recensioni` (`id`, `codHotel`, `codUtente`, `stelle`, `testoRecensione`, `data`) VALUES
(1, 1, 4, 5, 'Colazione ottima: varia e con prodotti di qualità. Camera confortevole. Posto molto tranquillo. Personale gentile e premuroso (hanno fatto un regalino a mio figlio e hanno coperto i parabrezza delle auto dei clienti dato le temperature e la brina mattutina).', '2024-06-01 09:53:03'),
(2, 1, 15, 5, 'L''insieme mi è piaciuto, la camera era ampia, bene arredata con un piccolo giardino. La stanza  decisamente non riscaldata, abbiamo dovuto dormire con un golf.', '2024-06-01 09:53:03'),
(3, 8, 17, 4, 'Hotel direi molto molto bello!!\r\nParcheggio gratuito.\r\nCamere spaziose e pulite dotate di ogni confort e di una Tv piatta spettacolare dotata di canali sky.\r\nColazione per tutti i gusti.\r\nPersonale gentile e disponibile ', '2024-06-01 09:54:53'),
(4, 3, 16, 4, 'Storico hotel ben posizionato in centro e dal quale è possibile raggiungere i punti e le attività più importanti della città. Le stanze sono comode e ben pulite. La colazione è varia e abbondante. Il personale è cortese ed attento alle esigenze dei clienti. Nell''albergo è presente anche un ristorante.', '2024-06-02 16:01:46'),
(5, 3, 16, 5, 'Storico hotel ben posizionato in centro e dal quale è possibile raggiungere i punti e le attività più importanti della città. Le stanze sono comode e ben pulite. La colazione è varia e abbondante. Il personale è cortese ed attento alle esigenze dei clienti. Nell''albergo è presente anche un ristorante.', '2024-06-02 16:01:54'),
(6, 8, 18, 5, 'Storico hotel ben posizionato in centro e dal quale è possibile raggiungere i punti e le attività più importanti della città. Le stanze sono comode e ben pulite. La colazione è varia e abbondante. Il personale è cortese ed attento alle esigenze dei clienti. Nell''albergo è presente anche un ristorante.', '2024-06-02 16:13:20'),
(7, 4, 15, 3, 'Colazione ottima: varia e con prodotti di qualità. Camera confortevole. Posto molto tranquillo. Personale gentile e premuroso (hanno fatto un regalino a mio figlio e hanno coperto i parabrezza delle auto dei clienti dato le temperature e la brina mattutina).', '2024-06-02 16:14:46'),
(8, 4, 14, 3, 'L''insieme mi è piaciuto, la camera era ampia, bene arredata con un piccolo giardino. La stanza  decisamente non riscaldata, abbiamo dovuto dormire con un golf.', '2024-06-02 16:15:27'),
(9, 5, 4, 2, 'L''insieme mi è piaciuto, la camera era ampia, bene arredata con un piccolo giardino. La stanza  decisamente non riscaldata, abbiamo dovuto dormire con un golf.', '2024-06-02 16:16:53'),
(10, 5, 3, 2, 'Colazione ottima: varia e con prodotti di qualità. Camera confortevole. Posto molto tranquillo. Personale gentile e premuroso (hanno fatto un regalino a mio figlio e hanno coperto i parabrezza delle auto dei clienti dato le temperature e la brina mattutina).', '2024-06-02 16:18:41'),
(11, 6, 7, 4, 'Storico hotel ben posizionato in centro e dal quale è possibile raggiungere i punti e le attività più importanti della città. Le stanze sono comode e ben pulite. La colazione è varia e abbondante. Il personale è cortese ed attento alle esigenze dei clienti. Nell''albergo è presente anche un ristorante.', '2024-06-02 16:19:16'),
(12, 6, 10, 1, 'Camere spaziose e pulite dotate di ogni confort e di una Tv piatta spettacolare dotata di canali sky.\r\nColazione per tutti i gusti.\r\nPersonale gentile e disponibile ', '2024-06-02 16:19:57'),
(13, 7, 2, 2, 'L''insieme mi è piaciuto, la camera era ampia, bene arredata con un piccolo giardino. La stanza  decisamente non riscaldata, abbiamo dovuto dormire con un golf.', '2024-06-02 16:20:33'),
(14, 7, 9, 2, 'Colazione ottima: varia e con prodotti di qualità. Camera confortevole. Posto molto tranquillo. Personale gentile e premuroso (hanno fatto un regalino a mio figlio e hanno coperto i parabrezza delle auto dei clienti dato le temperature e la brina mattutina).', '2024-06-02 16:21:21'),
(15, 9, 17, 2, 'Hotel direi molto molto bello!!\r\nParcheggio gratuito.\r\nCamere spaziose e pulite dotate di ogni confort e di una Tv piatta spettacolare dotata di canali sky.\r\nColazione per tutti i gusti.\r\nPersonale gentile e disponibile ', '2024-06-02 16:21:50'),
(16, 9, 5, 3, 'L''insieme mi è piaciuto, la camera era ampia, bene arredata con un piccolo giardino. La stanza  decisamente non riscaldata, abbiamo dovuto dormire con un golf.', '2024-06-02 16:22:29'),
(17, 10, 13, 5, 'Storico hotel ben posizionato in centro e dal quale è possibile raggiungere i punti e le attività più importanti della città. Le stanze sono comode e ben pulite. La colazione è varia e abbondante. Il personale è cortese ed attento alle esigenze dei clienti. Nell''albergo è presente anche un ristorante.', '2024-06-02 16:23:29'),
(18, 10, 6, 1, 'Hotel direi molto molto bello!!\r\nParcheggio gratuito.\r\nCamere spaziose e pulite dotate di ogni confort e di una Tv piatta spettacolare dotata di canali sky.\r\nColazione per tutti i gusti.\r\nPersonale gentile e disponibile ', '2024-06-02 16:24:08'),
(19, 11, 14, 2, 'Albergo situato adiacente al centro di Alba ! Camere e struttura un po'' antiquate !', '2024-06-02 16:24:38'),
(20, 11, 17, 3, 'L''insieme mi è piaciuto, la camera era ampia, bene arredata con un piccolo giardino. La stanza  decisamente non riscaldata, abbiamo dovuto dormire con un golf.', '2024-06-02 16:25:05'),
(21, 12, 3, 3, 'Storico hotel ben posizionato in centro e dal quale è possibile raggiungere i punti e le attività più importanti della città. Le stanze sono comode e ben pulite. La colazione è varia e abbondante. Il personale è cortese ed attento alle esigenze dei clienti. Nell''albergo è presente anche un ristorante.', '2024-06-02 16:25:49'),
(22, 12, 11, 4, 'Colazione ottima: varia e con prodotti di qualità. Camera confortevole. Posto molto tranquillo. Personale gentile e premuroso (hanno fatto un regalino a mio figlio e hanno coperto i parabrezza delle auto dei clienti dato le temperature e la brina mattutina).', '2024-06-02 16:26:25'),
(23, 14, 12, 5, 'storico hotel ben posizionato in centro e dal quale è possibile raggiungere i punti e le attività più importanti della città. Le stanze sono comode e ben pulite. La colazione è varia e abbondante. Il personale è cortese ed attento alle esigenze dei clienti. Nell''albergo è presente anche un ristorante.', '2024-06-02 16:27:01'),
(24, 14, 4, 5, 'L''insieme mi è piaciuto, la camera era ampia, bene arredata con un piccolo giardino. La stanza  decisamente non riscaldata, abbiamo dovuto dormire con un golf.', '2024-06-02 16:27:32'),
(25, 15, 3, 4, 'Albergo situato adiacente al centro di Viterbo ! Camere e struttura un po'' antiquate !', '2024-06-02 16:28:11'),
(26, 15, 18, 3, 'Colazione ottima: varia e con prodotti di qualità. Camera confortevole. Posto molto tranquillo. Personale gentile e premuroso (hanno fatto un regalino a mio figlio e hanno coperto i parabrezza delle auto dei clienti dato le temperature e la brina mattutina).', '2024-06-02 16:28:43');

-- --------------------------------------------------------

--
-- Struttura della tabella `prenotazioni`
--

CREATE TABLE `prenotazioni` (
  `id` int(11) NOT NULL,
  `codHotel` int(11) NOT NULL,
  `codUtente` int(11) NOT NULL,
  `dataInizio` text NOT NULL,
  `dataFine` text NOT NULL,
  `nPersone` int(11) NOT NULL,
  `prezzoPerPersona` int(11) NOT NULL,
  `tipoStanza` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `prenotazioni`
--

INSERT INTO `prenotazioni` ( `id`, `codHotel`, `codUtente`, `dataInizio`, `dataFine`, `nPersone`, `prezzoPerPersona`, `tipoStanza`) VALUES
(1, 1, 4, '2024-06-01', '2024-06-15', 3, 90, 'tripla'),
(2, 3, 4, '2024-05-01', '2024-05-15', 1, 85, 'singola');

-- --------------------------------------------------------

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `hotel`
--
ALTER TABLE `citta`
  ADD PRIMARY KEY (`id`);


--
-- Indici per le tabelle `hotel`
--
ALTER TABLE `hotel`
  ADD PRIMARY KEY (`codHotel`);


--
-- Indici per le tabelle `foto`
--
ALTER TABLE `foto`
  ADD PRIMARY KEY (`id`);


--
-- Indici per le tabelle `tariffe`
--
ALTER TABLE `tariffe`
  ADD PRIMARY KEY (`id`);


--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`codUtente`);


--
-- Indici per le tabelle `recensioni`
--
ALTER TABLE `recensioni`
  ADD PRIMARY KEY (`id`);
  

--
-- Indici per le tabelle `prenotazioni`
--
ALTER TABLE `prenotazioni`
  ADD PRIMARY KEY (`id`);

  
--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `hotel`
--
ALTER TABLE `citta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;


--
-- AUTO_INCREMENT per la tabella `hotel`
--
ALTER TABLE `hotel`
  MODIFY `codHotel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
  
--
-- AUTO_INCREMENT per la tabella `utenti`
--
ALTER TABLE `utenti`
  MODIFY `codUtente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT per la tabella `foto`
--
ALTER TABLE `foto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT per la tabella `tariffe`
--
ALTER TABLE `tariffe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT per la tabella `recensioni`
--
ALTER TABLE `recensioni`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT per la tabella `prenotazioni`
--
ALTER TABLE `prenotazioni`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
