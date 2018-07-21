import React, { StyleSheet } from 'react';
import Statement from './Statement';
import { getCorrespEle } from '../helpers'
import update from 'immutability-helper';
import PropTypes from 'prop-types';

export default class ParamNum extends Statement {

  constructor(props) {
    super(props)
    this.initState()
    this.input = null
  }

  initState = () => {
    this.state = {
      value: this.props.initValue || ''
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
      <span style={this.state.focus? styles.blank : styles.none} onClick={this.onClick}>{value}</span>
    )
  }
}

ParamNum.propTypes = {
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

    blank: {
      backgroundColor:'#b8b8b8'
    },
    none:{
      backgroundColor:'white'
    
}
}

