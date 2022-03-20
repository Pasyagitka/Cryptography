# area-divide

> Divide an area by the percentage.

[![Build Status](https://travis-ci.org/TCharts/area-divide.svg?branch=master)](https://travis-ci.org/TCharts/area-divide) [![Coverage Status](https://coveralls.io/repos/github/TCharts/area-divide/badge.svg)](https://coveralls.io/github/TCharts/area-divide)


## Usage

> **npm i --save area-divide**


```js
var areaDivide = require('area-divide');

var data = [0.4, 0.3, 0.3];
areaDivide(100, 50, data);

// will get array like below:
[{
  x1: 0,
  y1: 0,
  x2: 40,
  y2: 50,
}, {
  x1: 40,
   y1: 0,
  x2: 100,
  y2: 25,
}, {
  x1: 40,
  y1: 25,
  x2: 100,
  y2: 50,
}]
```


## License

ISC@[ProtoTeam](https://github.com/ProtoTeam).

