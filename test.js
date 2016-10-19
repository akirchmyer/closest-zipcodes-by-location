// Import
var ZipCodes = require('./dist/index.js');

// Initialize with an array of zip codes
// If no array is provided, it will search through every zip code in America
console.log(ZipCodes)
zipCodes = new ZipCodes([14224, 14222, 14203, 14150, 14227, 75606]);

// Find the 5 closest zip codes to any zip code
console.log(zipCodes.closest(14224, 5))
