"use strict";

import geolib from 'geolib';
import fs from 'fs';

export default class ZipCodes {

	constructor(zips) {
		this.defaultLocations = JSON.parse(fs.readFileSync('./dist/zip_codes.json', 'utf8'));
		this.locations = this.defaultLocations;

		if (zips && zips.length) {
			this.set(zips);
		}
	}

	all() {
		return defaultLocations;
	}

	set(zips) {
		if (zips && zips.length) {
			this.locations = this.defaultLocations.filter((loc) => {
				return zips.indexOf(loc.zip) >= 0;
			});
		}
	}

	closest(zip, count) {
		let selected = this.locations.find((loc) => {
			return loc.zip === zip;
		});
		return geolib.orderByDistance(selected, this.locations).slice(0, count );
	}
}
