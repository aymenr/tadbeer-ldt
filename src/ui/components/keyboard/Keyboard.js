import React, { Component } from 'react';
import update from 'immutability-helper';
import { getCorrespButton } from '../../helpers';
import PropTypes from 'prop-types';

import  '~/assets/fonts/stylesheet.css';
import {
  Tooltip,
} from 'react-tippy';


class Keyboard extends Component {
    constructor(props, editor) {
        super(props)
        this.initState()
        this.running = false
    }

    initState = () => {
    this.state = {
      data: this.props.data,
      tutorial:this.props.tutorial,
      open: this.props.data.open,
      close:this.props.data.close
    }
  }

    del = () => {
      this.processTutorial()
        this.props.buttonCb({
            type: 'delete'
        })
    }

    matchPointWithButton = (button,point)=> {
      if (button.type == point.type) {
            if (button.type=="func_call_button") {
              return button.name == point.name
            } else if (button.type =="param_num") {
              return button.value ==point.value
            }
          }
          return false
    }
    processTutorial = (name) =>{
      if (typeof this.state.tutorial ==='undefined' || this.state.tutorial.pointOrder.length ==0){
        return this.state.data
      }
      let newData = this.state.data 
      let updatedTutorialPointOrder = this.state.tutorial.pointOrder

      let removeTipFrom = updatedTutorialPointOrder.shift()
      if (removeTipFrom.type=="header"){ //if its a header button
          if (removeTipFrom.name == "chalao") {
            newData.open.popover.open = false
          } else if (removeTipFrom.name ="mitao") {
            newData.close.popover.close = false
          }
        } else {
      newData.buttons.find(o => this.matchPointWithButton(o,removeTipFrom)).popover = {open: false};//u0date so can remove params too
      }
      
      if (updatedTutorialPointOrder.length != 0){ // add new tool tip
        let addTipTo = updatedTutorialPointOrder[0]
        
        if (addTipTo.type=="header"){ //if its a header button
          if (addTipTo.name == "chalao") {
            newData.open.popover.open = true
          } else if (addTipTo.name ="mitao") {
            newData.close.popover.close = true
          }
        } else {
           newData.buttons.find(o => this.matchPointWithButton(o,addTipTo)).popover =  {open:true,title: 'dabao',theme:'light',arrow:true};
      
        }

        }
        return newData
    }

    buttonCb = (data,name) => {
      //changes tooltip depending on button pressed
      let newData = this.processTutorial(name)

      this.setState(data:newData)
      this.props.buttonCb(data)
    }

    runCodeCb = () =>{
      this.setState({data:this.processTutorial()})
      this.props.runCodeCb()
    }

  render = () => {
    let {
      data
    } = this.props;
    // let openPop = data.open && data.open.popover ? data.open.popover : {},
    //     closePop = data.close && data.close.popover ? data.close.popover : {}
    //     console.log('state:',this.state)
    return (
      <div style={style.container}>
        <header style={style.header}>

          <Tooltip style = {style.toolTip} trigger="manual" {...this.state.open.popover}>
            <div className ="run-button" style ={style.headerButton} onClick={this.runCodeCb} >chalao</div>
          </Tooltip>
          <Tooltip  {...this.state.close.popover}>
            <div style ={style.delButton} onClick={this.del}> mitao</div>
          </Tooltip>
        </header>

        <div style ={style.codeButtons}>
        <div style={style.functions}> 
        {
          this.state.data.buttons.map((button,ind) => {
           if(button.type=="func_call_button" || button.type=="if_button"){
              button.popover = button.popover || {}
              return (
                <Tooltip style = {style.toolTip} trigger="manual" {...button.popover}>
                  { getCorrespButton({ ...button, key: ind, buttonCb: this.buttonCb }) }
                </Tooltip>
              )
           } 
         })
        }
      </div>
      <div style={style.params}> 
        {
          this.state.data.buttons.map((button,ind) => {
           if(button.type=="param_num" ){
              button.popover = button.popover || {}
              return (
                <Tooltip trigger="manual" {...button.popover}>
                  { getCorrespButton({ ...button, key: ind, buttonCb: this.buttonCb }) }
                </Tooltip>
              )
           } 
         })
        }
      </div>
      </div>
      </div>


      )
  }
}



Keyboard.propTypes = {
    buttonCb: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    runCodeCb: PropTypes.func.isRequired,
    tutorial: PropTypes.tutorial
}

const style = {
    codeButtons: {
      padding:'10px',
      display:'flex',
      flexDirection:'row'
    },

    toolTip: {
        fontFamily:'apercubold'
        // fontSize:'100px'
    },
   
    functions: {
      flex:'2 0 0',
      display:'flex',
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent:'flex-start'
    },
    params: {

      flex:'1 0 0',
      display:'flex',
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent:'flex-start'
    },
    header: {
        backgroundColor: '#f1f5f6',
        padding:'10px',
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-end',
        borderBottom: '1px solid #d8d8d8',
        
    },
    headerButton: {
        fontFamily: 'apercubold',
        marginRight:'10px',
        backgroundColor: '#c5f67b',
        fontWeight: 'bold',
        color: 'black',
        padding: '4px',
        boxShadow: '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)'

    },
    disabledHeaderButton: {
        fontFamily: 'apercubold',
        backgroundColor: 'black',
        fontWeight: 'bold',
        color: 'black',
        padding: '4px',
        boxShadow: '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
    },
    delButton: {
        fontFamily: 'apercubold',
        backgroundColor: '#ff8d8d',
        fontWeight: 'bold',
        color: 'black',
        padding: '4px',
        boxShadow: '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
    },
    container: {
        display: 'inline-block',
       
        backgroundColor: '#f2f6f7',
        width: '100%'



    }
}

export default Keyboard;