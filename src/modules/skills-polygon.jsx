import React, {Fragment} from "react";
import {Polygon} from "../model/polygon.js";
import {PointLabel} from "./point-label";

export class SkillsPolygon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      polygon: new Polygon(this.props.points),
    }

    this.config = {
      fontSize: this.props.fontSize ? this.props.fontSize : 18,
      fontColor: this.props.fontColor ? this.props.fontColor : 'black',
      radius: this.props.radius ? this.props.radius : 90,
      fillColor: this.props.fillColor ? this.props.fillColor : 'gray',
    }
  }

  get points() {
    return this.state.polygon.points;
  }

  get polygon() {
    return this.state.polygon;
  }

  render() {
    let radius = this.props.radius;
    this.polygon.calculatePointPositions(radius)

    return (
      < >
        <svg width="200" height="200" viewBox="-200 -200 400 400">
          <circle
            cx="0"
            cy="0"
            r={this.config.radius}
            fill="transparent"
            stroke="#000000"
          />
          {this.renderPoints(radius)}
          {this.connectInnerPoints()}
          {this.connectOuterPoints()}
          {this.renderOuterPoints(radius)}
        </svg>
      </ >

    );
  }


  renderPoints() {
    let dots = [];

    for (let p of this.points) {
      dots.push(this.renderPoint(p));
    }

    return dots;
  }

  renderOuterPoints() {
    let dots = [];
    for (let p of this.points) {
      dots.push(this.renderPoint(p.outerPoint, true));
    }

    return dots;
  }

  connectInnerPoints() {
    const pointsString = this.points.reduce((previous, point) => previous + " " + point.x + "," + point.y, "");
    return (
      <polygon
        key="polygon"
        points={pointsString}
        style={{fill: this.config.fillColor, stroke: this.config.fillColor}}/>
    )
  }

  connectOuterPoints() {
    const lines = [];

    for (let p of this.points) {
      lines.push(
        <line key={p.id + "-" + p.outerPoint.id} x1={p.x} y1={p.y} x2={p.outerPoint.x} y2={p.outerPoint.y}
              stroke="red"/>
      )
    }

    return lines;
  }

  renderPoint(currentPoint) {
    const x = currentPoint.x;
    const y = currentPoint.y;
    const pointRadius = 2;

    return (
      <Fragment key={currentPoint.id + "-" + currentPoint.x + "-" + currentPoint.y}>
        <circle
          cx={x}
          cy={y}
          r={pointRadius}
          fill="black"
          key={`${currentPoint.id}-${x}-${y}`}
        />
        <PointLabel fontSize={this.config.fontSize} fontColor={this.config.fontColor} point={currentPoint}/>
      </Fragment>
    )
  }
}



