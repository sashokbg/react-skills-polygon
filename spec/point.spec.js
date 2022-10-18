import {Point} from "../src/model/point.js";
import {Polygon} from "../src/model/polygon.js";

describe("A point", () => {
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

  it("Is not outer by defalt", () => {
    const point = new Point(0, 0, 0, 5, "Some text");
    expect(point.isOuter).toEqual(false);
  })

  describe("It calculates the quadrant in which it is", () => {
    test.each([
      [0, 0, 1],
      [0, 50, 1],
      [0, 25, 1],
      [50, 0, 1],
      [50, -1, 2],
      [50, -50, 2],
      [-50, -50, 3],
      [-50, 50, 4],
      [-50, 0, 4],
    ])("Point coordinates x=%s, y=%s gives quadrant %s", (x, y, quadrant) => {
      let point = new Point(1, x, y, 5, "test");

      expect(point.findQuadrant()).toBe(quadrant);
    })
  })
})
