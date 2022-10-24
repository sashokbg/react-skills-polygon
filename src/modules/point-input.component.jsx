import React, {Component} from "react";

export class PointInputComponent extends  Component{
  constructor(props) {
    super(props); // Properties are read only

    this.state = {
      point: props.point
    }
  }

  render() {
    return (
      <div>
        <input type="number" value={this.state.point.value}
               onChange={(e) => this.handleValue(e)} placeholder="Value 1-10"/>

        <input type="text" value={this.state.point.text}
               onChange={(e) => this.handleValue(e)} placeholder="Text"/>
        <button onChange={() => this.delete()}>Delete</button>
      </div>
    )
  }

  delete() {

  }

  handleValue(e) {
    if(e.target.type === 'text') {
      this.state.point.text = e.target.value;
    } else {
      this.state.point.value = e.target.value;
    }

    this.setState({
      point: this.props.point
    })
    this.props.handler(this.state.point);
  }
}
