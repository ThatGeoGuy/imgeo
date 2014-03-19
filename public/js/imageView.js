/*
 * IMGEO image view page map display
 * File:         imgeoSearch.js
 * Author:       Jeremy Steward
 * Date:         2014-02-20 @ 13:34:55
 * Description:  Renders the map for the image view pages
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
