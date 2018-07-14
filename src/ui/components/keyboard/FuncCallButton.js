import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    backgroundColor: 'white',
    color: '#2890ab',
    width: '25%',
    borderBottom: '1px solid #2890ab',
    margin: 'auto',
    textAlign: 'center',
    padding: '5px',
    marginBottom: '20px'
  },
  container: {
    display: 'inline-block',
    width: '50%',
  }
}

FuncCallButton.propTypes = {
  name: PropTypes.string.isRequired,
  numArgs: PropTypes.number.isRequired,
  buttonCb: PropTypes.func.isRequired
}

export default FuncCallButton;
