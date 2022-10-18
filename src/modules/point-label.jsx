import React, {Component} from "react";

export class PointLabel extends Component {
  constructor(props) {
    super(props);
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
    let fontSize = 18;

    switch (this.point.findQuadrant()) {
      case 1:
        textYOffset = 20;
        break;
      case 2:
        textYOffset = -5;
        break;
      case 3:
        textXOffset = -this.point.text?.length * fontSize * 0.6 - 10;
        break;
      case 4:
        textXOffset = -this.point.text?.length * fontSize * 0.6 - 10;
        break;
    }

    return <text key={`${this.point.id}-${x}-${y}-text`}
                 fontSize={fontSize + "px"}
                 fontFamily="monospace"
                 x={x + textXOffset}
                 y={y + textYOffset}
                 fill="red">
      {this.point.text}
    </text>;
  }
}
