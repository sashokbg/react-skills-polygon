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
        <input type="number" onChange={(e) => this.handleValue(e)} placeholder="Value 1-10"/>
        <input type="text" onChange={(e) => this.handleValue(e)} placeholder="Text"/>
      </div>
    )
  }

  handleValue(e) {
    if(e.target.type === 'text') {
      this.state.point.text = e.target.value;
    } else {
      this.state.point.value = e.target.value;
    }
    this.props.handler(this.state.point);
  }
}
