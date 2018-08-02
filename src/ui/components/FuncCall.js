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

    state.args = this.initializeArgs(this.props)
    if (!state.args.length)
      this.nextFocus()
    this.state = state;
  }

  initializeArgs = (props) => {
    let args = []
    if (props.args) {
      args = props.args.map((arg, index) => {
        let newArg = Object.assign({}, arg) //copy over
        this.addArgDefaults(newArg, index) 
        return newArg
      })
    } else {
        //for numArgs, push blanks
      let temp = [...Array(props.numArgs).keys()].map((_,index) => {
        args.push({
          type: 'blank',
          validCat: 'expression',
          updateDataCb: this.updateDataCb,
          focusCallback: props.focusCallback,
          index: index,
          initFocused: index == 0 ? true : false
        })
      })
    }
    return args
  }
  componentWillReceiveProps(next) {
    super.componentWillReceiveProps(next)
    if(next.name == this.props.name)
      return
    let args =  this.initializeArgs(next)
    this.setState({args})
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
    
    let argsLeft = newArgs.filter(n => n.type == 'blank')
    if(!argsLeft.length)
        this.nextFocus()
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
