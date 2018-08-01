import React, { Component } from 'react';
import update from 'immutability-helper';
import Editor from './Editor';
import Keyboard from './keyboard/Keyboard'
import Instructions from './Instructions'
import { compile } from '@sweet-js/core/dist/browser-sweet'
import Eval from '../../services/Eval'
import Urdu from '../../services/Urdu.sjs'
import PropTypes from 'prop-types';

export default class UI extends Component {
  constructor(props) {
    super(props)
  }

  //primary way of communicating between editor and keyboard
  buttonCb = (data) => {
    this.editor.addData(data); 
  }

  getCode = () => this.editor.getCode()

  runCode = () => {
    let code = this.getCode()
    this.props.runCode(code)
  }

  render = () => {
   
    return (
      <div style={styles.container}>
        <Editor ref={inst => this.editor = inst } initialData={this.props.initialEditorData} />
        <Keyboard  data={this.props.buttons} buttonCb={this.buttonCb} runCodeCb={this.runCode}/>
        <Instructions instructions={this.props.instructions} />
      </div>
    )
  }
}

const styles = {
  container: {
    backgroundColor: 'white'
  }
}
UI.propTypes = {
  runCode: PropTypes.func.isRequired,
  initialEditorData: PropTypes.array.isRequired,
  buttons: PropTypes.object.isRequired,
  instructions: PropTypes.object.isRequired
}



class Text extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <h3>{this.props.text}</h3>;
  }
}


