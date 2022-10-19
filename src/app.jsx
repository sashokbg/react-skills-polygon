import {Component, Fragment, useState} from "react";
import {SkillsPolygon} from "./modules/skills-polygon.jsx";
import React from 'react';
import PointInput from "./modules/point-input";
import {Point} from "./model/point.js";
import {Polygon} from "./model/polygon.js";

export class App extends Component {
  lastId = 0;

  constructor(props) {
    super(props);

    const p1 = new Point(-3, 0, 0, 4, "AAA");
    const p2 = new Point(-2, 0, 0, 4, "BBB");
    const p3 = new Point(-1, 0, 0, 4, "CCC");

    this.state = {
      points: [
        p1,
        p2,
        p3
      ],
      pointInputs: [
        <PointInput key="A" point={p1} handler={() => this.inputsHandler(p1)}/>,
        <PointInput key="B" point={p2} handler={() => this.inputsHandler(p2)}/>,
        <PointInput key="C" point={p3} handler={() => this.inputsHandler(p3)}/>
      ]
    }
    this.skillsPolygon = React.createRef();
  }

  render() {
    return (
      <div>
        <SkillsPolygon radius={200} points={this.state.points} ref={this.skillsPolygon}/>

        {this.state.pointInputs}

        <button onClick={() => this.addPoint()}>
          Add point
        </button>
      </div>
    )
  }

  addPoint() {
    const points = [...this.state.points];
    const pointInputs = [...this.state.pointInputs];

    const point = new Point(this.lastId++, 0, 0, 0, "");

    points.push(point)
    pointInputs.push(
      //TODO why "this" is undefined if passing handler reference
      <PointInput key={point.id} point={point} handler={() => this.inputsHandler(point)}/>
    )

    this.setState({
      points: points,
      pointInputs: pointInputs
    });
  }

  inputsHandler(point) {
    this.skillsPolygon.current.setState({polygon: new Polygon(this.state.points)})
  }
}
