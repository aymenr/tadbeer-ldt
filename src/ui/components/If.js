import React, { Component } from 'react';
import Statement from './Statement';
import Blank from './Blank';
import { getCorrespEle } from '../helpers'
import update from 'immutability-helper';
import PropTypes from 'prop-types';
import Block from './Block';

export default class If extends Statement {

  constructor(props) {
    super(props)
    this.initState();
  }

  initState() {
    let state = {
      focus: false,
      expression: this.initializeExpression(this.props.initFocused)
    }

    if(this.props.expression)
      state.expression = Object.assign({}, this.props.expression)
    this.state = state;
  }

  addDefaults = (data, key) => {
    data.focusCallback = this.props.focusCallback;
    data.index = key;
    data.updateDataCb = this.updateDataCb;
    return data
  }

  initializeExpression = (focused) => {
    //add default blank at end
    return this.addDefaults({
      type: 'expression',
      value: '',
      initFocused: focused
    }, 0)
  }
  //default child update strategy is to replace it
  updateDataCb = (data, key) => {
    if(data && data.type && data.type == 'delete') {
      this.setState({
        args: this.state.args.filter((_,i) => i != key)
      })

      data = this.initializeExpression()
    } 
    
    this.addDefaults(data, key)
    let newArgs = update(this.state.args, {[key]: {$set: data}}) 
    this.setState({ args: newArgs})
  
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
    let block = this.addDefaults({}, -1)
    return (
      <div>
        <span style= {this.state.focus? styles.focused: styles.none} onClick={this.onClick} >if</span>
        ( 
          {
            getCorrespEle({ ...this.state.expression, key: 0 })
          }
        ) {"{ \n" }
        { <Block {...this.state.expressions} {...block} />}
        { "}" }
      </div>
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

If.propTypes = {
  focusCallback: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  updateDataCb: PropTypes.func.updateDataCb,
  expression: PropTypes.object
}
