import React, { Component } from 'react';
import Blank from './Blank';
import FuncCall from './FuncCall';
import { getCorrespEle } from '../helpers';

export default class Editor extends Component {

  constructor(props) {
    super(props);
    this.initState();
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
    comp.setFocus(true);
  }

  addData = (data) => {
    if (!this.state.focused)
      return

    this.state.focused.updateData(data);
  }

  render() {
    return (
      <div>
        {
        this.state.statements.map((statement, index) => getCorrespEle({ ...statement, key: index, focusCallback: this.focusCallback }) )
        }
      </div>
    )
  }
}
