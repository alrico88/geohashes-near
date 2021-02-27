/* eslint-disable @typescript-eslint/no-magic-numbers */
import getHashesNear from '../src/';
import distance from '@turf/distance';
import {point, Feature, Polygon} from '@turf/helpers';
import {decode} from 'ngeohash';

const bigMask: Feature<Polygon> = {
  'type': 'Feature',
  'properties': {},
  'geometry': {
    'type': 'Polygon',
    'coordinates': [
      [
        [
          -4.592285156249999,
          39.41497702499074,
        ],
        [
          -2.373046875,
          39.41497702499074,
        ],
        [
          -2.373046875,
          41.611335399441735,
        ],
        [
          -4.592285156249999,
          41.611335399441735,
        ],
        [
          -4.592285156249999,
          39.41497702499074,
        ],
      ],
    ],
  },
};

const smallMask: Feature<Polygon> = {
  'type': 'Feature',
  'properties': {},
  'geometry': {
    'type': 'Polygon',
    'coordinates': [
      [
        [
          -3.694667816162109,
          40.45465411266823,
        ],
        [
          -3.6927795410156246,
          40.45465411266823,
        ],
        [
          -3.6927795410156246,
          40.45648277516808,
        ],
        [
          -3.694667816162109,
          40.45648277516808,
        ],
        [
          -3.694667816162109,
          40.45465411266823,
        ],
      ],
    ],
  },
};

const coord = [-3.693636, 40.455438];
const radius = 500;
const units = 'meters';
const precision = 7;
const originCoord = {
  latitude: coord[1],
  longitude: coord[0],
};

const hashesNear = getHashesNear(
  originCoord,
  precision,
  radius,
  units
);

describe('Obtaining neighbouring geohashes', () => {
  it('Getting finite number of geohashes inside area', () => {
    expect(hashesNear.length).toBeLessThan(Infinity);
  });

  it('Resulting geohashes should be of desired length', () => {
    const [firstElement] = hashesNear;
    expect(firstElement.length).toBe(precision);
  });

  it('No resulting geohashes should be outside radius', () => {
    const origin = point(coord);
    const distanceConversion = 1000;
    const empty = 0;
    const outsideRadius = hashesNear.filter((d) => {
      const {latitude, longitude} = decode(d);
      const destination = point([longitude, latitude]);
      const dist
        = distance(origin, destination, {
          units: 'kilometers',
        }) * distanceConversion;
      return dist > radius;
    });
    expect(outsideRadius.length).toBe(empty);
  });
});

describe('Test masking radius with GeoJSON', () => {
  it('Should return the same geohashes in radios if mask is bigger than radios', () => {
    const hashesNearWithMask = getHashesNear(originCoord, precision, radius, units, bigMask.geometry);

    expect(hashesNearWithMask).toStrictEqual(hashesNear);
  });

  it('Should return the less geohashes in radios if mask is smaller than radios', () => {
    const hashesNearWithMask = getHashesNear(originCoord, precision, radius, units, smallMask.geometry);

    expect(hashesNearWithMask.length).toBeLessThan(hashesNear.length);
  });
});
