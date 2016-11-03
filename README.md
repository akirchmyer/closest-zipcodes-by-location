# Closest Zip Codes By Location

Works for U.S. Zip Codes or Canadian Postal Codes.

## Installation

npm install

## Build

Create a minified script for production, which will also Convert csv files for US Zip Codes, Canadian Postal Codes into json files to include in the script:

    npm run build

## Usage

Call getClosestZipCodes:
    ZipCodeSearch.getClosestZipCodes(90210, 10, 100); // zip code, # of results, distance

## Data

US Zip Codes: https://www.aggdata.com/node/86
Canadian Postal Codes: https://www.aggdata.com/free/canada-postal-codes
