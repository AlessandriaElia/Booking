"use strict";
$(document).ready(function () {

    const selectCitta = $('.form-control[required]');
    const btnCerca = $("#btnCerca");
    const $checkInDate = $("#check-in");
    const $checkOutDate = $("#check-out");
    const $adults = $('input[type="number"][placeholder="Adulti"]');
    const $children = $('input[type="number"][placeholder="Bambini"]');
    const sezPrenotazione = $("#prenotazione");
    sezPrenotazione.hide();


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
                    $("#hotelList").append(`
                    <div class="col-md-4 d-flex align-items-stretch">
                        <div class="card mb-3">
                            <img src="img/hotels/${hotel['img']}" class="card-img-top" alt="${hotel['nomeHotel']}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${hotel['nomeHotel']}</h5>
                                <div>${stelle}</div>
                                <p class="card-text">${hotel['descrizione']}</p>
                                <div class="prezzo-tag">Prezzi a partire da ${data["prezzoMinimo"]} € a notte</div>
                                <button class="btn btn-primary" data-id="${hotel['codHotel']}">Dettagli</button>
                            </div>
                        </div>
                    </div>`);
                })
            });
            $("#hotelListSection").show();
        })
    }
    $(document).on('click', '.btn-primary', function() {
        var hotelId = $(this).data('id');
        
        $("#hotelListSection").hide();

        
        sezPrenotazione.show();
    });


});
