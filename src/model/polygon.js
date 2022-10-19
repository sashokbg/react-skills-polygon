export class Polygon {
  points = [];

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
    
    const outerPoints = [];

    for (let i = 0; i < n; i++) {
      const currentPoint = this.points[i];
      currentPoint.calculatePosition(i * 360 / n, radius);

      const outerPoint = this.points[i].clone();
      outerPoint.isOuter = true;
      
      outerPoint.calculatePosition(i * 360 / n, radius);
      currentPoint.outerPoint = outerPoint;
      outerPoints.push(outerPoint);
    }
    
    return outerPoints;
  }

}
