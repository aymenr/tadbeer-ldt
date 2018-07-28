import React, { StyleSheet } from 'react';
import Statement from './Statement';
import { getCorrespEle } from '../helpers'
import update from 'immutability-helper';
import PropTypes from 'prop-types';

export default class BinOp extends Statement {

  constructor(props) {
    super(props)
    this.initState()
  }

  initState = () => {
    this.state = {
      focus: this.props.initFocused
    }
  }

  onClick = async () => {
    await this.props.focusCallback(this)
  }

  updateData = (data) => {
    //just notify parent

    this.props.updateDataCb(data, this.props.index)
  }

  render = () => {
    const value =this.props.value

    return (
      <span style={this.state.focus? styles.focused: styles.none} onClick={this.onClick}>{value}</span>
      )
  }
}

BinOp.propTypes = {
  focusCallback: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  updateDataCb: PropTypes.func,
  value: PropTypes.number
}

const styles = {
  input: {
    border: 0,
    outline: 0,
    background: 'transparent',
    borderBottom: '1px solid black',
  },

  focused: {
    backgroundColor:'#b8b8b8'
  },
  none:{
    backgroundColor:'white'
  }
}

