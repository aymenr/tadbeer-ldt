import React, { Component } from 'react';
import update from 'immutability-helper';
import PropTypes from 'prop-types';
import  '~/assets/fonts/stylesheet.css';

class Error extends Component {
    constructor(props, editor) {
        super(props)
       
    }
    // JUST RETURN JSX FROM LEVEL
    render = () => {
        
        return ( 
          this.props.error
           
        )
    }
}

Error.propTypes = {
    error: PropTypes.object.isRequired
}



export default Error;