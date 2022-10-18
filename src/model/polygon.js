export class Polygon {
  points = [];
  _outerPoints = [];

  constructor(points) {
    this.points = points;
  }

  get outerPoints() {
    return this.points.map(p => p.outerPoint);
  }

  /**
   * Calculate positions of the points given a radius
   * @param radius
   */
  calculatePointPositions(radius) {
    let n = this.points.length;

    for (let i = 0; i < n; i++) {
      const currentPoint = this.points[i];
      currentPoint.calculatePosition(i * 360 / n, radius / 10 * currentPoint.value);

      const outerPoint = this.points[i].clone();
      outerPoint.isOuter = true;
      outerPoint.calculatePosition(i * 360 / n, radius);
      currentPoint.outerPoint = outerPoint;
    }
  }

  findQuadrant(point) {
    this.points.find((p) => p.id === point.id);

    if(point.x >= 0 && point.y >= 0) {
      return 1;
    }
    if(point.x > 0 && point.y < 0) {
      return 2;
    }
    if(point.x < 0 && point.y < 0) {
      return 3;
    }
    if(point.x < 0 && point.y >= 0) {
      return 4;
    }
  }
}
