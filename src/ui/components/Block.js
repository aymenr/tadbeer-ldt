import React, { Component } from 'react';
import Blank from './Blank';
import FuncCall from './FuncCall';
import { getCorrespEle } from '../helpers';
import update from 'immutability-helper';

export default class Block extends Component {

  constructor(props) {
    super(props);
    this.initState();
  }

  initState = () => {
    this.state = {
      focused: null
    }

    if (this.props.statements) {
      this.state.statements = this.props.initialData.map((data, index) => {
        let d = Object.assign({}, data)
        if (this.props.initFocused && !index)
          d.initFocused = true
      })
    } else {
      this.state.statements = [this.initializeBlank(this.props.initFocused)]
    }

  }

  initializeBlank = (focused) => {
    //add default blank at end
    return {
      type: 'blank',
      initFocused: focused
    }
  }

  updateData = (data) => {
    if (this.props.updateDataCb){
      return this.props.updateDataCb(data, this.props.index)
    }
  }

  //default child update strategy is to replace it
  updateDataCb = (data, key) => {
    if (data && data.type && data.type == 'delete')
      return this.setState({
        statements: this.state.statements.filter((_,i) => i != key)
      })
    let newState = update(this.state.statements, {[key]: { $set: data }})
    if (key == newState.length - 1)
      newState = update(newState, {$push: [this.initializeBlank(false)]}) //add blank too

    this.setState({statements: newState })
  }

  render() {

    return (

      <div >
        {

        this.state.statements.map((statement, index) => getCorrespEle({ ...statement, key: index, focusCallback: this.props.focusCallback, updateDataCb: this.updateDataCb, index: index}) )
        }
      </div>
    )
  }
}
