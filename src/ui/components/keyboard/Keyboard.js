import React, { Component } from 'react';
import update from 'immutability-helper';
import { getCorrespButton } from '../../helpers';
import PropTypes from 'prop-types';
import {
  Tooltip,
} from 'react-tippy';

class Keyboard extends Component {
  constructor(props, editor) {
    super(props)
  }

  del = () => {
    this.props.buttonCb({
      type: 'delete'
    })
  }

  render = () => {
    let {
      data
    } = this.props;
    let openPop = data.open && data.open.popover ? data.open.popover : {},
        closePop = data.close && data.close.popover ? data.close.popover : {}
    return (
      <div style={style.container}>
        <header style={style.header}>
          <Tooltip style={style.headerButton} trigger="manual" {...openPop}>
          	<div onClick={this.props.runCodeCb} >chalao</div>
          </Tooltip>
          <Tooltip style={style.delButton} {...closePop}>
          	<div onClick={this.del}> mitao</div>
          </Tooltip>
        </header>
        {
          this.props.data.buttons.map((button,ind) => {
			button.popover = button.popover || {}
          	return (
				<Tooltip trigger="manual" {...button.popover}>
				{ getCorrespButton({ ...button, key: ind, buttonCb: this.props.buttonCb }) }
				</Tooltip>
			)}
          )
        }
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
  header: {
    backgroundColor: '#f1f5f6',
    height: '40px',
    marginBottom: '20px',
    borderBottom: '1px solid #d8d8d8'
  },
  headerButton: {
    backgroundColor: '#c5f67b',
//    height: '30px',
//    verticalAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    display: 'inline-block',
    marginRight: '10px',
    padding: '4px',
    boxShadow: '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
    float: 'right'
//    width: '50px'
 //   top: '5px'
  },
  delButton: {
    backgroundColor: '#ff8d8d',
//    height: '30px',
    marginRight: '10px',
//    verticalAlign: 'center',
    fontWeight: 'bold',
    display: 'inline-block',
    color: 'black',
    padding: '4px',
    boxShadow: '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
    float: 'right',
//    width: '50px',
  //  top: '5px'
  },
  container: {
    display: 'inline-block',
    backgroundColor: '#f2f6f7',
    width: '100%'
  }
}

export default Keyboard;
