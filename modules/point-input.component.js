var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";

export var PointInputComponent = function (_Component) {
  _inherits(PointInputComponent, _Component);

  function PointInputComponent(props) {
    _classCallCheck(this, PointInputComponent);

    return _possibleConstructorReturn(this, (PointInputComponent.__proto__ || Object.getPrototypeOf(PointInputComponent)).call(this, props)); // Properties are read only
  }

  _createClass(PointInputComponent, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "div",
        null,
        React.createElement("input", { type: "number", value: this.props.point.value,
          onChange: function onChange(e) {
            return _this2.props.handler(e);
          }, placeholder: "Value 1-10" }),
        React.createElement("input", { type: "text", value: this.props.point.text,
          onChange: function onChange(e) {
            return _this2.props.handler(e);
          }, placeholder: "Text" }),
        React.createElement(
          "button",
          { onClick: function onClick() {
              return _this2.delete();
            } },
          "Delete"
        )
      );
    }
  }, {
    key: "delete",
    value: function _delete() {
      this.props.onDelete(this.props.point);
    }
  }]);

  return PointInputComponent;
}(Component);