import React, { Component } from 'react';
import Statement from './Statement';
import Blank from './Blank';
import { getCorrespEle } from '../helpers'
import update from 'immutability-helper';
import PropTypes from 'prop-types';

export default class FuncCall extends Statement {

  constructor(props) {
    super(props)
    this.initState();
  }

  initState() {
    let state = {
      args: [],
      focus: false
    }

    // #TODO add ability to provide default args
    //for numArgs, push blanks
    let temp = [...Array(this.props.numArgs).keys()].map((_,index) => {
      state.args.push({
        type: 'blank',
        validCat: 'expression',
        updateDataCb: this.updateDataCb,
        focusCallback: this.props.focusCallback,
        index: index,
        initFocused: index == 0 ? true : false
      })
    })

    this.state = state;
  }

  addArgDefaults = (data, key) => {
    data.focusCallback = this.props.focusCallback;
    data.index = key;
    data.updateDataCb = this.updateDataCb;
  }
// 
  //default child update strategy is to replace it
  updateDataCb = (data, key) => {

    if(data && data.type && data.type == 'delete') {
      this.setState({
        args: this.state.args.filter((_,i) => i != key)
      })
    }

    this.addArgDefaults(data, key)
    let newArgs = update(this.state.args, {[key]: {$set: data}}) 
    this.setState({ args: newArgs})
  
  }

  onClick = () => {
    this.props.focusCallback(this); 
  }

  render() {

    const {
      name
    } = this.props;

    return (
      <div>
        <span onClick={this.onClick} >{name}</span>
        ( 
          {
            this.state.args.map((arg, ind) =>
              getCorrespEle({ ...arg, key: ind })
            )
          }
        )
      </div>
    )
  }
}

FuncCall.propTypes = {
  focusCallback: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  updateDataCb: PropTypes.func.updateDataCb,
  name: PropTypes.string.isRequired,
  numArgs: PropTypes.number.isRequired
}
