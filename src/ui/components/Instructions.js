import React, { Component } from 'react';
import update from 'immutability-helper';
import PropTypes from 'prop-types';
import  '~/assets/fonts/stylesheet.css';

class Instructions extends Component {
    constructor(props, editor) {
        super(props)
       
    }
    // JUST RETURN JSX FROM LEVEL
    render = () => {
        
        return ( 
          this.props.instructions
           
        )
    }
}

Instructions.propTypes = {
    instructions: PropTypes.array.isRequired
}



export default Instructions;