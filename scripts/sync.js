"use strict";

const Converter = require("csvtojson").Converter;
const converter = new Converter({ constructResult: false })
const del = require('del');
const fs = require('fs');

const url = 'http://federalgovernmentzipcodes.us/free-zipcode-database-Primary.csv';
 
// Delete the old json file
del.sync(['src/zip_codes.json']);

let stream = fs.createWriteStream('src/zip_codes.json');
let locations = [];

converter
	.on("record_parsed", (loc) => {
		// Write each record to the json file
		if (loc.Zipcode && loc.Lat && loc.Long) {
			locations.push({ zip: loc.Zipcode, latitude: loc.Lat, longitude: loc.Long});
		}
	})
	.on("end_parsed", () => {
		stream.write(JSON.stringify(locations));
		stream.end();
	});
  
// Pipe zip code csv file from the web to the json converter
require("request").get(url).pipe(converter);
