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
          {this.renderPoints(90)}
          {this.connectPoints()}
        </svg>
      </div>

    );
  }

  renderPoints(r) {
    let dots = [];

    let n = this.state.points.length;

    for (let i = 0; i < n; i++) {
      const currentPoint = this.state.points[i];

      dots.push(this.renderPoint(currentPoint, i * 360 / n, r));
      dots.push(this.renderPoint(currentPoint, i * 360 / n, r / 10 * currentPoint.value));
    }

    return dots;
  }

  connectPoints() {
    const pointsString = this.state.points.reduce((previous, point) => previous + " " + point.x + "," + point.y , "");
    return (
      <polygon points={pointsString} style={{fill: "lime", stroke: "purple"}} />
    )
  }

  renderPoint(currentPoint, angle, r) {
    const sinX = Math.sin(angle * Math.PI / 180)
    const sinY = Math.sin((90 - angle) * Math.PI / 180)

    const x = sinX * r;
    const y = sinY * r;

    currentPoint.x = x;
    currentPoint.y = y;

    return (
      <Fragment key={currentPoint.id + "-" + currentPoint.x + "-" + currentPoint.y}>
        <circle
          cx={x}
          cy={y}
          r="4"
          fill="black"
        />
        <line x1={0} y1={0} x2={x} y2={y} stroke="red"/>
      </Fragment>
    )
  }
}



