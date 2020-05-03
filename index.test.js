const getHashesNear = require('./index');
const {default: distance} = require('@turf/distance');
const {point} = require('@turf/helpers');
const {decode} = require('ngeohash');

describe('Obtaining neighbouring geohashes', () => {
  const coord = [-3.693636, 40.455438];
  const radius = 500;
  const units = 'meters';
  const precision = 7;
  const hashesNear = getHashesNear(
    {
      latitude: coord[1],
      longitude: coord[0],
    },
    precision,
    radius,
    units
  );

  test('Getting finite number of geohashes inside area', () => {
    expect(hashesNear.length).toBeLessThan(Infinity);
  });

  test('Resulting geohashes should be of desired length', () => {
    expect(hashesNear[0].length).toBe(precision);
  });

  test('No resulting geohashes should be outside radius', () => {
    const origin = point(coord);
    const outsideRadius = hashesNear.filter((d) => {
      const {latitude, longitude} = decode(d);
      const destination = point([longitude, latitude]);
      const dist =
        distance(origin, destination, {
          units: 'kilometers',
        }) * 1000;
      return dist > radius;
    });
    expect(outsideRadius.length).toBe(0);
  });
});
