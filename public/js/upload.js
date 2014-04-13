/*
 * IMGEO Upload page javascript file
 * File:         upload.js
 * Author:       Laura Norman
 * Date:         2014-03-04
 * Description:  Renders the map on the upload page. 
 */

$(document)
	.on('change', '.btn-file :file', function() {
		var input = $(this),
		numFiles = input.get(0).files ? input.get(0).files.length : 1,
		label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
		input.trigger('fileselect', [numFiles, label]);
});

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

	$('.btn-file :file').on('fileselect', function(event, numFiles, label) {
		
		var input = $(this).parents('.input-group').find(':text'),
			log = numFiles > 1 ? numFiles + ' files selected' : label;
		
		if( input.length ) {
			input.val(log);
		} else {
			if( log ) alert(log);
		}
		
	});
});
