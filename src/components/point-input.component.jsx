import React, {Component} from "react";

export class PointInputComponent extends  Component{
  constructor(props) {
    super(props); // Properties are read only
  }

  handleChange(event) {
    this.props.handler(event, this.props.point)
  }

  render() {
    return (
      <div>
        <input type="number" value={this.props.point.value}
               onChange={(e) => this.handleChange(e)} placeholder="Value 1-10"/>

        <input type="text" value={this.props.point.text}
               onChange={(e) => this.handleChange(e) } placeholder="Text"/>
        <button onClick={() => this.delete()}>Delete</button>
      </div>
    )
  }

  delete() {
    this.props.onDelete(this.props.point)
  }

}
