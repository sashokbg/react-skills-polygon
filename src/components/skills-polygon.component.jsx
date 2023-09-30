import React, { useState } from "react";
import { Polygon } from "../model/polygon.js";
import { PointComponent } from "./point.component";
import pSBC from 'shade-blend-color';

export const SkillsPolygon = (props) => {
  const config = {
    fontSize: props.fontSize ? props.fontSize : 18,
    fontColor: props.fontColor ? props.fontColor : 'black',
    radius: props.radius ? props.radius : 90,
    fillColor: props.fillColor ? props.fillColor : 'gray',
    baseColor: props.baseColor ? props.baseColor : '#FF0FFF'
  }

  const innerPoints = () => {
    return props.polygon.points.filter(p => !p.isOuter);
  }

  let radius = config.radius;
  let outerPoints = props.polygon.calculatePointPositions(radius)

  const paddingRatio = 1.8;

  const viewBoxSize = `-${paddingRatio * radius} -${paddingRatio * radius} ${2 * paddingRatio * radius} ${2 * paddingRatio * radius}`;
  const renderPoints = (points) => {
    return points.map(p => (
      <PointComponent key={p.id} point={p} fontSize={props.fontSize} fontColor={props.fontColor}/>));
  }

  const drawBackgroundPolygons = () => {
    const pointsString = props.polygon.outerPoints.reduce((previous, point) => previous + " " + point.x + "," + point.y, "");
    let ratio1 = 0.80;
    let ratio2 = 0.60;
    let ratio3 = 0.40;
    const points2String = outerPoints.reduce((previous, point) => previous + " " + point.x * ratio1 + "," + point.y * ratio1, "");
    const points3String = outerPoints.reduce((previous, point) => previous + " " + point.x * ratio2 + "," + point.y * ratio2, "");
    const points4String = outerPoints.reduce((previous, point) => previous + " " + point.x * ratio3 + "," + point.y * ratio3, "");

    return (
      < >
        <polygon
          key="polygon-outer"
          points={pointsString}
          style={{fill: pSBC(0.80, props.baseColor), stroke: "pink"}}/>
        <polygon
          key="polygon-outer2"
          points={points2String}
          style={{fill: pSBC(0.60, props.baseColor), stroke: "pink"}}/>
        <polygon
          key="polygon-outer3"
          points={points3String}
          style={{fill: pSBC(0.30, props.baseColor), stroke: "pink"}}/>
        <polygon
          key="polygon-outer4"
          points={points4String}
          style={{fill: props.baseColor, stroke: "pink"}}/>
      < />
    )
  }

  const drawPolygon = () => {
    const pointsString = innerPoints().reduce((previous, point) => previous + " " + point.x + "," + point.y, "") || "";
    return (
      <>
        <polygon points={pointsString} fill="none" stroke="black"/>
        <polygon
          key="polygon"
          fillOpacity={0.6}
          points={pointsString}
          style={{fill: config.fillColor, stroke: config.fillColor}}/>
      </>
    )
  }

  const connectOuterPoints = () => {
    return innerPoints().map(p => {
      return <line key={p.id + "-" + p.outerPoint.id} x1={0} y1={0} x2={p.outerPoint.x} y2={p.outerPoint.y}
            stroke="black"/>
    })
  }

  return (
    < >
      <svg width={2 * radius} height={2 * radius} viewBox={viewBoxSize}>
        {drawBackgroundPolygons()}
        {connectOuterPoints()}
        {renderPoints(outerPoints)}
        {drawPolygon()}
        {renderPoints(props.polygon.points)}
      </svg>
    </ >

  );
}



