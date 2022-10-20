import React from "react";
import {Polygon} from "../model/polygon.js";
import {PointComponent} from "./point.component";
import pSBC from 'shade-blend-color';

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
      baseColor: this.props.baseColor ? this.props.baseColor : '#FF0FFF'
    }
  }

  get points() {
    return this.state.polygon.points;
  }

  get innerPoints() {
    return this.points.filter(p => !p.isOuter);
  }

  get polygon() {
    return this.state.polygon;
  }

  render() {
    this.state.points = this.innerPoints;

    let radius = this.config.radius;
    let outerPoints = this.polygon.calculatePointPositions(radius)
    this.outerPoints = outerPoints;

    const paddingRatio = 1.8;

    const viewBoxSize = `-${paddingRatio * radius} -${paddingRatio * radius} ${2 * paddingRatio * radius} ${2 * paddingRatio * radius}`;

    return (
      < >
        <svg width={2 * radius} height={2 * radius} viewBox={viewBoxSize}>
          {this.drawBackgroundPolygons()}
          {this.connectOuterPoints()}
          {this.renderPoints(outerPoints)}
          {this.drawPolygon()}
          {this.renderPoints(this.points)}
        </svg>
      </ >

    );
  }

  renderPoints(points) {
    return points.map(p => (
      <PointComponent key={p.id} point={p} fontSize={this.config.fontSize} fontColor={this.config.fontColor}/>));
  }

  drawBackgroundPolygons() {
    const pointsString = this.outerPoints.reduce((previous, point) => previous + " " + point.x + "," + point.y, "");
    let ratio1 = 0.80;
    let ratio2 = 0.60;
    let ratio3 = 0.40;
    const points2String = this.outerPoints.reduce((previous, point) => previous + " " + point.x * ratio1 + "," + point.y * ratio1, "");
    const points3String = this.outerPoints.reduce((previous, point) => previous + " " + point.x * ratio2 + "," + point.y * ratio2, "");
    const points4String = this.outerPoints.reduce((previous, point) => previous + " " + point.x * ratio3 + "," + point.y * ratio3, "");

    return (
      < >
        <polygon
          key="polygon-outer"
          points={pointsString}
          style={{fill: pSBC(0.80, this.config.baseColor), stroke: "pink"}}/>
        <polygon
          key="polygon-outer2"
          points={points2String}
          style={{fill: pSBC(0.60, this.config.baseColor), stroke: "pink"}}/>
        <polygon
          key="polygon-outer3"
          points={points3String}
          style={{fill: pSBC(0.30, this.config.baseColor), stroke: "pink"}}/>
        <polygon
          key="polygon-outer4"
          points={points4String}
          style={{fill: this.config.baseColor, stroke: "pink"}}/>
      < />
    )
  }

  drawPolygon() {
    const pointsString = this.innerPoints.reduce((previous, point) => previous + " " + point.x + "," + point.y, "") || "";
    return (
      <>
        <polygon points={pointsString} fill="none" stroke="black" />
        <polygon
          key="polygon"
          fillOpacity={0.6}
          points={pointsString}
          style={{fill: this.config.fillColor, stroke: this.config.fillColor}}/>
      </>
    )
  }

  connectOuterPoints() {
    const lines = [];

    for (let p of this.innerPoints) {
      lines.push(
        < >
          <line key={p.id + "-" + p.outerPoint.id} x1={0} y1={0} x2={p.outerPoint.x} y2={p.outerPoint.y}
              stroke="black"/>
        < />
      )
    }

    return lines;
  }

  handler(point) {
    console.log('Handler', point);
  }
}



