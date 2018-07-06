import React, { Component } from 'react';
import update from 'immutability-helper';
import { getCorrespButton } from '../../helpers';
import PropTypes from 'prop-types';

class Keyboard extends Component {
  constructor(props, editor) {
    super(props)
  }

  render = () => {
    return this.props.data.map((button,ind) => getCorrespButton({ ...button, key: ind, buttonCb: this.props.buttonCb }))
  }
}

Keyboard.propTypes = {
  buttonCb: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired
}

export default Keyboard;
