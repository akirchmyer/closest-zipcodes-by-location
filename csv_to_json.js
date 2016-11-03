var Converter = require("csvtojson").Converter;
var us_converter = new Converter({});
var ca_converter = new Converter({});

var fs = require('fs');
var del = require('del');

del.sync(['dist/us_zips.json', 'dist/ca_zips.json']);
var us_file = fs.createWriteStream('dist/us_zips.json');
var ca_file = fs.createWriteStream('dist/ca_zips.json');

function pad(s, size) {
	while (s.length < size) s = "0" + s;
	return s;
}

var us_coords, ca_coords;

// GET US ZIP CODES
us_converter.on("end_parsed", function (coords) {
	us_coords = coords.map(function(c) {
		return c['Postal Code'] + ':' + parseFloat(c['Latitude'], 10).toFixed(1) + ':' + parseFloat(c['Longitude'], 10).toFixed(1);
	});
	console.log('Saving US Zips JSON')
	us_file.write(JSON.stringify(us_coords.join('|')));
	us_file.end();

	// GET CANADIAN POSTAL CODES
	ca_converter.on("end_parsed", function (coords) {
		ca_coords = coords.map(function(c) {
			return c['Postal Code'] + ':' + parseFloat(c['Latitude'], 10).toFixed(1) + ':' + parseFloat(c['Longitude'], 10).toFixed(1);
		});
		console.log('Saving CA Zips JSON')
		ca_file.write(JSON.stringify(ca_coords.join('|')));
		ca_file.end();
	});
	console.log('Reading CA Zips...');
	require("fs").createReadStream("./src/ca_postal.csv").pipe(ca_converter);
});
console.log('Reading US Zips...');
require("fs").createReadStream("./src/us_zips.csv").pipe(us_converter);


