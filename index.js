const {point} = require('@turf/helpers');
const {encode, decode, neighbors} = require('ngeohash');
const {default: distance} = require('@turf/distance');

/**
 * @enum
 */
const Units = {
  miles: 'miles',
  kilometers: 'kilometers',
  meters: 'meters',
};

/**
 * @typedef Coord
 * @property {number} latitude Coordinate latitude
 * @property {number} longitude Coordinate longitude
 */

/**
 * Checks if destination point is inside radius
 *
 * @param {Point} from Geographic point from
 * @param {Point} to Geographic point to
 * @param {number} radius The radius in which to find neighboring geohashes
 * @param {('miles'|'kilometers'|'meters')} units Units for radius
 * @returns {boolean} Whether the point is inside radius
 */
function isInRadius(from, to, radius, units) {
  const unitsToUse = units === Units.meters ? Units.kilometers : units;
  let dist = distance(from, to, {units: unitsToUse});
  if (units === Units.meters) {
    dist *= 1000;
  }
  return dist <= radius;
}

/**
 * Gets geohashes of a certain precision near the given coordinate
 *
 * @param {Coord} coord The central coordinate
 * @param {number} precision The geohash precision
 * @param {number} radius The radius in which to find neighboring geohashes
 * @param {('miles'|'kilometers'|'meters')} units Units for radius
 * @returns {string[]} Array of neighbouring geohashes in radius
 */
function getHashesNear(coord, precision, radius, units) {
  const {latitude, longitude} = coord;
  const origin = point([longitude, latitude]);
  const encodedOrigin = encode(latitude, longitude, precision);

  const checked = new Set();
  const toCheck = new Set();
  const valid = [];

  neighbors(encodedOrigin).forEach((hash) => {
    toCheck.add(hash);
  });

  while (toCheck.size > 0) {
    const [hash] = Array.from(toCheck);
    const {latitude: destLatitude, longitude: destLongitude} = decode(hash);
    const destination = point([destLongitude, destLatitude]);
    if (isInRadius(origin, destination, radius, units)) {
      valid.push(hash);
      neighbors(hash)
        .filter((d) => !checked.has(d))
        .forEach((neighbour) => {
          toCheck.add(neighbour);
        });
    }
    toCheck.delete(hash);
    checked.add(hash);
  }
  return valid;
}

module.exports = getHashesNear;
