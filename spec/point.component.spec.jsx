import renderer from 'react-test-renderer';
import {Point} from "../src/model/point";
import {PointComponent} from "../src/modules/point.component";

describe("Point component", () => {
  it("Renders", () => {
    const p1 = new Point(0, 0, 3, "Management");
    let element = <PointComponent point={p1} />;
    let input = renderer.create(element);
    
    let tree = input.toTree();
    let a = 4;
  })
})