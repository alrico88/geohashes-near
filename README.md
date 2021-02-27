# geohashes-near

Helper function to get all neighbouring geohashes inside a radius, from a given coordinate.

## Installation

Using npm: `npm i geohashes-near`

Using yarn: `yarn add geohashes-near`

## Usage

Fist import the module

### In a CommonJS env

```javascript
const getHashesNear = require('geohashes-near');
```

### Using ES imports

```javascript
import getHashesNear from 'geohashes-near';
```

And then run the function

```javascript
const position = { latitude: 40.455438, longitude: -3.693636 };
const radius = 20; // 20 meters
const units = 'meters';
const precision = 9;
const hashesInRadius = getHashesNear(position, precision, radius, units);

// hashesInRadius is ["ezjq5uwqk","ezjq5uwqm","ezjq5uwqj","ezjq5uwmv","ezjq5uwmu","ezjq5uwmg","ezjq5uwq5","ezjq5uwq7","ezjq5uwqs","ezjq5uwqt","ezjq5uwqh","ezjq5uwqe","ezjq5uwqw","ezjq5uwqq","ezjq5uwqn","ezjq5uwmy","ezjq5uwmw","ezjq5uwmt","ezjq5uwms","ezjq5uwme","ezjq5uwmd","ezjq5uwmf","ezjq5uwq4","ezjq5uwq6","ezjq5uwqd","ezjq5uwqu","ezjq5uwqv","ezjq5uwqg","ezjq5uwqy","ezjq5uwqf","ezjq5uwqx","ezjq5uwqr","ezjq5uwqp","ezjq5uwmz","ezjq5uwmx","ezjq5uwmr","ezjq5uwmq","ezjq5uwmm","ezjq5uwmk","ezjq5uwm7","ezjq5uwm6","ezjq5uwm3","ezjq5uwm9","ezjq5uwmc","ezjq5uwq1","ezjq5uwq3","ezjq5uwq9","ezjq5uwqc","ezjq5uww2","ezjq5uww0","ezjq5uwtb","ezjq5uwt8","ezjq5uwmn","ezjq5uwmj","ezjq5uwmh","ezjq5uwm5","ezjq5uwm4","ezjq5uwm1","ezjq5uwm2","ezjq5uwm8","ezjq5uwmb","ezjq5uwq0","ezjq5uwq2","ezjq5uwq8","ezjq5uww1","ezjq5uwtc","ezjq5uwjx","ezjq5uwjz","ezjq5uwnp","ezjq5uwnr"]
```

![Result](https://i.imgur.com/fd8QpwN.png)

## Table of contents

### Type aliases

- [Coord](#coord)

### Functions

- [default](#default)

## Type aliases

### Coord

Ƭ **Coord**: _object_

#### Type declaration:

| Name        | Type     |
| :---------- | :------- |
| `latitude`  | _number_ |
| `longitude` | _number_ |

Defined in: index.ts:15

## Functions

### default

▸ **default**(`coord`: [_Coord_](#coord), `precision`: _number_, `radius`: _number_, `units`: Units, `maskPolygon?`: Polygon \| MultiPolygon): _string_[]

Gets geohashes of a certain precision near the given coordinate

#### Parameters:

| Name           | Type                    | Description                                                  |
| :------------- | :---------------------- | :----------------------------------------------------------- |
| `coord`        | [_Coord_](#coord)       | The central coordinate                                       |
| `precision`    | _number_                | The geohash precision                                        |
| `radius`       | _number_                | The radius in which to find neighboring geohashes            |
| `units`        | Units                   | Units for radius                                             |
| `maskPolygon?` | Polygon \| MultiPolygon | Polygon to use as mask to filter geohashes by their centroid |

**Returns:** _string_[]

Array of neighbouring geohashes in radius

Defined in: index.ts:75
