"use strict";
window.onload = async function () {
    await caricaGoogleMaps();
    let rq /*= inviaRichiesta("GET", "server/checkSession.php");
    rq.catch(errore);
    rq.then(function({data}){
        console.log(data);
    })*/
   let idU;
    let idImg;
    const request = inviaRichiesta("GET", "server/getDatiUtente.php")
    request.catch(errore)
    request.then(function ({ data }) {
        console.log("ciao: ", data)

        idU=data["user"];
        idImg=data["img"];

        console.log(idU,idImg);
        $("#Aaccedi").hide();
        $("#Alogout").show();
        $("#imgAcc").prop("src", `img/utenti/${idImg}`);
    })
    const selectCitta = $('.form-control[required]');
    const btnCerca = $("#btnCerca");
    const $checkInDate = $("#check-in");
    const $checkOutDate = $("#check-out");
    const $adults = $('input[type="number"][placeholder="Adulti"]');
    const $children = $('input[type="number"][placeholder="Bambini"]');
    const sezDettagli = $("#prenotazione");
    const spanUsername = $("#spanUsername");
    const imgUser = $("#imgUser");
    let citta;
    let checkIn;
    let checkOut;
    let adults;
    let children;
    let prezzoStimato;
    let indirizzo;
    let ID = null;
    let GLOBAL_HOTEL;
    let GLOBAL_USER = 4;
    let GLOBAL_NPERSONE;
    let GLOBAL_TIPOSTANZA;
    let GLOBAL_PPP;
    let GLOBAL_PRICE;
    let idUtente
    let divMappa = $("#divMappa").get(0);



    $("#btnPrenota").on("click", function () { prenota(ID, GLOBAL_HOTEL, GLOBAL_USER, checkIn, checkOut, GLOBAL_NPERSONE, GLOBAL_PPP, GLOBAL_TIPOSTANZA) })
    /*rq = inviaRichiesta("GET", "server/getDatiUtente.php");
    rq.catch(errore);
    rq.then(function({data}){
        console.log("DATI UTENTE", data);
        idUtente = data["codUtente"];
    })*/

    sezDettagli.hide();
    $("#Aaccedi").show();
    $("#Alogout").hide();
    /*let requestUtenti = inviaRichiesta("POST", "../server/login.php", {
            username: username,
            password: password
        });

        requestUtenti.then(function (response) {
            let users = response.data;
            console.log(users)
            $(".limiter").hide();
            $("#header").show();
            $("#welcome-section").css("visibility", "visible");
            $("#welcome-section").show();
            $("main").show();
            let data = Object.values(users)[3];
            name = Object.values(users)[1];
            $("#userLogin").text(name + ", Che viaggio hai in mente?");
            $("#profile-icon").prop("src", "../img/utenti/" + data.replace(/\s+/g, ""));
        }).catch(function (error) {
            console.log(error);
        });*/

    $("#Alogout").on("click", function () {
        const request = inviaRichiesta("POST", "server/logout.php")
        request.catch(errore)
        request.then(function () {
            alert("logout eseguito correttamente")
            window.location.href = "login.html"
        })
    })

    //let rq = inviaRichiesta("GET","server/getUserInfo");
    //rq.catch(errore);
    //rq.then(function({data}){
    //const li = $("<li>").addClass("class='nav-item'");
    //const a = $("<a>").addClass("nav-link").text(data["user"]);
    //a.appendTo(li);
    //li.appendTo($("#sessionNav"));
    //})
    const checkInPicker = flatpickr("#check-in", {
        dateFormat: "Y-m-d",
        minDate: "today",
        onChange: function (selectedDates) {
            const [selectedDate] = selectedDates;
            if (selectedDate) {
                const dayAfterSelectedDate = new Date(selectedDate.getTime() + 86400000);
                checkOutPicker.set("minDate", dayAfterSelectedDate);
                if (checkOutPicker.selectedDates[0] < dayAfterSelectedDate) {
                    checkOutPicker.setDate(dayAfterSelectedDate);
                }
            }
        }
    });

    const checkOutPicker = flatpickr("#check-out", {
        dateFormat: "Y-m-d",
        minDate: new Date().fp_incr(1)
    });


    rq = inviaRichiesta("GET", "server/getCitta.php");
    rq.catch(errore);
    rq.then(function ({ data }) {
        console.log(data);
        data.forEach(citta => {
            const option = $("<option>").val(citta["citta"]).text(citta["citta"]);
            option.appendTo(selectCitta);
        });
    });

    btnCerca.on("click", cercaHotel);

    function cercaHotel(event) {
        event.preventDefault(); //sennó mi resettava il form

        sezDettagli.hide();
        citta = selectCitta.val();
        checkIn = $checkInDate.val();
        checkOut = $checkOutDate.val();
        adults = $adults.val();
        children = $children.val() || 0;

        console.log(citta, checkIn, checkOut, adults, children);

        let rq = inviaRichiesta("GET", "server/getHotels.php", { citta });
        rq.catch(errore);
        rq.then(function ({ data }) {
            console.log(data);
            $("#hotelList").empty();
            data.forEach(function (hotel) {
                let stelle = "";
                for (let i = 0; i < hotel['stelle']; i++) {
                    stelle += `<img src="star.png" style='width:33px; height:33px'>`;
                }
                rq = inviaRichiesta("GET", "server/getTariffaMinima.php", { codHotel: hotel["codHotel"] });
                rq.catch(errore);
                rq.then(function ({ data }) {
                    console.log("prezzo: ", data);

                    var $colDiv = $('<div>', { class: 'col-md-4 d-flex align-items-stretch' });
                    var $cardDiv = $('<div>', { class: 'card mb-3' });
                    var $img = $('<img>', { src: `img/hotels/${hotel.img}`, class: 'card-img-top', alt: hotel.nomeHotel });
                    var $cardBodyDiv = $('<div>', { class: 'card-body d-flex flex-column' });
                    var $title = $('<h5>', { class: 'card-title' }).text(hotel.nomeHotel);
                    var $starsDiv = $('<div>').html(stelle);
                    var $description = $('<p>', { class: 'card-text' }).text(hotel.descrizione);
                    var $priceTag = $('<div>', { class: 'prezzo-tag' }).html(`Prezzi a partire da <span style="color:green;">${data.prezzoMinimo} € a notte</span>`);
                    var $button = $('<button>', { class: 'btn btn-primary', 'data-id': hotel["codHotel"] }).text('Dettagli').on("click", function () {
                        openDetails(
                            $(this).data('id')
                        )
                    });

                    $cardBodyDiv.append($title, $starsDiv, $description, $priceTag, $button);
                    $cardDiv.append($img, $cardBodyDiv);
                    $colDiv.append($cardDiv);
                    $('#hotelList').append($colDiv);
                })
            });
            $("#hotelListSection").show();
        })
    }
    function openDetails(codHotel) {
        spanUsername.text(idU);
        imgUser.prop("src", `img/utenti/${idImg}`);
        GLOBAL_HOTEL = codHotel;
        $("#hotelListSection").hide();
        $("#prenotazione").show();
        console.log(codHotel);

        let rq = inviaRichiesta("GET", "server/getDetails.php", { codHotel });
        rq.catch(errore);
        rq.then(function ({ data }) {
            data.forEach(function (hotel) {
                indirizzo = `${hotel["citta"]}, ${hotel["indirizzo"]}`;
                console.log("Indirizzo: ", indirizzo);
                const detailsContainer = $("#detailsContainer");
                detailsContainer.empty();

                detailsContainer.append($("<h4>").addClass("text-center").text(hotel["nomeHotel"]));
                detailsContainer.append($("<p>").addClass("text-center").text(hotel["indirizzo"]));

                const imgDiv = $("<div>", { class: "d-flex justify-content-center" });
                for (let i = 0; i < 3; i++) {
                    const img = $("<img>", {
                        class: "img-thumbnail m-1",
                        src: "img/hotels/" + hotel["img"].replace("1", i + 1),
                        alt: hotel.nomeHotel,
                        style: "width: 200px; height: 150px; object-fit: cover;"
                    });
                    imgDiv.append(img);
                }
                detailsContainer.append(imgDiv);

                const detailsDiv = $("<div>", { class: "mt-3" });
                detailsDiv.append($("<p>").text(hotel["descrizione"]));

                detailsDiv.append($("<h4>")).text("Stanze disponibili: ");
                const select = $("<select>", { class: "form-control" }).css("width", "30%").appendTo(detailsDiv);
                let option = $("<option>").val("stanzeSingole").text(`Stanze singole (${hotel["stanzeSingole"]})`).appendTo(select);
                option = $("<option>").val("stanzeDoppie").text(`Stanze Doppie (${hotel["stanzeDoppie"]})`).appendTo(select);
                option = $("<option>").val("stanzeTriple").text(`Stanze Triple (${hotel["stanzeTriple"]})`).appendTo(select);
                option = $("<option>").val("stanzeQuadruple").text(`Stanze Quadruple (${hotel["stanzeQuadruple"]})`).appendTo(select);
                option = $("<option>").val("suites").text(`Suites (${hotel["suites"]})`).appendTo(select).append($("<br>"));

                $("<button>").addClass("btn btn-primary").on("click", function () { aggiungiRecensione() }).appendTo(detailsDiv).text("Scrivi una recensione");
                $("<button>").addClass("btn btn-primary").on("click", function () { visualizzaMappa(indirizzo) }).appendTo(detailsDiv).text("Visualizza location").css("margin", "10px");


                select.on("change", function () {
                    if (select.val() == "stanzeSingole") {
                        GLOBAL_TIPOSTANZA = "stanzeSingole"
                        prezzoStimato = prezzoStimato + 20;
                    }
                    else if (select.val() == "stanzeDoppie") {
                        GLOBAL_TIPOSTANZA = "stanzeDoppie"
                        prezzoStimato = prezzoStimato + 40;
                    }
                    else if (select.val() == "stanzeTriple") {
                        GLOBAL_TIPOSTANZA = "stanzeTriple"
                        prezzoStimato = prezzoStimato + 60;
                    }
                    else if (select.val() == "stanzeQuadruple") {
                        GLOBAL_TIPOSTANZA = "stanzeQuadruple"
                        prezzoStimato = prezzoStimato + 80;
                    }
                    else if (select.val() == "suites") {
                        GLOBAL_TIPOSTANZA = "suites"
                        prezzoStimato = prezzoStimato + 100;
                    }
                    console.log(prezzoStimato);
                    $("#pPrezzo").text(`Prezzo: ${prezzoStimato}€`);
                    GLOBAL_PRICE = prezzoStimato;
                })
                select.prop("selectedIndex", -1);
                detailsDiv.append($("<h4>").text("Tariffe"));

                rq = inviaRichiesta("GET", "server/getTariffe.php", { codHotel: hotel["codHotel"] })
                rq.catch(errore);
                rq.then(function ({ data }) {
                    for (const prezzo of data) {
                        if (checkIn >= prezzo["dataInizio"] && checkIn <= prezzo["dataFine"]) {
                            var date1 = new Date(checkIn);
                            var date2 = new Date(checkOut);

                            var timeDiff = Math.abs(date1.getTime() - date2.getTime());
                            var diffDays = Math.ceil(parseInt((date2 - date1) / (24 * 3600 * 1000)));
                            console.log(diffDays);
                            prezzoStimato = parseInt(prezzo["prezzo"]) * diffDays;

                            console.log(prezzoStimato);
                            $("#pPrezzo").text(`Prezzo: ${prezzoStimato}€`);
                            GLOBAL_PRICE = prezzoStimato;
                        }

                        detailsDiv.append($("<p>").text(`dal ${new Date(prezzo["dataInizio"]).toLocaleDateString()} al ${new Date(prezzo["dataFine"]).toLocaleDateString()} € ${prezzo["prezzo"]}`));
                    }
                })


                $("#checkIn2").val(checkIn);
                $("#checkOut2").val(checkOut);
                let sommaP = parseInt(adults) + parseInt(children);
                $("#numeroPersone").val(sommaP);
                GLOBAL_NPERSONE = sommaP;


                rq = inviaRichiesta("GET", "server/getReviews.php", { codHotel: hotel["codHotel"] });
                rq.catch(errore);
                rq.then(function ({ data }) {
                    console.log("REVIEW", data);
                    const reviewsContainer = $("<div>").addClass("mt-3").appendTo(detailsDiv);
                    reviewsContainer.empty();
                    let codUtente
                    data.forEach(review => {
                        codUtente = parseInt(review["codUtente"]);
                        console.log("COD UTENTE", codUtente);
                        rq = inviaRichiesta("GET", "server/getNomeReview.php", { codUtente })
                        rq.catch(errore);
                        rq.then(function ({ data }) {
                            console.log(data);
                            data.forEach(user => {
                                const reviewCard = $("<div>", { class: "card mb-3" });
                                const cardBody = $("<div>", { class: "card-body" });

                                const cardHeader = $("<div>", { class: "card-header" });
                                const title = $("<h5>", { class: "card-title" }).text(`Recensione di ${user["username"]}`);
                                let stelle = "";
                                for (let i = 0; i < review['stelle']; i++) {
                                    stelle += `<img src="star.png" style='width:33px; height:33px'>`;
                                }
                                cardHeader.append(title, stelle);

                                const text = $("<p>", { class: "card-text" }).text(review.testoRecensione);
                                const footer = $("<div>", { class: "card-footer text-muted" }).text(`Data: ${new Date(review.data).toLocaleString()}`);

                                cardBody.append(text);
                                reviewCard.append(cardHeader, cardBody, footer);
                                reviewsContainer.append(reviewCard);
                                reviewsContainer.appendTo(detailsDiv);

                            })


                        })


                    });
                });


                detailsContainer.append(detailsDiv);

            });
        });
    }
    function prenota(id, codHotel, codUtente, dataInizio, dataFine, nPersone, prezzoPerPersona, tipoStanza) {

        prezzoPerPersona = Math.floor(GLOBAL_PRICE / GLOBAL_NPERSONE);
        console.log(id, codHotel, codUtente, dataInizio, dataFine, nPersone, prezzoPerPersona, tipoStanza);

        let rq = inviaRichiesta("GET", "server/inviaPrenotazione.php",
            { id, codHotel, codUtente, dataInizio, dataFine, nPersone, prezzoPerPersona, tipoStanza }
        );
        rq.catch(errore);
        rq.then(function ({ data }) {
            alert("Prenotazione effettuata con successo!");
        });
    }
    function aggiungiRecensione() {
        Swal.fire({
            title: 'Scrivi una Recensione',
            html: `
                     <textarea id="reviewText" class="swal2-textarea" placeholder="Scrivi la tua recensione qui..."></textarea>
                    <br>
                    <label for="reviewStars">Stelle:</label>
                    <select id="reviewStars" class="swal2-select">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    </select>
                    `,
            showCancelButton: true,
            confirmButtonText: 'Invia',
            cancelButtonText: 'Annulla',
            preConfirm: () => {
                const reviewText = document.getElementById('reviewText').value;
                const reviewStars = document.getElementById('reviewStars').value;
                if (!reviewText || !reviewStars) {
                    Swal.showValidationMessage('Per favore inserisci sia la recensione che le stelle');
                    return false;
                }
                return {
                    reviewText: reviewText,
                    reviewStars: reviewStars
                };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { reviewText, reviewStars } = result.value;
                console.log('Recensione:', reviewText);
                console.log('Stelle:', reviewStars);
                let id = null;
                let codHotel = GLOBAL_HOTEL;
                let codUtente = 4;
                let stelle = reviewStars;
                let testoRecensione = reviewText;

                const currentDate = new Date();

                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                const day = String(currentDate.getDate()).padStart(2, '0');

                const hours = String(currentDate.getHours()).padStart(2, '0');
                const minutes = String(currentDate.getMinutes()).padStart(2, '0');
                const seconds = String(currentDate.getSeconds()).padStart(2, '0');

                const data = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

                console.log("TUTTO: ", id, codHotel, codUtente, stelle, testoRecensione, data);
                let rq = inviaRichiesta("GET", "server/inviaRecensione.php",
                    { id, codHotel, codUtente, stelle, testoRecensione, data });
                rq.catch(errore);
                rq.then(function ({ data }) {
                    alert("Recensione inviata con successo")
                    openDetails(codHotel);
                });
            }
        });
    }
    function visualizzaMappa(indirizzo) {
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({ "address": indirizzo }, function (results, status) {
            console.log("results", results);
            if (status == google.maps.GeocoderStatus.OK) {
                let mapOptions = {
                    center: results[0].geometry.location,
                    zoom: 16,
                };



                let googleMap = new google.maps.Map(divMappa, mapOptions);

                Swal.fire({
                    html: divMappa
                });
            }

        });
    }

    $("#btnBarolo").on("click", function () {
        selectCitta.val("Barolo");
        $checkInDate.val("");
        $checkOutDate.val("");
    })

};
