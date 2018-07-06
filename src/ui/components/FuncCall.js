import React, { Component } from 'react';
import Statement from './Statement';
import Blank from './Blank';
import { getCorrespEle } from '../helpers'

export default class FuncCall extends Statement {

  constructor(props) {
    super(props)
    this.initState();
  }

  initState() {
    let state = {
      args: [],
      focused: false
    }

    let temp = [...Array(this.props.numArgs).keys()].map(_ => {
      state.args.push({
        type: 'blank',
        validCat: 'expression',
        updateDataCb: this.updateDataCb,
        focusCallback: this.props.focusCallback
      })
    })

    this.state = state;
  }

  updateDataCb = (data, key) => {
    console.log(key)
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
