import {Component} from "react";
import {PointLabelComponent} from "./point-label.component";
import React, {Fragment} from "react";

export class PointComponent extends Component {
  constructor(props) {
    super(props);
  }

  get point() {
    return this.props.point;
  }

  render() {
    const x = this.point.x;
    const y = this.point.y;
    const pointRadius = 2;

    return (
      < >
        <circle
          cx={x}
          cy={y}
          r={pointRadius}
          fill="black"
          key={`${this.id}-${x}-${y}`}
        />
        <PointLabelComponent key={this.point.id +""+ this.point.text} fontSize={this.point.fontSize} fontColor={this.point.fontColor} point={this.point}/>
      </ >
    )
  }
}