/*
 * imgeo Search Functionality
 * File:         js_home.js
 * Author:       Laura Norman
 * Date:         2014-03-04
 * Description:  
 */

$(document).ready(function() {
	var initialize = function() {
		var mapOptions = {
		  zoom: 1,
		  mapTypeId: google.maps.MapTypeId.SATELLITE,
		  center: new google.maps.LatLng(0,0),
		  panControl: false,
		  scaleControl: false,
		  zoomControl: false
		};
		var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	}
	initialize();
});