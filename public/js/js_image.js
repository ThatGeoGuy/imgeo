/*
 * imgeo Search Functionality
 * File:         imgeoSearch.js
 * Author:       Jeremy Steward
 * Date:         2014-02-20 @ 13:34:55
 * Description:  Provides the functionality for the search bar on the home page and in the navbar on other pages
 */

$(document).ready(function() {
	var initialize = function() {
		var mapOptions = {
		  zoom: 2,
		  mapTypeId: google.maps.MapTypeId.SATELLITE,
		  center: new google.maps.LatLng(39,-36),
		  panControl: false,
		  scaleControl: false,
		  zoomControl: false
		};
		var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	}
	initialize();
});
