import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BinOpButton extends Component {

  onClick = () => {
    let data = {
      type: 'binop',
      value: this.props.value
    }

    this.props.buttonCb(data);
  }

  render = () => {
    const {
      value 
    } = this.props;

    return (
      <div onClick={this.onClick}>{this.props.value}</div>
    )
  }
}

BinOpButton.propTypes = {
  buttonCb: PropTypes.func.isRequired
}

export default BinOpButton;
