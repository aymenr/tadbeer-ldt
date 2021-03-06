import React from 'react';
import Statement from './Statement';
import PropTypes from 'prop-types';

export default class Blank extends Statement {

  constructor(props) {
    super(props)
    this.initState()
  }

  initState = () => {
    const {
      initFocused,
      focusCallback
    } = this.props;

    this.state = {}
  }

  componentDidMount = () => {
    if (this.props.initFocused)
      this.props.focusCallback(this)
  }

  onClick = (ev) => {
    this.props.focusCallback(this);
  }

  updateData = (data) => {
   
    if (this.props.updateDataCb){
      return this.props.updateDataCb(data, this.props.index)
    }

    //default implementation here
  }

  render() {
    return (
      <span style= {this.state.focus? styles.blank : styles.none}  onClick={this.onClick} >__</span>
    )
  }
}
const styles = {
    blank: {
      backgroundColor:'#b8b8b8'
    },
    none:{
      backgroundColor:'white'
    }
}

Blank.propTypes = {
  focusCallback: PropTypes.func.isRequired,
  updateDataCb: PropTypes.func,
  index: PropTypes.number,
  initFocused: PropTypes.bool
}
