export class Point {
  constructor(x, y, value, text, isOuter, angle, radius) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.text = text;
    this.isOuter = !!isOuter;
    this.angle = angle;
    this.radius = radius;
  }

  get id () {
    return this.x + "-" + this.y + this.value; 
  }
  
  move(newValue) {
    this.value = newValue;
    this.calculatePosition(this.angle, this.radius)
  }
  
  calculatePosition(angle, r) {
    this.angle = angle;
    this.radius = r;
    
    const sinX = Math.sin(angle * (Math.PI / 180)).toFixed(3)
    const sinY = Math.sin((90 - angle) * Math.PI / 180).toFixed(3)

    if(this.isOuter) {
      const x = sinX * r;
      const y = sinY * r;

      this.x = x;
      this.y = y;
    } else {
      const x = sinX * r / 10 * this.value;
      const y = sinY * r / 10 * this.value;

      this.x = x;
      this.y = y;
    }
  }

  clone() {
    return new Point(
      this.x,
      this.y,
      this.value,
      this.text,
      this.isOuter,
      this.angle,
      this.radius
    )
  }

  findQuadrant() {
    let quadrant;
    if(this.x >= 0 && this.y >= 0) {
      quadrant = 1;
    }
    if(this.x >= 0 && this.y < 0) {
      quadrant = 2;
    }
    if(this.x < 0 && this.y < 0) {
     quadrant = 3;
    }
    if(this.x < 0 && this.y >= 0) {
      quadrant = 4;
    }
    
    return quadrant;
  }

  print() {
    return ""
  }
}
