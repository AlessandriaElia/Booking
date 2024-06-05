"use strict";
$(document).ready(function () {

    const selectCitta = $('.form-control[required]');
    const btnCerca = $("#btnCerca");
    const $checkInDate = $("#check-in");
    const $checkOutDate = $("#check-out");
    const $adults = $('input[type="number"][placeholder="Adulti"]');
    const $children = $('input[type="number"][placeholder="Bambini"]');
    const sezDettagli = $("#prenotazione");
    sezDettagli.hide();
    $("#Aaccedi").show();

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


    let rq = inviaRichiesta("GET", "server/getCitta.php");
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

        const citta = selectCitta.val();
        const checkIn = $checkInDate.val();
        const checkOut = $checkOutDate.val();
        const adults = $adults.val();
        const children = $children.val() || 0;

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
        $("#hotelListSection").hide();
        $("#prenotazione").show();
        console.log(codHotel);
    
        let rq = inviaRichiesta("GET", "server/getDetails.php", { codHotel });
        rq.catch(errore);
        rq.then(function ({ data }) {
            data.forEach(function (hotel) {
                const detailsContainer = $("#detailsContainer");
                detailsContainer.empty(); // Pulisce la sezione dei dettagli prima di aggiungere nuovi contenuti
    
                // Nome dell'hotel e indirizzo
                detailsContainer.append($("<h4>").addClass("text-center").text(hotel["nomeHotel"]));
                detailsContainer.append($("<p>").addClass("text-center").text(hotel["indirizzo"]));
    
                // Div per contenere le immagini
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
    
                // Div per contenere la descrizione e le tariffe
                const detailsDiv = $("<div>", { class: "mt-3" });
                detailsDiv.append($("<p>").text(hotel["descrizione"]));
                detailsDiv.append($("<h4>").text("Tariffe"));
    
                // Aggiunta delle tariffe
                for (const prezzo of data) {
                    detailsDiv.append($("<p>").text(`dal ${new Date(prezzo["dataInizio"]).toLocaleDateString()} al ${new Date(prezzo["dataFine"]).toLocaleDateString()} € ${prezzo["prezzo"]}`));
                }
                detailsContainer.append(detailsDiv);
            });
        });
        $("#checkIn2").prop("disabled", true).val($checkInDate);
        $("#checkOut2").prop("disabled", true).val($checkOutDate);

        
    }
    


});
