import React, { Component } from 'react';
import update from 'immutability-helper';
import { getCorrespButton } from '../../helpers';
import PropTypes from 'prop-types';
//import  '~/assets/fonts/stylesheet.css';

class Keyboard extends Component {
    constructor(props, editor) {
        super(props)
        this.running = false
    }

    del = () => {
        this.props.buttonCb({
            type: 'delete'
        })
    }

    render = () => {

        return ( 
            <div style = { style.container } >
              <header style = { style.header } >
                <div className = "run-button" style = { style.headerButton } onClick = { this.props.runCodeCb } > chalao </div> 
                <div style = { style.delButton } onClick = { this.del } > mitao </div>
              </header> 
              <div style ={style.codeButtons}>
                <div style={style.functions}>
                  {
                    this.props.data.map((button, ind) => {
                      console.log(button)
                    if (button.type=="func_call_button")
                      return getCorrespButton({ ...button, key: ind, buttonCb: this.props.buttonCb })
                  })
            
                  } 
                </div>
                <div style={style.params}>
                  {
                    this.props.data.map((button, ind) => {
                    if (button.type=="param_num")
                      return getCorrespButton({ ...button, key: ind, buttonCb: this.props.buttonCb })
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
    data: PropTypes.array.isRequired,
    runCodeCb: PropTypes.func.isRequired
}

const style = {
    codeButtons: {
      padding:'10px',
      display:'flex',
      flexDirection:'row'
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