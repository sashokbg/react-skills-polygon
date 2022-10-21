import React, {Component} from "react";
import {Point} from "./model/point.js";
import {SkillsPolygon} from "./modules/skills-polygon.component";
import {PointInputComponent} from "./modules/point-input.component";
import {Polygon} from "./model/polygon";

export class App extends Component {
  constructor(props) {
    super(props);

    const p1 = new Point(0, 0, 3, "Management");
    const p2 = new Point(0, 0, 6, "Tech Lead");
    const p3 = new Point(0, 0, 8, "Agile");
    const p4 = new Point(0, 0, 9, "Testing");
    const p5 = new Point(0, 0, 4, "Soft Skills");

    this.state = {
      points: [
        p1,
        p2,
        p3,
        p4,
        p5,
      ],
      pointInputs: [
        <PointInputComponent key="A" point={p1} handler={(old, n) => this.inputsHandler(old, n)}/>,
        <PointInputComponent key="B" point={p2} handler={(old, n) => this.inputsHandler(old, n)}/>,
        <PointInputComponent key="C" point={p3} handler={(old, n) => this.inputsHandler(old, n)}/>,
        <PointInputComponent key="D" point={p4} handler={(old, n) => this.inputsHandler(old, n)}/>,
        <PointInputComponent key="E" point={p5} handler={(old, n) => this.inputsHandler(old, n)}/>,
      ]
    }
  }

  render() {
    const polygon = new Polygon(this.state.points);
    return (
      <div>
        <SkillsPolygon fontSize="24" baseColor="#FF0000" radius={200} polygon={polygon} />

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

    const point = new Point(0, 0, 0, "");

    points.push(point)
    pointInputs.push(
      //TODO why "this" is undefined if passing handler reference
      <PointInputComponent key={point.id} point={point} handler={(oldPoint, changedPoint) => this.inputsHandler(oldPoint, changedPoint)}/>
    )

    this.setState({
      points: points,
      pointInputs: pointInputs
    });
  }

  inputsHandler(oldPoint, point) {
    this.setState((oldState) => {
      let points = oldState.points.map(p => p === oldPoint ? point : p);
      return {points: points, pointInputs: oldState.pointInputs}
    })
    // this.skillsPolygon.current.setState({polygon: new Polygon(this.state.points)}); //TODO pas bon, passer par les props
    // TODO context vs redux - framework de state?
  }
}
