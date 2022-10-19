import React, {Component} from "react";

const FONT_RATIO = 0.6;

export class PointLabel extends Component {
  constructor(props) {
    super(props);

    this.fontSize = this.props.fontSize ? this.props.fontSize : this.fontSize = 18;
    this.fontColor = this.props.fontColor ? this.props.fontColor : 'black';
  }

  get point() {
    return this.props.point;
  }

  render() {
    if (!this.point.isOuter) {
      return <></>
    }

    const x = this.point.x;
    const y = this.point.y;
    let textXOffset = 0;
    let textYOffset = 0;

    switch (this.point.findQuadrant()) {
      case 1:
        textYOffset = 20;
        break;
      case 2:
        textYOffset = -5;
        break;
      case 3:
        textXOffset = -this.point.text?.length * this.fontSize * FONT_RATIO - 10;
        break;
      case 4:
        textXOffset = -this.point.text?.length * this.fontSize * FONT_RATIO - 10;
        textYOffset = 30;
        break;
    }

    return <text key={`${this.point.id}-${x}-${y}-text`}
                 fontSize={this.fontSize + "px"}
                 fontFamily="monospace"
                 x={x + textXOffset}
                 y={y + textYOffset}
                 fill={this.fontColor}>
      {this.point.text}
    </text>;
  }
}
