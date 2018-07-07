import React, { Component } from 'react';
import update from 'immutability-helper';
import { getCorrespButton } from '../../helpers';
import PropTypes from 'prop-types';

class Keyboard extends Component {
  constructor(props, editor) {
    super(props)
  }

  render = () => {
    return (
      <div>
        <button onClick={this.props.runCodeCb} >Run</button>
        {
        this.props.data.map((button,ind) => getCorrespButton({ ...button, key: ind, buttonCb: this.props.buttonCb }))
        }
      </div>
      )
  }
}

Keyboard.propTypes = {
  buttonCb: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  runCodeCb: PropTypes.func.isRequired
}

export default Keyboard;
