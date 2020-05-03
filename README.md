# geohashes-near

Helper function to get all neighbouring geohashes inside a radius, from a given coordinate.

## Installation

Using npm: `npm i geohashes-near`

Using yarn: `yarn add geohashes-near`

## Usage

```javascript
const getHashesNear = require('geohash-near');

const position = { latitude: 40.455438, longitude: -3.693636 };
const radius = 20; // 20 meters
const units = 'meters';
const precision = 9;
const hashesInRadius = getHashesNear(position, precision, radius, units);

// hashesInRadius is ["ezjq5uwqk","ezjq5uwqm","ezjq5uwqj","ezjq5uwmv","ezjq5uwmu","ezjq5uwmg","ezjq5uwq5","ezjq5uwq7","ezjq5uwqs","ezjq5uwqt","ezjq5uwqh","ezjq5uwqe","ezjq5uwqw","ezjq5uwqq","ezjq5uwqn","ezjq5uwmy","ezjq5uwmw","ezjq5uwmt","ezjq5uwms","ezjq5uwme","ezjq5uwmd","ezjq5uwmf","ezjq5uwq4","ezjq5uwq6","ezjq5uwqd","ezjq5uwqu","ezjq5uwqv","ezjq5uwqg","ezjq5uwqy","ezjq5uwqf","ezjq5uwqx","ezjq5uwqr","ezjq5uwqp","ezjq5uwmz","ezjq5uwmx","ezjq5uwmr","ezjq5uwmq","ezjq5uwmm","ezjq5uwmk","ezjq5uwm7","ezjq5uwm6","ezjq5uwm3","ezjq5uwm9","ezjq5uwmc","ezjq5uwq1","ezjq5uwq3","ezjq5uwq9","ezjq5uwqc","ezjq5uww2","ezjq5uww0","ezjq5uwtb","ezjq5uwt8","ezjq5uwmn","ezjq5uwmj","ezjq5uwmh","ezjq5uwm5","ezjq5uwm4","ezjq5uwm1","ezjq5uwm2","ezjq5uwm8","ezjq5uwmb","ezjq5uwq0","ezjq5uwq2","ezjq5uwq8","ezjq5uww1","ezjq5uwtc","ezjq5uwjx","ezjq5uwjz","ezjq5uwnp","ezjq5uwnr"]
```

![Result](https://i.imgur.com/fd8QpwN.png)

## Functions

<dl>
<dt><a href="#isInRadius">isInRadius(from, to, radius, units)</a> ⇒ <code>boolean</code></dt>
<dd><p>Checks if destination point is inside radius</p>
</dd>
<dt><a href="#getHashesNear">getHashesNear(coord, precision, radius, units)</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Gets geohashes of a certain precision near the given coordinate</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Coord">Coord</a></dt>
<dd></dd>
</dl>

<a name="Units"></a>

## Units

**Kind**: global enum  
**Properties**

| Name       | Default                 |
| ---------- | ----------------------- |
| miles      | <code>miles</code>      |
| kilometers | <code>kilometers</code> |
| meters     | <code>meters</code>     |

<a name="isInRadius"></a>

## isInRadius(from, to, radius, units) ⇒ <code>boolean</code>

Checks if destination point is inside radius

**Kind**: global function  
**Returns**: <code>boolean</code> - Whether the point is inside radius

| Param  | Type                                                                                                     | Description                                       |
| ------ | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| from   | <code>Point</code>                                                                                       | Geographic point from                             |
| to     | <code>Point</code>                                                                                       | Geographic point to                               |
| radius | <code>number</code>                                                                                      | The radius in which to find neighboring geohashes |
| units  | <code>&#x27;miles&#x27;</code> \| <code>&#x27;kilometers&#x27;</code> \| <code>&#x27;meters&#x27;</code> | Units for radius                                  |

<a name="getHashesNear"></a>

## getHashesNear(coord, precision, radius, units) ⇒ <code>Array.&lt;string&gt;</code>

Gets geohashes of a certain precision near the given coordinate

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - Array of neighbouring geohashes in radius

| Param     | Type                                                                                                     | Description                                       |
| --------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| coord     | [<code>Coord</code>](#Coord)                                                                             | The central coordinate                            |
| precision | <code>number</code>                                                                                      | The geohash precision                             |
| radius    | <code>number</code>                                                                                      | The radius in which to find neighboring geohashes |
| units     | <code>&#x27;miles&#x27;</code> \| <code>&#x27;kilometers&#x27;</code> \| <code>&#x27;meters&#x27;</code> | Units for radius                                  |

<a name="Coord"></a>

## Coord

**Kind**: global typedef  
**Properties**

| Name      | Type                | Description          |
| --------- | ------------------- | -------------------- |
| latitude  | <code>number</code> | Coordinate latitude  |
| longitude | <code>number</code> | Coordinate longitude |
