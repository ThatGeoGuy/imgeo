/*
 * Unique Array Generator
 * File:         helpers.js
 * Author:       Laura Norman
 * Date:         2014-03-29
 * Description:  
 */

$(document).ready(function() {

	var unique = function(a1, a2, uniqueField){
	
		var new_Arr = a1.concat(a2);
		
		new_Arr.sort(uniqueField);
		
		for (var i = 1; i<new_Arr.length; i++){
			if(new_Arr[i][uniqueField] === new_Arr[i-1][uniqueField]){
				new_Arr.splice(i,1);			
			}
		}
		return new_Arr;
	}
	
	unique();
});
