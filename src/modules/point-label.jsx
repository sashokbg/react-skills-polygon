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

    if (this.point.x > 0 && this.point.y < 0) {
      console.log('First quadrant', this.point.text);
      textYOffset = -5;
    }
    if (this.point.x >= 0 && this.point.y >= 0) {
      console.log('Second quadrant', this.point.text);
      textYOffset = 20;
    }

    if (this.point.x < 0 && this.point.y < 0) {
      console.log('Third quadrant', this.point.text);
      textXOffset = -this.point.text?.length * fontSize * 0.6 - 10; // TODO use font size
    }
    if (this.point.x < 0 && this.point.y >= 0) {
      console.log('Forth quadrant', this.point.text);
      textXOffset = -this.point.text?.length * fontSize * 0.6 - 10; // TODO use font size
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
