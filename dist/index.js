"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ZipCodes = undefined;

var _geolib = require('geolib');

var _geolib2 = _interopRequireDefault(_geolib);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ZipCodes = exports.ZipCodes = function ZipCodes(zips) {
	_classCallCheck(this, ZipCodes);

	_initialiseProps.call(this);

	this.defaultLocations = JSON.parse(_fs2.default.readFileSync('./dist/zip_codes.json', 'utf8'));
	this.locations = this.defaultLocations;

	if (zips && zips.length) {
		this.set(zips);
	}
};

var _initialiseProps = function _initialiseProps() {
	var _this = this;

	this.defaultLocations = null;
	this.locations = null;

	this.all = function () {
		return defaultLocations;
	};

	this.set = function (zips) {
		if (zips && zips.length) {
			_this.locations = _this.defaultLocations.filter(function (loc) {
				return zips.indexOf(loc.zip) >= 0;
			});
		}
	};

	this.closest = function (zip, count) {
		var selected = _this.locations.find(function (loc) {
			return loc.zip === zip;
		});
		return _geolib2.default.orderByDistance(selected, _this.locations).slice(0, count);
	};
};