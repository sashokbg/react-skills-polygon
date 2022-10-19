import React from "react";
import {Polygon} from "../model/polygon.js";
import {PointComponent} from "./point.component";

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
  
  get innerPoints() {
    return this.points.filter(p => !p.isOuter);
  }
  
  get outerPoints() {
    return this.points.filter(p => p.isOuter);
  }

  get polygon() {
    return this.state.polygon;
  }

  render() {
    this.state.points = this.innerPoints;
    
    let radius = this.config.radius;
    let outerPoints = this.polygon.calculatePointPositions(radius)
    
    console.log('Outer points', outerPoints);
    
    const paddingRatio = 1.6;
    
    const viewBoxSize = `-${paddingRatio * radius} -${paddingRatio * radius} ${ 2 * paddingRatio * radius} ${2 * paddingRatio * radius}`;
    
    return (
      < >
        <svg width={2 * radius} height={2 * radius} viewBox={viewBoxSize}>
          <circle
            cx="0"
            cy="0"
            r={radius}
            fill="transparent"
            stroke="#000000"
          />
          {this.renderPoints(outerPoints)}
          {this.renderPoints(this.points)}
          {this.connectOuterPoints()}
        </svg>
      </ >

    );
  }

  renderPoints(points) {
    let dots = [];

    for (let p of points) {
      dots.push(<PointComponent key={p.id} point={p} fontSize={this.config.fontSize} fontColor={this.config.fontColor}/>);
    }

    return dots;
  }

  connectInnerPoints() {
    const pointsString = this.innerPoints.reduce((previous, point) => previous + " " + point.x + "," + point.y, "");
    return (
      <polygon
        key="polygon"
        points={pointsString}
        style={{fill: this.config.fillColor, stroke: this.config.fillColor}}/>
    )
  }

  connectOuterPoints() {
    const lines = [];

    for (let p of this.innerPoints) {
      lines.push(
        <line key={p.id + "-" + p.outerPoint.id} x1={p.x} y1={p.y} x2={p.outerPoint.x} y2={p.outerPoint.y}
              stroke="red"/>
      )
    }

    return lines;
  }
  
  handler(point) {
    console.log('Handler', point);
  }
}



