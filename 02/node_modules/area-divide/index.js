/**
 * Created by hustcc.
 * Contract: i@hust.cc
 */

var round = require('fixed-round');
/**
 * 通过 data 数据划分 width，height 的数组
 * 最后返回一个瓜分的数组
 * @param width
 * @param height
 * @param data
 [0.4, 0.3, 0.3]
 *
 * @returns {Array}
 * @constructor
 *
 *  +-------------------+------------+
 *  |                   |    B:10%   |
 *  |                   |            |
 *  |                   |------------+
 *  |       A:75%       |            |
 *  |                   |    C:20%   |
 *  |                   |            |
 *  +-------------------+------------+
 *
 */
function areaDivide(width, height, data, fixed) {
  data.sort(function(x, y) {
    return y - x; // 按照 percent 降序
  });

  var area = [width, height];
  var divides = [];
  var len = data.length - 1; // 最后一个不需要遍历

  var v, p;
  var x = 0,
    y = 0; // 原点
  var t = 1;

  for (var i = 0; i < len; i ++) {
    v = data[i];

    if (i % 2 === 0) {
      p = {
        x1: x,
        y1: y,
        x2: x + round(area[0] * v / t, fixed),
        y2: height,
      };

      x = p.x2;
      area = [area[0] - x, area[1]]
    } else {
      p = {
        x1: x,
        y1: y,
        x2: width,
        y2: y + round(area[1] * v / t, fixed),
      };

      y = p.y2;
      area = [area[0], area[1] - y]
    }
    divides.push(p);

    t -= v;
  }
  // 最后一个元素就是剩下所有的面积
  divides.push({
    x1: x,
    y1: y,
    x2: width,
    y2: height,
  });
  return divides;
}

module.exports = areaDivide;
