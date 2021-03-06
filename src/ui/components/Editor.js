import React, { Component } from 'react';
import Blank from './Blank';
import FuncCall from './FuncCall';
import { getCorrespEle } from '../helpers';
import update from 'immutability-helper';
import  '~/assets/fonts/stylesheet.css';

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
      type: 'blank'
    }
  }

  focusCallback = (comp) => {
   
    if (this.state.focused ) {
      this.state.focused.setFocus(false)
    }

    this.setState({focused: comp})
    return comp.setFocus(true);
  }

  addData = (data) => {
 
    if (!this.state.focused)
      return

    if (data.type && data.type == 'delete') {
      this.state.focused.delElem()
      return
    }
    console.log('state:',this.state)
    this.state.focused.updateData(data);
  }

  //default child update strategy is to replace it
  updateDataCb = (data, key) => {
   
    if (data && data.type){
      if(data.type == 'delete') {
        if (this.state.statements[key].type =="blank")
          return

        return this.setState({
          statements: this.state.statements.filter((_,i) => i != key)
        })
      }else if (data.type =='next_focus') {
        if (key + 1 < this.state.statements.length) {
          let newS = update(this.state, {statements: {[key + 1]: {$merge: {nextFocus: true} } } })
          this.setState(newS)
          return
        }
      }
   }

    let newState = update(this.state.statements, {[key]: { $set: data }})
    if (key == newState.length - 1) {
      newState = update(newState, {$push: [this.initializeBlank()]}) //add blank too
    }

    this.setState({statements: newState })
  }

  //hacky way right now. Can be done in a much better way
  getCode = () => {
    let html = this.container.innerHTML
    html = html.replace(/<[^>]*>/g, "");
    return this.htmlDecode(html.replace(/__/g, "")); //remove blanks
  }

  htmlDecode = (input) => {
    var e = document.createElement('div');
    e.innerHTML = input;
    // handle case of empty input
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  render() {

    return (

      <div style={styles.editor} ref={ref => this.container = ref } >
        {

        this.state.statements.map((statement, index) => getCorrespEle({ ...statement, key: index, focusCallback: this.focusCallback, updateDataCb: this.updateDataCb, index: index}) )
        }
      </div>
    )
  }
}

const styles = {
  editor: {

    padding:'10px',
    fontFamily:'apercu_monoregular',
    color:'#7a46af',
    marginBottom:'10px'
    
  }
}
