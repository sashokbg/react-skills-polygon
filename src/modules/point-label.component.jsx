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
      const tempPoint = this.point.clone();
      tempPoint.move(this.point.value + 1);
      
      return <text key={this.getKey(this.point.x, this.point.y)} fontStyle={{color: 'red'}}
                   x={tempPoint.x + textXOffset}
                   y={tempPoint.y + textYOffset}
      >{this.point.value} TOTO</text>
    }
    
    switch (this.point.findQuadrant()) {
      case 1:
        textYOffset = 40;
        break;
      case 2:
        textYOffset = -20;
        break;
      case 3:
        textYOffset = -20;
        textXOffset = -this.point.text?.length * this.fontSize * FONT_RATIO - 30;
        break;
      case 4:
        textXOffset = -this.point.text?.length * this.fontSize * FONT_RATIO - 30;
        textYOffset = 50;
        break;
    }

    return <text key={this.getKey(x, y)}
                 fontSize={this.fontSize + "px"}
                 fontFamily="monospace"
                 x={x + textXOffset}
                 y={y + textYOffset}
                 fill={this.fontColor}>
      {this.point.text}
    </text>;
  }

  getKey(x, y) {
    return  `${this.point.id}-${x}-${y}-text`;
  }
}
