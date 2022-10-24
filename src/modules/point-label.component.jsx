import React, {Component} from "react";

const FONT_RATIO = 0.6;

export class PointLabelComponent extends Component {
  constructor(props) {
    super(props);

    this.fontSize = this.props.fontSize ? this.props.fontSize : this.fontSize = 18;
    this.fontColor = this.props.fontColor ? this.props.fontColor : 'black';
    
    this.state = {
      point: this.props.point,
    }
  }

  get point() {
    return this.state.point;
  }

  render() {
    const x = this.point.x;
    const y = this.point.y;
    let textXOffset = 0;
    let textYOffset = 0;

    if (!this.point.isOuter) {
      switch (this.point.findQuadrant()) {
        case 1:
          textYOffset = 20;
          textXOffset = 5;
          break;
        case 2:
          textYOffset = -10;
          break;
        case 3:
          textYOffset = -10;
          break;
        case 4:
          textXOffset = this.point.value > 9 ? -30 : -20;
          break;
      }
      return <text key={this.getKey()}
                   fontWeight="bold"
                   fontSize={this.fontSize + 'px'}
                   x={x + textXOffset}
                   y={y + textYOffset}
      >{this.point.value}</text>
    }
    
    switch (this.point.findQuadrant()) {
      case 1:
        textYOffset = 40;
        break;
      case 2:
        textYOffset = -28;
        textXOffset = 40;
        break;
      case 3:
        textYOffset = -28;
        textXOffset = -this.point.text?.length * this.fontSize * FONT_RATIO;
        break;
      case 4:
        textXOffset = -this.point.text?.length * this.fontSize * FONT_RATIO;
        textYOffset = 50;
        break;
    }

    if(this.point.x === 0 ) {
      textXOffset = -this.point.text?.length * this.fontSize * FONT_RATIO / 2;
    }

    return <text key={this.getKey(x, y)}
                 fontSize={this.fontSize + "px"}
                 fontFamily="monospace"
                 fontWeight="bold"
                 x={x + textXOffset}
                 y={y + textYOffset}
                 fill={this.fontColor}>
      {this.point.text}
    </text>;
  }

  getKey() {
    return  `${this.point.id}-${this.point.x}-${this.point.y}-text`;
  }
}
