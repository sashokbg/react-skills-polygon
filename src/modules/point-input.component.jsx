import React, {Component} from "react";

export class PointInputComponent extends Component {
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
      </div>
    )
  }

  handleValue(e) {
    let clone = this.state.point.clone();
    if (e.target.type === 'text') {
      clone.text = e.target.value;
    } else {
      clone.value = e.target.value;
    }

    this.props.handler(this.state.point, clone);

    this.setState({
      point: clone
    })
  }
}
