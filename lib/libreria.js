"use strict";

const _URL = ""      // "http://localhost/4B"
// Se vuota viene assegnata in automatico l'origine da cui è stata scaricata la pagina

const MAPS_URL = "https://maps.googleapis.com/maps/api/js"
const JSONSERVER_URL = "http://localhost:3000"

function inviaRichiesta(method, url, parameters={}) {
	let config={
		"baseURL":_URL,
		"url":  url, 
		"method": method.toUpperCase(),
		"headers": {
			"Accept": "application/json",
		},
		"timeout": 5000,
		"responseType": "json",
	}
	if(parameters instanceof FormData){
		// i parametri rimangono così come sono e vengono inseriti nel body della http request
		config.headers["Content-Type"]='multipart/form-data;' 
		config["data"]=parameters     // Accept FormData, File, Blob
	}	
	else if(method.toUpperCase()=="GET"){
		// i parametri vengono convertiti in URL-Encoded e vengono accodati alla URL
	    config.headers["Content-Type"]='application/x-www-form-urlencoded;charset=utf-8' 
	    config["params"]=parameters   
	}
	else{
		// i parametri vengono convertiti in URL-Encoded ed inseriti nel body della http request
		// Nel caso di PHP, i parametri POST devono essere convertiti in URL_Encoded
		// Nel caso di json-server e nodejs, i parametri POST possono essere trasmessi in json serializzato		
	    config.headers["Content-Type"] = 'application/x-www-form-urlencoded;charset=utf-8' 
		//config.headers["Content-Type"] = 'application/json; charset=utf-8' 
		config["data"]=parameters    
	}	
	return axios(config)             
}

function errore(err) {
	if(!err.response) 
		alert("Connection Refused or Server timeout");	
	else if (err.response.status == 200)
        alert("Formato dei dati non corretto : " + err.response.data);
    else{
        alert("Server Error: " + err.response.status + " - " + err.response.data);
	}
}

function caricaGoogleMaps(){
	let promise =  new Promise(function(resolve, reject){
		var script = document.createElement('script');
		script.type = 'text/javascript';
		//script.src = MAPS_URL + '?v=3&loading=async&callback=caricamentoEseguito&key=' + MAP_KEY
		  script.src = MAPS_URL + '?v=3&key=' + MAP_KEY;
		document.body.appendChild(script);
		script.onload = function(){
			resolve()
		}
		script.onerror = function (){
			console.log("Errore caricamento GoogleMaps")
		    reject("Errore caricamento GoogleMaps")
		}
	})
	return promise
}

