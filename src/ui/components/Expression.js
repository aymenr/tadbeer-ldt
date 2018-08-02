import React, { Component } from 'react';
import Statement from './Statement';
import Blank from './Blank';
import { getCorrespEle } from '../helpers'
import update from 'immutability-helper';
import PropTypes from 'prop-types';

export default class Expression extends Statement {

  constructor(props) {
    super(props)
    this.initState();
  }

  initializeBlank = (focused, index) => {
    return this.addDefaults({
      type: 'blank',
      initFocused: focused
    }, index)
  }

  initState() {
    let state = {
      subexpr: [this.initializeBlank(this.props.initFocused, 0)] 
    }
    
    if (this.props.subexpr)
      state.subexpressions = this.props.subexpr.map(data => Object.assign({}, data))

    this.state = state;
  }

  addDefaults = (data, key) => {
    data.focusCallback = this.props.focusCallback;
    data.index = key;
    data.updateDataCb = this.updateDataCb;
    return data
  }

  //default child update strategy is to replace it
  updateDataCb = (data, key) => {
    if(data && data.type && data.type == 'delete') {
      this.setState({
        args: this.state.args.filter((_,i) => i != key)
      })
      return
    }
    
    this.addDefaults(data, key)
    let newSubexpr = update(this.state.subexpr, {[key]: {$set: data}}) 
    
    if(key == this.state.subexpr.length - 1) {
      newSubexpr = update(newSubexpr, {$push: [this.initializeBlank(true, key + 1)]}) 
    }

    this.setState({ subexpr: newSubexpr})
  }

  //testing this
  updateData = (data) => {
    if (this.props.updateDataCb){
      return this.props.updateDataCb(data, this.props.index)
    }
  }

  onClick = () => {
    this.props.focusCallback(this); 
  }

  render() {

    const {
      value 
    } = this.props;

    return (
        <span style= {this.state.focus? styles.focused: styles.none} onClick={this.onClick} >{this.state.subexpr.map((data, ind) => getCorrespEle({ ...data, key: ind })) }</span>
    )
  }
}
const styles = {
    focused: {
      backgroundColor:'#b8b8b8'
    },
    none:{
      backgroundColor:'white'
    }
}

Expression.propTypes = {
  focusCallback: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  updateDataCb: PropTypes.func.updateDataCb,
  value: PropTypes.string.isRequired
}
