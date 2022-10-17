import React, {Fragment} from "react";

export class SkillsStar extends React.Component {
  constructor(props) {
    super(props);
    console.log('Props', this.props);

    this.state = {
      points: this.props.points
    }
  }

  render() {
    let radius = this.props.radius;

    this.calculatePositions(radius)

    console.log('Rendering skill star', this.state);
    return (
      <div>
        <svg width="200" height="200" viewBox="-100 -100 300 300">
          <circle
            cx="0"
            cy="0"
            r="90"
            fill="transparent"
            stroke="#000000"
          />
          {this.renderPoints(radius)}
          {this.connectInnerPoints()}
          {this.connectOuterPoints()}
          {this.renderOuterPoints(radius)}
        </svg>
      </div>

    );
  }

  calculatePositions(r) {
    let n = this.state.points.length;

    for (let i = 0; i < n; i++) {
      const currentPoint = this.state.points[i];
      currentPoint.calculatePosition(i * 360 / n, r / 10 * currentPoint.value);

      const outerPoint = this.state.points[i].clone();
      outerPoint.calculatePosition(i * 360 / n, r);
      currentPoint.outerPoint = outerPoint;
    }
  }

  renderPoints() {
    let dots = [];

    for(let p of this.state.points) {
      dots.push(this.renderPoint(p));
    }

    return dots;
  }

  renderOuterPoints() {
    let dots = [];
    for(let p of this.state.points) {
      dots.push(this.renderPoint(p.outerPoint, true));
    }

    return dots;
  }

  connectInnerPoints() {
    const pointsString = this.state.points.reduce((previous, point) => previous + " " + point.x + "," + point.y, "");
    return (
      <polygon points={pointsString} style={{fill: "lime", stroke: "purple"}}/>
    )
  }

  connectOuterPoints() {
    const lines = [];

    for(let p of this.state.points) {
      lines.push(
        <line key={p.id + "-" + p.outerPoint.id} x1={p.x} y1={p.y} x2={p.outerPoint.x} y2={p.outerPoint.y} stroke="red"/>
      )
    }

    return lines;
  }

  renderPoint(currentPoint, outer) {

    const x = currentPoint.x;
    const y = currentPoint.y;
    let text = null;

    if (outer) {
      text = <text x={x} y={y} fill="red">{currentPoint.text}</text>;
    }

    return (
      <Fragment key={currentPoint.id + "-" + currentPoint.x + "-" + currentPoint.y}>
        <circle
          cx={x}
          cy={y}
          r="4"
          fill="black"
        />
        {text}
      </Fragment>
    )
  }
}



