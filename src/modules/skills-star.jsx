import React, {Fragment} from "react";

export class SkillsStar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      points: this.props.points
    }
  }

  render() {
    let radius = this.props.radius;
    this.calculatePositions(radius)

    return (
      < >
        <svg width="200" height="200" viewBox="-200 -200 400 400">
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
      </ >

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
      <polygon key="polygon" points={pointsString} style={{fill: "lime", stroke: "purple"}}/>
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

    // TODO put this text in a separate component
    if (outer) {
      let textXOffset = 0;
      let textYOffset = 0;

      if(currentPoint.x > 0 && currentPoint.y < 0) { // first quandrant
        console.log('First quadrant', currentPoint.text);
        textYOffset = -5;
      }
      if(currentPoint.x >= 0 && currentPoint.y >= 0) {
        console.log('Second quadrant', currentPoint.text);
        textYOffset = 20;
      }
      if(currentPoint.x < 0 && currentPoint.y < 0) {
        console.log('Third quadrant', currentPoint.text);
        textXOffset = - currentPoint.text?.length * 7; // TODO use font size
      }
      if(currentPoint.x < 0 && currentPoint.y >= 0) {
        console.log('Forth quadrant', currentPoint.text);
        textXOffset = - currentPoint.text?.length * 7; // TODO use font size
      }

      console.log('Rendering TEXT', x, y)

      text = <text key={`${currentPoint.id}-${x}-${y}-text`}
                   fontSize="12px"
                   fontFamily="monospace"
                   x={x + textXOffset}
                   y={y + textYOffset}
                   fill="red">
        {currentPoint.text}
      </text>;
    }

    return (
      <Fragment key={currentPoint.id + "-" + currentPoint.x + "-" + currentPoint.y}>
        <circle
          cx={x}
          cy={y}
          r="4"
          fill="black"
          key={`${currentPoint.id}-${x}-${y}`}
        />
        {text}
      </Fragment>
    )
  }
}



