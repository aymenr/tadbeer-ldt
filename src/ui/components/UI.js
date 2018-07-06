import React, { Component } from 'react';
import update from 'immutability-helper';
import Editor from './Editor';
import Keyboard from './keyboard/Keyboard'

export default class UI extends Component {
  constructor(props) {
    super(props)
  }

  buttonCb = (data) => {
    this.editor.addData(data); 
  }

  render = () => {
    return (
      <div>
        <Editor ref={inst => this.editor = inst } initialData={this.props.initialEditorData} />
        <Keyboard data={this.props.buttons} buttonCb={this.buttonCb} />
      </div>
    )
  }
}
