import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NumberButton extends Component {

  onClick = () => {
    let data = {
      type: 'number'
    }

    this.props.buttonCb(data);
  }

  render = () => {
    const {
      name
    } = this.props;

    return (
      <div onClick={this.onClick}>number</div>
    )
  }
}

NumberButton.propTypes = {
  buttonCb: PropTypes.func.isRequired
}

export default NumberButton;
