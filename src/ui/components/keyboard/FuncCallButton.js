import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import  '../../../fonts/stylesheet.css';

//import myfont from '../../../fonts/apercu_mono-webfont.woff2';

// injectGlobal`
//   @font-face {
//     font-family: 'apercu_monoregular';
//     src: url(${myFont}) format('truetype');
//     font-weight: normal;
//     font-style: normal;s
//   }
// `;
//import ReactFontFace from 'react-font-face'
// SHOWS IMPORT OF LOCAL FILE
//import apercuMono from '../../../fonts/apercu_mono-webfont.woff'

class FuncCallButton extends Component {

  onClick = () => {
    let data = {
      name: this.props.name,
      numArgs: this.props.numArgs,
      type: 'func_call'
    }

    this.props.buttonCb(data);
  }

  render = () => {
    const {
      name
    } = this.props;
    return (
      <div style={styles.container} >
        <div style={styles.button} onClick={this.onClick}>{name}()</div>
      </div>
    )
  }
}

const styles = {
  button: {
    backgroundColor: '#c597f3',
    fontFamily:'apercu_monoregular',
    color: '#515a5a',
    width: '70%',
    display: 'inline-block',
    margin: 'auto',
    boxShadow: '4px 0 2px 0 rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    padding: '5px',
  },
  container: {

    display: 'inline-flex',
    width: '35%'
  }
}

FuncCallButton.propTypes = {
  name: PropTypes.string.isRequired,
  numArgs: PropTypes.number.isRequired,
  buttonCb: PropTypes.func.isRequired
}

export default FuncCallButton;
