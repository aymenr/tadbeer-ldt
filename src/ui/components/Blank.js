import React from 'react';
import Statement from './Statement';

export default class Blank extends Statement {

  onClick = (ev) => {
    this.props.focusCallback(this);
  }

  updateData = (data) => {
    if (this.props.updateDataCb)
      return this.props.updateDataCb(data, this.props.key)

    //default implementation here
  }

  render() {
    return (
      <span onClick={this.onClick} >__</span>
    )
  }
}
