import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IfButton extends Component {

  onClick = () => {
    let data = {
      type: 'if'
    }

    this.props.buttonCb(data);
  }

  render = () => {
    const {
      name
    } = this.props;

    return (
      <div onClick={this.onClick}>If</div>
    )
  }
}

IfButton.propTypes = {
  buttonCb: PropTypes.func.isRequired
}

export default IfButton;
