import {Point} from "../src/model/point.js";

describe("point", () => {
  it("Can calculate its position given a radius and an angle", () => {
    const point = new Point(0, 0, 0, 5, "Some text");
    point.calculatePosition(30, 100);
    expect(point.x).toBeCloseTo(50, 2);
    expect(point.y).toBeCloseTo(86.60, 2);
  });

  it("Can clone itself", () => {
    const point = new Point(0, 0, 0, 5, "Some text");
    const point2 = point.clone();

    expect(point).not.toBe(point2);

    expect(point.x).toEqual(point2.x);
    expect(point.y).toEqual(point2.y);
    expect(point.id + "-clone").toEqual(point2.id);
    expect(point.text).toEqual(point2.text);
  });
})
