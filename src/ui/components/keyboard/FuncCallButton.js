import React, { Component } from 'react';
import PropTypes from 'prop-types';
import  '~/assets/fonts/stylesheet.css';


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
    fontSize: '14px',
    color: 'black',
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
