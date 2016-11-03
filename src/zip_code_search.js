(function() {

	function pad(s, size) {
		while (s.length < size) s = "0" + s;
		return s;
	}

	/** Extend Number object with method to convert numeric degrees to radians */
	if (Number.prototype.toRadians === undefined) {
	    Number.prototype.toRadians = function() { return this * Math.PI / 180; };
	}

	/**
	 * Creates a LatLon point on the earth's surface at the specified latitude / longitude.
	 *
	 * @constructor
	 * @param {number} lat - Latitude in degrees.
	 * @param {number} lon - Longitude in degrees.
	 *
	 * @example
	 *     var p1 = new LatLon(52.205, 0.119);
	 */
	function LatLon(lat, lon) {
	    // allow instantiation without 'new'
	    if (!(this instanceof LatLon)) return new LatLon(lat, lon);

	    this.lat = Number(lat);
	    this.lon = Number(lon);
	}


	/**
	 * Returns the distance from ‘this’ point to destination point (using haversine formula).
	 *
	 * @param   {LatLon} point - Latitude/longitude of destination point.
	 * @param   {number} [radius=6371e3] - (Mean) radius of earth (defaults to radius in metres).
	 * @returns {number} Distance between this point and destination point, in same units as radius.
	 *
	 * @example
	 *     var p1 = new LatLon(52.205, 0.119);
	 *     var p2 = new LatLon(48.857, 2.351);
	 *     var d = p1.distanceTo(p2); // 404.3 km
	 */
	LatLon.prototype.distanceTo = function(point, radius) {
	    if (!(point instanceof LatLon)) throw new TypeError('point is not LatLon object');
	    radius = (radius === undefined) ? 6371e3 : Number(radius);

	    var R = radius;
	    var LAT1 = this.lat.toRadians(),  LNG1 = this.lon.toRadians();
	    var LAT2 = point.lat.toRadians(), LNG2 = point.lon.toRadians();
	    var DIFFLAT = LAT2 - LAT1;
	    var DIFFLNG = LNG2 - LNG1;

	    var a = Math.sin(DIFFLAT/2) * Math.sin(DIFFLAT/2)
		  + Math.cos(LAT1) * Math.cos(LAT2)
		  * Math.sin(DIFFLNG/2) * Math.sin(DIFFLNG/2);
	    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	    var d = R * c;

	    return d;
	};

	window.ZipCodeSearch = {
		getClosestZipCodes: function(zip, count, dist) {
			var selected, zips;
			zip = String(zip);

			// Truncate postal codes
			if (isNaN(parseInt(zip.charAt(0), 10))) {
				// Canada
				zip = String(zip.slice(0, 3));
				selected = window.ZipCodeSearch.ca_zips.find(function(z) {
					var data = z.split(':');
					return zip.toLowerCase() === data[0].toLowerCase();
				});
				zips = this.getAllCAZipCodes()
			}
			else {
				// U.S.
				zip = String(zip.slice(0, 5));
				selected = window.ZipCodeSearch.us_zips.find(function(z) {
					var data = z.split(':');
					return zip === pad(data[0], 5);
				});
				zips = this.getAllUSZipCodes()
			}

			if (!selected) {
				return [];
			}

			selected = selected.split(':');
			selected = LatLon(selected[1], selected[2]);

			zips.forEach(function(zip){
				latlon = LatLon(zip.latitude, zip.longitude)
				zip.dist = latlon.distanceTo(selected);
			});

			if (dist && parseInt(dist, 10)) {
				zips = zips.filter(function(zip) {
					return zip.dist < parseInt(dist, 10) * 1609.34; // miles to meters
				});
			}

			zips.sort(function(a, b) {
				return a.dist - b.dist;
			});

			return zips.slice(0, count);
		},
		getAllUSZipCodes: function() {
			return this.us_zips.map(function(zip) {
				zip = zip.split(':');
				return {
					zip: zip[0],
					latitude: zip[1],
					longitude: zip[2]
				}
			});
		},
		getAllCAZipCodes: function() {
			return this.ca_zips.map(function(zip) {
				zip = zip.split(':');
				return {
					zip: zip[0],
					latitude: zip[1],
					longitude: zip[2]
				}
			});
		}
	};

}());
