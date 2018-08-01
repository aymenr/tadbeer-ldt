import React, { Component } from 'react';
import PropTypes from 'prop-types';


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

        return ( 
        
            <div style = { styles.button } onClick = { this.onClick } > { value } </div>
        
        )
    }
}

const styles = {
    button: {
        backgroundColor: '#ffd475',
        fontFamily: 'apercu_monoregular',
        color: '#515a5a',
        boxShadow: '4px 0 2px 0 rgba(0, 0, 0, 0.5)',
        textAlign: 'center',
        padding: '5px',
   
        marginBottom: '10px',
        marginLeft:'20px'
    }
}

ParamNumButton.propTypes = {
    value: PropTypes.number.isRequired,
    buttonCb: PropTypes.func.isRequired
}

export default ParamNumButton;