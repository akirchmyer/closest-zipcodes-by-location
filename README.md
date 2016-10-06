# Find the closest zip codes

## Installation
git clone https://github.com/akirchmyer/closest-zipcodes-by-location
npm install

## Usage
`node closest_zips 14203 5`
Where the first argument is the zip code and the second argument is the # of closest zip codes to find.

NOTE: data/zip_codes.csv can be updated or replaced with a csv file formatted: ZIP,LAT,LNG

## Sources
Zip Code Data: https://gist.github.com/erichurst/7882666
Distance calculation algorithms: http://www.movable-type.co.uk/scripts/latlong.html
