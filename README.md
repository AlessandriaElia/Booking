# Clone di Booking.com di Alessandria Elia

## Panoramica

Questo progetto è un clone del popolare sito di prenotazione viaggi, Booking.com. Permette agli utenti di cercare alloggi, voli e altri servizi legati ai viaggi. Il sito è costruito utilizzando HTML, CSS, JavaScript, PHP e SQL.

## Funzionalità

- **Interfaccia User-friendly**: Un'interfaccia pulita e intuitiva ispirata a Booking.com.
- **Funzionalità di Ricerca**: Gli utenti possono cercare alloggi.
- **Design Responsivo**: Il sito è completamente responsivo, offrendo un'esperienza senza soluzione di continuità su dispositivi desktop e mobili.
- **Integrazione Backend**: I dati vengono recuperati da un database SQL utilizzando PHP.
- **Offerte e Promozioni**: Gli utenti possono visualizzare offerte e promozioni attuali.

## Tecnologie Utilizzate

- **HTML**: Per strutturare le pagine web.
- **CSS**: Per stilizzare le pagine web. Utilizza Bootstrap per il design responsivo.
- **JavaScript**: Per lo scripting lato client.
- **PHP**: Per lo scripting lato server e l'interazione con il database.
- **SQL**: Per la gestione del database e il recupero dei dati.

## Istruzioni per l'Installazione

1. **Clonare il repository**:
    ```sh
    git clone https://github.com/Alessandria/booking-clone.git
    ```
2. **Navigare nella directory del progetto**:
    ```sh
    cd booking-clone
    ```
3. **Configurare il database**:
    - Creare un database nel proprio server SQL.
    - Importare il file `booking.sql` per creare le tabelle e inserire i dati di esempio.
    ```sh
    mysql -u username -p database_name < db/booking.sql
    ```
4. **Configurare il server**:
    - Assicurarsi che il server supporti PHP e abbia accesso al database.
    - Aggiornare le impostazioni di connessione al database nei file `search.php` e `offers.php` se necessario.
5. **Aprire il progetto nel browser**:
    - Se si utilizza un server locale, navigare su `http://localhost/booking-clone/index.html`.

## Utilizzo

- **Home Page**: Contiene un modulo di ricerca in cui gli utenti possono inserire i dettagli del loro viaggio.
- **Risultati della Ricerca**: Visualizza i risultati della ricerca in base all'input dell'utente.
- **Offerte**: Elenca le promozioni e le offerte speciali attuali.

## Contribuire

Se desideri contribuire a questo progetto, per favore fai un fork del repository e invia una pull request. Per modifiche significative, si prega di aprire prima un issue per discutere cosa si desidera cambiare.

## Licenza

Questo progetto è open-source e disponibile sotto la licenza MIT.

## Ringraziamenti

- Ispirato da [Booking.com](https://www.booking.com/).
- Utilizza [Bootstrap](https://getbootstrap.com/) per il design responsivo.
