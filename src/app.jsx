import React, {Component} from "react";
import {Point} from "./model/point.js";
import {Polygon} from "./model/polygon.js";
import {SkillsPolygon} from "./modules/skills-polygon.component";
import {PointInputComponent} from "./modules/point-input.component";

export class App extends Component {
  constructor(props) {
    super(props);

    const p1 = new Point(0, 0, 3, "Management");
    const p2 = new Point(0, 0, 6, "Tech Lead");
    const p3 = new Point(0, 0, 8, "Agile");
    const p4 = new Point(0, 0, 9, "Testing");
    const p5 = new Point(0, 0, 4, "Soft Skills");
    const p6 = new Point(0, 0, 4, "Soft Skills");
    const p7 = new Point(0, 0, 4, "Soft Skills");

    this.state = {
      points: [
        p1,
        p2,
        p3,
        p4,
        p5,
        p6,
        p7,
      ],
      pointInputs: [
        <PointInputComponent key="A" point={p1} handler={() => this.inputsHandler(p1)}/>,
        <PointInputComponent key="B" point={p2} handler={() => this.inputsHandler(p2)}/>,
        <PointInputComponent key="C" point={p3} handler={() => this.inputsHandler(p3)}/>,
        <PointInputComponent key="D" point={p4} handler={() => this.inputsHandler(p4)}/>,
        <PointInputComponent key="E" point={p5} handler={() => this.inputsHandler(p5)}/>,
        <PointInputComponent key="F" point={p6} handler={() => this.inputsHandler(p6)}/>,
        <PointInputComponent key="G" point={p7} handler={() => this.inputsHandler(p7)}/>,
      ]
    }
    this.skillsPolygon = React.createRef();
  }

  render() {
    return (
      <div>
        <SkillsPolygon fontSize="24"
                       baseColor="#FF0FFF"
                       radius={200}
                       points={this.state.points}
                       ref={this.skillsPolygon}/>

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
      <PointInputComponent key={point.id} point={point} handler={() => this.inputsHandler(point)}/>
    )

    this.setState({
      points: points,
      pointInputs: pointInputs
    });
  }

  inputsHandler(point) {
    this.skillsPolygon.current.setState({polygon: new Polygon(this.state.points)});
  }
}
