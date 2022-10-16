import React, {Component} from "react";

export default class PointInput extends  Component{
  constructor(props) {
    super(props);

    this.state = {
      point: props.point
    }
  }

  render() {
    return (
      <div>
        <input type="number" onChange={(e) => this.handle(e)}/>
      </div>
    )
  }

  handle(e) {
    this.state.point.value = e.target.value;
    console.log('Updating point', this.state.point);
  }
}
