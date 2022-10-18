export class Point {
  constructor(id, x, y, value, text) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.value = value;
    this.text = text;
    this.isOuter = false;
  }

  calculatePosition(angle, r) {
    const sinX = Math.sin(angle * (Math.PI / 180)).toFixed(3)
    const sinY = Math.sin((90 - angle) * Math.PI / 180).toFixed(3)

    const x = sinX * r;
    const y = sinY * r;

    this.x = x;
    this.y = y;
  }

  clone() {
    return new Point(
      this.id + '-clone',
      this.x,
      this.y,
      this.value,
      this.text
    )
  }
}
