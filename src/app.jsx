import React, { useEffect, useState } from "react";
import { Point } from "./model/point.js";
import { Polygon } from "./model/polygon.js";
import { SkillsPolygon } from "./components/skills-polygon.component";
import { PointInputComponent } from "./components/point-input.component";

export const App = (props) => {
  const p1 = new Point(0, 0, 3, "Management");
  const p2 = new Point(0, 0, 6, "Tech Lead");
  const p3 = new Point(0, 0, 8, "Agile");
  const p4 = new Point(0, 0, 9, "Testing");
  const p5 = new Point(0, 0, 4, "Soft Skills");
  const p6 = new Point(0, 0, 4, "Soft Skills");
  const p7 = new Point(0, 0, 4, "Soft Skills");

  const [points, setPoints] = useState([]);
  // this.state =

  useEffect(() => {
    setPoints([
      p1,
      p2,
      p3,
      p4,
      p5,
      p6,
      p7,
    ]);
  }, [])

  const onDelete = (p) => {
    const indexOf = points.indexOf(p);
    points.splice(indexOf, 1);
    setPoints([...points]);
  }

  const onPointChange = (event, point) => {
    const existingPoint = points.find(p => p === point);
    if (event.target.type === 'text') {
      existingPoint.text = event.target.value;
    } else {
      existingPoint.value = event.target.value;
    }

    setPoints([...points])
  }

  const addPoint = () => {
    const point = new Point(0, 0, 0, "");

    points.push(point)

    setPoints([...points]);
  }

  return (
    <div>
      <SkillsPolygon fontSize="24"
                     baseColor="#FF0FFF"
                     radius={200}
                     polygon={new Polygon(points)} />

      {points.map((point, index) => <PointInputComponent key={String.fromCharCode('A'.charCodeAt(0) + index)}
                                                         point={point} onDelete={onDelete}
                                                         handler={onPointChange}/>)}

      <button onClick={() => addPoint()}>
        Add point
      </button>
    </div>
  )
}
