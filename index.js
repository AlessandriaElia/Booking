"use strict"
$(document).ready(function() {

    const selectCitta = $('.form-control[required]');
    const btnCerca = $("#btnCerca");

    let rq = inviaRichiesta("GET", "server/getCitta.php");
    rq.catch(errore);
    rq.then(function({data}){
        console.log(data);        
        data.forEach(citta => {
            const option = $("<option>").val(citta["id"]).text(citta["citta"]);
            option.appendTo(selectCitta);
        });
    })

    btnCerca.on("click", cercaHotel);

    function cercaHotel(){
        alert("CIAO CARA");
    }

})