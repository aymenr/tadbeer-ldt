import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IfButton extends Component {

  onClick = () => {
    let data = {
      type: 'if'
    }

    this.props.buttonCb(data);
  }

  render = () => {
    const {
      name
    } = this.props;

    return (
      <div style = {styles.button} onClick={this.onClick}>If</div>
    )
  }
}
const styles ={
button: {
    backgroundColor: '#c597f3',
    fontFamily:'apercu_monoregular',
    fontSize: '14px',
    color: 'black',
    boxShadow: '4px 0 2px 0 rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    padding: '5px',
    marginBottom:'10px',
    marginLeft:'10px'
  }
}

IfButton.propTypes = {
  buttonCb: PropTypes.func.isRequired
}

export default IfButton;
