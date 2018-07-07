import React, { StyleSheet } from 'react';
import Statement from './Statement';
import { getCorrespEle } from '../helpers'
import update from 'immutability-helper';
import PropTypes from 'prop-types';

export default class NumberEle extends Statement {

  constructor(props) {
    super(props)
    this.initState()
    this.input = null
  }

  componentDidMount = () => {
    this.onClick()
  }

  initState = () => {
    this.state = {
      value: this.props.initValue || ''
    }
  }

  onClick = async () => {
    await this.props.focusCallback(this)
    this.input.focus();
  }

  updateData = (data) => {
    //just notify parent
    this.props.updateDataCb(data, this.props.index)
  }

  render = () => {
    return (
      <span onClick={this.onClick}>
        <input style={styles.input} type='number' onChange={(ev) => this.setState({value: ev.target.value}) } ref={(ref) => this.input = ref } value={this.state.value} />
        <span style={{display: 'none'}}>{this.state.value}</span>
      </span>
    )
  }
}

NumberEle.propTypes = {
  focusCallback: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  updateDataCb: PropTypes.func,
  initValue: PropTypes.number
}

const styles = {
  input: {
    border: 0,
    outline: 0,
    background: 'transparent',
    borderBottom: '1px solid black',
  }
}

