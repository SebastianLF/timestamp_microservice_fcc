'use strict';

var path = process.cwd();
var moment = require("moment");

module.exports = function (app) {

	function unixToTimestamp(date) {
		return moment.unix(date).format('LL');
	}

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

		
	app.route('/:date')
		.get(function(req, res) {
			var date = req.params.date;
			var dateObject = {};
			if(!isNaN(date)){
				dateObject = {unix: date, natural: unixToTimestamp(date)};
			}
			else if(moment(date).isValid()){
				dateObject = {unix: moment(date).unix(), natural: date};
			}else{
				dateObject = {unix: null, natural: null};
			}
			res.json(dateObject);
		});	
};
