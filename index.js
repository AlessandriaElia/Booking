"use strict";
$(document).ready(function() {

    const selectCitta = $('.form-control[required]');
    const btnCerca = $("#btnCerca");
    const $checkInDate = $("#check-in");
    const $checkOutDate =  $("#check-out");
    const $adults = $('input[type="number"][placeholder="Adulti"]');
    const $children = $('input[type="number"][placeholder="Bambini"]');

    const checkInPicker = flatpickr("#check-in", {
        dateFormat: "Y-m-d",
        minDate: "today",
        onChange: function(selectedDates) {
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
    rq.then(function({data}){
        console.log(data);        
        data.forEach(citta => {
            const option = $("<option>").val(citta["id"]).text(citta["citta"]);
            option.appendTo(selectCitta);
        });
    });

    btnCerca.on("click", cercaHotel);

    function cercaHotel(event){
        event.preventDefault(); 

        const citta = selectCitta.val();
        const checkIn = $checkInDate.val();
        const checkOut = $checkOutDate.val();
        const adults = $adults.val();
        const children = $children.val() || 0;

        console.log(citta, checkIn, checkOut, adults, children);
    }

});
