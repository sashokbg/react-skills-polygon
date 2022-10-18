import {Polygon} from "../src/model/polygon.js";
import {Point} from "../src/model/point.js";

let point1, point2, point3;

describe("Polygon", () => {
  beforeEach(() => {
    point1 = new Point(1, 0, 0 , 5, "test1");
    point2 = new Point(2, 0, 0 , 5, "test2");
    point3 = new Point(3, 0, 0 , 5, "test3");
  })

  describe("Can calculate point locations", () => {
    test("One point with value 5/10", () => {
      let point = new Point(1, 0, 0 , 5, "test");
      const polygon = new Polygon([point]);

      polygon.calculatePositions(50);

      expect(point.y).toBe(25);
      expect(point.x).toBe(0);
    })

    test("Two points with value 5/10", () => {
      const polygon = new Polygon([point1, point2]);

      polygon.calculatePositions(50);

      expect(point1.y).toBe(25);
      expect(point1.x).toBe(0);

      expect(point2.y).toBe(-25);
      expect(point2.x).toBe(0);
    })

    test("Three points with value 5/10", () => {
      const polygon = new Polygon([point1, point2, point3]);

      polygon.calculatePositions(50);

      expect(point1.y).toBe(25);
      expect(point1.x).toBe(0);

      expect(point2.y).toBe(-12.5);
      expect(point2.x).toBe(21.65);

      expect(point3.y).toBe(-12.5);
      expect(point3.x).toBe(-21.65);
    })
  });

  describe("Generates outer points", () => {
    test("Three outer points", () => {
      const polygon = new Polygon([point1, point2, point3]);

      polygon.calculatePositions(50);

      expect(polygon.outerPoints.length).toBe(3);

      expect(polygon.outerPoints[0].x).toBe(0);
      expect(polygon.outerPoints[0].y).toBe(50);

      expect(polygon.outerPoints[1].x).toBe(43.3);
      expect(polygon.outerPoints[1].y).toBe(-25);
    })
  });
})
