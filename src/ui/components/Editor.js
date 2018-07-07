import React, { Component } from 'react';
import Blank from './Blank';
import FuncCall from './FuncCall';
import { getCorrespEle } from '../helpers';
import update from 'immutability-helper';

export default class Editor extends Component {

  constructor(props) {
    super(props);
    this.initState();
    this.container = null;
  }

  initState = () => {
    this.state = {
      statements: this.props.initialData.map(data => Object.assign({}, data)),
      focused: null
    }
  }

  initializeBlank = () => {
    //add default blank at end
    return {
      name: 'blank'
    }
  }

  focusCallback = (comp) => {
    if (this.state.focused) {
      this.state.focused.setFocus(false)
    }

    this.setState({focused: comp})
    return comp.setFocus(true);
  }

  addData = (data) => {
    if (!this.state.focused)
      return

    this.state.focused.updateData(data);
    console.log(this.getCode())
  }

  //default child update strategy is to replace it
  updateDataCb = (data, key) => {
    let newStatements = update(this.state.statements, {[key]: { $set: data }})
    //add blank too
    let newState = update(newStatements, {$push: [this.initializeBlank()]})
    this.setState({statements: newState })
  }

  //hacky way right now. Can be done in a much better way
  getCode = () => {
    let html = this.container.innerHTML
    return html.replace(/<[^>]*>/g, "");
  }

  render() {
    return (
      <div ref={ref => this.container = ref } >
        {
        this.state.statements.map((statement, index) => getCorrespEle({ ...statement, key: index, focusCallback: this.focusCallback, updateDataCb: this.updateDataCb, index: index}) )
        }
      </div>
    )
  }
}
