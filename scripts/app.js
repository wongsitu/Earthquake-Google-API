// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

$(document).ready(function() {
  console.log("Let's get coding!");

  $.ajax({

	method: "GET",

	url: weekly_quakes_endpoint,

	success: onSuccess,

	error: onError
});

function onSuccess(json) {
  var mapHere = displayMap();
  for (var i =0;i<json.features.length ;i++){
    var earthquake = json.features[i].properties.title;
    var lati = json.features[i].geometry.coordinates[0];
    var long = json.features[i].geometry.coordinates[1];
    $("#info").append(`<p>${earthquake} | Location: ${lati},${long}</p>`);
    var coords = {};
    coords.lat = long;
    coords.lng = lati;
    initMap(coords,mapHere);
  }
}

function onError(xhr, status, errorThrown) {
	alert("Sorry, there was a problem!");
	console.log("Error: " + errorThrown);
	console.log("Status: " + status);
	console.dir(xhr);
}

function initMap(coords,val) {
  var location = coords;

  var marker = new google.maps.Marker({
    position: location,
    map: val,
    title: 'Hello World!',
    // icon: "../scripts/images/earthquake.png"
  });
}

function displayMap(){
  var mapHere = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.78, lng: -122.44},
    zoom: 3
  });
  return mapHere;
}

});
