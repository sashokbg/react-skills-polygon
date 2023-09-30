var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

export var Point = function () {
  function Point(x, y, value, text, isOuter, angle, radius) {
    _classCallCheck(this, Point);

    this.x = x;
    this.y = y;
    this.value = value;
    this.text = text;
    this.isOuter = !!isOuter;
    this.angle = angle;
    this.radius = radius;
  }

  _createClass(Point, [{
    key: "move",
    value: function move(newValue) {
      this.value = newValue;
      this.calculatePosition(this.angle, this.radius);
    }
  }, {
    key: "calculatePosition",
    value: function calculatePosition(angle, r) {
      this.angle = angle;
      this.radius = r;

      var sinX = Math.sin(angle * (Math.PI / 180)).toFixed(3);
      var sinY = Math.sin((90 - angle) * Math.PI / 180).toFixed(3);

      if (this.isOuter) {
        var x = sinX * r;
        var y = sinY * r;

        this.x = x;
        this.y = y;
      } else {
        var _x = sinX * r / 10 * this.value;
        var _y = sinY * r / 10 * this.value;

        this.x = _x;
        this.y = _y;
      }
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Point(this.x, this.y, this.value, this.text, this.isOuter, this.angle, this.radius);
    }
  }, {
    key: "findQuadrant",
    value: function findQuadrant() {
      var quadrant = void 0;
      if (this.x >= 0 && this.y >= 0) {
        quadrant = 1;
      }
      if (this.x >= 0 && this.y < 0) {
        quadrant = 2;
      }
      if (this.x < 0 && this.y < 0) {
        quadrant = 3;
      }
      if (this.x < 0 && this.y >= 0) {
        quadrant = 4;
      }

      return quadrant;
    }
  }, {
    key: "print",
    value: function print() {
      return "";
    }
  }, {
    key: "id",
    get: function get() {
      return this.x + "-" + this.y + this.value;
    }
  }]);

  return Point;
}();