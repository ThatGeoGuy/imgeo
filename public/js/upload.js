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
	var map; 
	var marker; 
	var latitude; 
	var longitude;
	var addMarkerToPoint = function(latLng) { 
		if(marker) { 
			marker.setMap(null); 
		}

		latitude = latLng.lat().toString();
		longitude = latLng.lng().toString();
		var address = longitude + " " + latitude;
		var geocoder = new google.maps.Geocoder(); 
		geocoder.geocode({'latLng': latLng}, function(results, status) { 
			if(status === google.maps.GeocoderStatus.OK) { 
				if(results[1]) { 
					address = results[1].formatted_address; 
				}
			}
			$('#location').val(address); 

			marker = new google.maps.Marker({ 
				'position': latLng,
				'map': map,
				'title': address
			});
		}); 
	}

	var initialize = function() {
		var mapOptions = {
		  zoom: 1,
		  mapTypeId: google.maps.MapTypeId.ROADMAP,
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


	$('.btn-file :file').on('fileselect', function(event, numFiles, label) {
		
		var input = $(this).parents('.input-group').find(':text'),
			log = numFiles > 1 ? numFiles + ' files selected' : label;
		
		if( input.length ) {
			input.val(log);
		} else {
			if( log ) alert(log);
		}
		
	});

	$('#location').change(function() {
		var locationArray = $(this).val().match(new RegExp(/(-?\d+)\.?(\d+)/g)); 
		if(locationArray.length !== 2) { 
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({ 'address': $(this).val() }, function(result, status) { 
				if(status === google.maps.GeocoderStatus.OK) { 
					latitude = results[0].geometry.location.lat().toString(); 
					longitude = results[0].geometry.location.lng().toString(); 
				} else { 
					latitude = undefined;
					longitude = undefined; 
					$('#location').val(''); 
				} 
			});
		}
	}); 

	$('#upload-form').submit(function(e) { 
		var tagList = $('#tags').val().trim();
		$('#tags').val(tagList.split(', ').join(',').split(' ').join('_')); 
		$('#location').val(longitude + " " + latitude); 

		if(latitude === undefined || longitude === undefined) { 
			$('#location').val(''); 
			alert("Location was invalid. Please try again"); 
			e.preventDefault();
		} 

	});


});
