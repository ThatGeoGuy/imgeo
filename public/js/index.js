/*
 * imgeo Search Functionality
 * File:         js_home.js
 * Author:       Laura Norman
 * Date:         2014-03-04
 * Description:  
 */

$(document).ready(function() {
	var map,
		marker,
		latitude,
		longitude; 

	var addMarkerToPoint = function(latLng) { 
		if(marker) { 
			marker.setMap(null); 
		}

		latitude = latLng.lat().toString();
		longitude = latLng.lng().toString();
		var address = longitude + " " + latitude;
		var geocoder = new google.maps.Geocoder(); 
		$('#search-bar-home').val(address); 
		marker = new google.maps.Marker({ 
			'position': latLng,
			'map': map,
			'title': address
		});
	}

	var initialize = function() {
		var mapOptions = {
		  zoom: 1,
		  mapTypeId: google.maps.MapTypeId.TERRAIN,
		  center: new google.maps.LatLng(0,0),
		  panControl: false,
		  scaleControl: false,
		  zoomControl: false,
		  mapTypeControl: false,
		  streetViewControl: false
		};
		map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
		google.maps.event.addListener(map, 'click', function(event) { 
			addMarkerToPoint(event.latLng);
		});
	}
	initialize();
});
