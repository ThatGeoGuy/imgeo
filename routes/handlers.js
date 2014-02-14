/* 
 * ENGO 551 - IMGEO Project
 * File        : routes/handlers.js
 * Author      : Jeremy Steward
 * Date        : 2014-02-14 @ 14:00:24
 * Description : Implements the request handlers for each page on the server
 */

module.exports = { 
	// Index function for root of site
	index : function(req, res) {
		res.render('index', { "title": "THIS IS A TITLE", });
	}
}
