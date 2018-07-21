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
  initializeBlank = () => {
    //add default blank at end
    return {
      type: 'blank'
    }
  }
  //default child update strategy is to replace it
  updateDataCb = (data, key) => {
    console.log('before',this.state.args)
    if(data && data.type && data.type == 'delete') {
      this.setState({
        args: this.state.args.filter((_,i) => i != key)
      })
      console.log(this.state.args)
      data = this.initializeBlank()
    } 
    

    this.addArgDefaults(data, key)
    let newArgs = update(this.state.args, {[key]: {$set: data}}) 
    this.setState({ args: newArgs})
  
  }
  //testing this
   updateData = (data) => {
   
    if (this.props.updateDataCb){

      return this.props.updateDataCb(data, this.props.index)
    }

    //default implementation here
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
        <span style= {this.state.focus? styles.blank : styles.none} onClick={this.onClick} >{name}</span>
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
const styles = {
    blank: {
      backgroundColor:'#b8b8b8'
    },
    none:{
      backgroundColor:'white'
    }
}

FuncCall.propTypes = {
  focusCallback: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  updateDataCb: PropTypes.func.updateDataCb,
  name: PropTypes.string.isRequired,
  numArgs: PropTypes.number.isRequired
}
