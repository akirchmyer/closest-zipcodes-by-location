console.log('Building Final Script File...')
var fs = require("fs");

var file_contents =  fs.readFileSync("src/zip_code_search.js");
var us_zips =  fs.readFileSync("dist/us_zips.json");
var ca_zips =  fs.readFileSync("dist/ca_zips.json");

fs.writeFile('dist/zip_code_search.js', 
	file_contents + `
	window.ZipCodeSearch.us_zips = ` + us_zips + `.split('|');
	window.ZipCodeSearch.ca_zips = ` + ca_zips + `.split('|');`
);
