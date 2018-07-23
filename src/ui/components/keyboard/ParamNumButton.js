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

class ParamNumButton extends Component {

    onClick = () => {
               let data = {
            value: this.props.value,
            type: 'param_nums'
        }

        this.props.buttonCb(data);
    }

    render = () => {
        const value = this.props.value;

        return ( <
            div style = { styles.container } >
            <div style = { styles.button } onClick = { this.onClick } > { value } </div>
            </div>
        )
    }
}

const styles = {
    button: {
        backgroundColor: '#ffd475',
        fontFamily: 'apercu_monoregular',
        color: '#515a5a',
        boxShadow: '4px 0 2px 0 rgba(0, 0, 0, 0.5)',
        width: '40%',
        margin: 'auto',
        textAlign: 'center',
        padding: '5px',
        marginBottom: '25%'
    },
    container: {
        display: 'inline-flex',
        width: '15%'
    }
}

ParamNumButton.propTypes = {
    value: PropTypes.number.isRequired,
    buttonCb: PropTypes.func.isRequired
}

export default ParamNumButton;