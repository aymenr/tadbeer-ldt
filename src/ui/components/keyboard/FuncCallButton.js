import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FuncCallButton extends Component {

  onClick = () => {
    let data = {
      name: this.props.name,
      numArgs: this.props.numArgs,
      type: 'func_call'
    }

    this.props.buttonCb(data);
  }

  render = () => {
    const {
      name
    } = this.props;

    return (
      <div onClick={this.onClick}>{name}</div>
    )
  }
}

FuncCallButton.propTypes = {
  name: PropTypes.string.isRequired,
  numArgs: PropTypes.number.isRequired,
  buttonCb: PropTypes.func.isRequired
}

export default FuncCallButton;
