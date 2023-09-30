var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

export var Polygon = function () {
  function Polygon(points) {
    _classCallCheck(this, Polygon);

    this.points = [];

    this.points = points;
  }

  _createClass(Polygon, [{
    key: "calculatePointPositions",


    /**
     * Calculate positions of the points given a radius
     * @param radius
     */
    value: function calculatePointPositions(radius) {
      var n = this.points.length;

      var outerPoints = [];

      for (var i = 0; i < n; i++) {
        var currentPoint = this.points[i];
        currentPoint.calculatePosition(i * 360 / n, radius);

        var outerPoint = this.points[i].clone();
        outerPoint.isOuter = true;

        outerPoint.calculatePosition(i * 360 / n, radius);
        currentPoint.outerPoint = outerPoint;
        outerPoints.push(outerPoint);
      }

      return outerPoints;
    }
  }, {
    key: "outerPoints",
    get: function get() {
      return this.points.map(function (p) {
        return p.outerPoint;
      });
    }
  }]);

  return Polygon;
}();