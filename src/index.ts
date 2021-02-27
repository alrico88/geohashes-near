import {Feature, MultiPolygon, point, Point, Polygon, Units} from '@turf/helpers';
import {encode, decode, neighbors, decode_bbox} from 'ngeohash';
import distance from '@turf/distance';
import isPointInPolygon from '@turf/boolean-point-in-polygon';

/**
 * Units enum
 * @enum {number}
 */
enum UnitsEnum {
  Kilometers = 'kilometers',
  Meters = 'meters',
}

export type Coord = {
  latitude: number;
  longitude: number;
};

/**
 * Checks if destination point is inside radius
 *
 * @param {Point} from Geographic point from
 * @param {Feature<Point>} to Geographic point to
 * @param {number} radius The radius in which to find neighboring geohashes
 * @param {Units} units Units for radius
 * @returns {boolean} Whether the point is inside radius
 */
function isInRadius(from: Feature<Point>, to: Feature<Point>, radius: number, units: Units): boolean {
  const unitsToUse = units === UnitsEnum.Meters ? UnitsEnum.Kilometers : units;

  let dist = distance(from, to, {units: unitsToUse});
  if (units === UnitsEnum.Meters) {
    const kilometersToMeters = 1000;
    dist *= kilometersToMeters;
  }

  return dist <= radius;
}

/**
 * Checks if geohash is inside masking shape
 *
 * @param {string} geohash Geohash to check
 * @param {Polygon | MultiPolygon} mask GeoJSON to see if geohash is inside of
 * @return {boolean} Whether the geohash is inside mask
 */
function isInMask(geohash: string, mask: Polygon | MultiPolygon): boolean {
  const [minLon, minLat, maxLon, maxLat] = decode_bbox(geohash);
  const centroid = decode(geohash);

  const points = [[minLon, minLat], [minLon, maxLat], [maxLon, minLat], [maxLon, maxLat], [centroid.longitude, centroid.latitude]];

  const isInside = false;

  for (const [longitude, latitude] of points) {
    if (isPointInPolygon([longitude, latitude], mask, {ignoreBoundary: true})) {
      return true;
    }
  }

  return isInside;
}

/**
 * Gets geohashes of a certain precision near the given coordinate
 *
 * @param {Coord} coord The central coordinate
 * @param {number} precision The geohash precision
 * @param {number} radius The radius in which to find neighboring geohashes
 * @param {('miles'|'kilometers'|'meters')} units Units for radius
 * @param {Feature<Polygon | MultiPolygon>} [maskPolygon] Polygon to use as mask to filter geohashes by their centroid
 * @returns {string[]} Array of neighbouring geohashes in radius
 */
export default function getHashesNear(coord: Coord, precision: number, radius: number, units: Units, maskPolygon?: Polygon | MultiPolygon): string[] {
  const {latitude: originLatitude, longitude: originLongitude} = coord;
  const origin = point([originLongitude, originLatitude]);
  const encodedOrigin = encode(originLatitude, originLongitude, precision);

  const checked: Set<string> = new Set();
  const toCheck: Set<string> = new Set();
  const valid: string[] = [];

  neighbors(encodedOrigin).forEach((hash) => {
    toCheck.add(hash);
  });

  function finishedWithHash(hash: string): void {
    toCheck.delete(hash);
    checked.add(hash);
  }

  function proceedWithLoop(hash: string, latitude: number, longitude: number): void {
    const destination = point([longitude, latitude]);
    if (isInRadius(origin, destination, radius, units)) {
      valid.push(hash);
      neighbors(hash)
        .filter((d) => !checked.has(d))
        .forEach((neighbour) => {
          toCheck.add(neighbour);
        });
    }
    finishedWithHash(hash);
  }

  const empty = 0;

  while (toCheck.size > empty) {
    const iterator = toCheck.keys();
    const hash = iterator.next().value;
    const {latitude, longitude} = decode(hash);
    if (maskPolygon) {
      const passesCheck = isInMask(hash, maskPolygon);
      if (passesCheck) {
        proceedWithLoop(hash, latitude, longitude);
      } else {
        finishedWithHash(hash);
      }
    } else {
      proceedWithLoop(hash, latitude, longitude);
    }
  }

  return valid;
}
