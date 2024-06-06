"use strict"
$(document).ready(function() {
    // Popola il listbox dei comuni con alcuni comuni italiani
    const comuni = [
        "Roma",
        "Milano",
        "Napoli",
        "Torino",
        "Palermo",
        "Genova",
        "Bologna",
        "Firenze",
        "Bari",
        "Catania"
    ];

    comuni.forEach(comune => {
        $("#lstComune").append(new Option(comune, comune));
    });
    $("#lstComune").prop("selectedIndex", -1);

    $("#btnInvia").on("click", function() {
        let isValid = true;
        let errorMessage = "";

        $(".form-control").each(function() {
            if ($(this).attr("type") === "text" || $(this).attr("type") === "password") {
                if ($(this).val().trim() === "") {
                    isValid = false;
                    errorMessage += `Il campo ${$(this).attr("placeholder")} è obbligatorio.\n`;
                }
            }
        });

        const password = $("#txtPassword").val();
        const confermaPassword = $("#txtConfermaPassword").val();
        
        if (password !== confermaPassword) {
            isValid = false;
            errorMessage += "Le password non coincidono.\n";
        }

        if (!isValid) {
            alert(errorMessage);
        } else {
            let name = $("#txtNome").val();
            let cognome = $("#txtCognome").val();
            let username = `${name} ${cognome}` 
            let psw = CryptoJS.MD5($("#txtPassword").val()).toString();
            let citta = $("#lstComune").val();
            let imgProfilo = `${name}${cognome}.jpg` 
            console.log(username, psw, imgProfilo, citta);
            let rq = inviaRichiesta("GET", "server/inserisciUtente.php", {username, psw, imgProfilo, citta})
            rq.catch(errore);
            rq.then(function({data}){
                alert("Registrazione avvenuta con successo");
                window.location.href = "login.html"
            })
        }
    });
});