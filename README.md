# Find the closest zip codes

## Usage

### Node

    // Import
    var ZipCodes = require('./dist/index.js').ZipCodes;

    // Initialize with an array of zip codes
    // If no array is provided, it will search through every zip code in America
    zipCodes = new ZipCodes([14224, 14222, 14203, 14150, 14227, 75606]);

    // Find the 5 closest zip codes to any zip code
    console.log(zipCodes.closest(14224, 5))

## Development

### Installation

git clone https://github.com/akirchmyer/closest-zipcodes-by-location
npm install

### Create a new build

npm run build

### Pull down latest zip code data

npm run sync

## Sources

Zip Code Data: http://federalgovernmentzipcodes.us/
