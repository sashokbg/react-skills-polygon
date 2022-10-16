import {Component, Fragment, useState} from "react";
import {SkillsStar} from "./modules/skills-star.jsx";
import React from 'react';
import PointInput from "./modules/point-input";
import {Point} from "./model/point.js";

export class App extends Component {
  lastId = 0;

  constructor(props) {
    super(props);
    this.state = {
      points: [],
      pointInputs: []
    }
    this.skillsStar = React.createRef();
  }

  render() {
    console.log("App Render", this.state);
    console.log("App Render", this.state.points);

    return (
      <div>
        <SkillsStar points={this.state.points} ref={this.skillsStar}/>

        {this.state.pointInputs}

        <button onClick={() => this.addPoint()}>
          Add point
        </button>

        <button onClick={() => {
          this.forceUpdate();
          this.skillsStar.current.setState({points: this.state.points})
        }
        }>
          Done
        </button>
      </div>
    )
  }

  addPoint() {
    const points = [...this.state.points];
    const pointInputs = [...this.state.pointInputs];

    const point = new Point(this.lastId++, 0, 0, 0);

    points.push(point)
    pointInputs.push(
      <PointInput point={point}/>
    )

    this.setState({
      points: points,
      pointInputs: pointInputs
    });
  }
}
