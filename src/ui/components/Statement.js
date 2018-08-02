import React, { Component } from 'react';

export default class Statement extends Component {

  constructor(props) {
    super(props);
    this.focus = false;
  }

  componentDidMount() {
    this._isMounted = true;
    if(this.props.nextFocus)
      this.props.focusCallback(this)
  }

  setFocus = (focus) => {
      return this.setState({ focus:focus })
      this.focus = true  
      return new Promise(resolve => resolve())
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentWillReceiveProps(newProps) {
    if (newProps.nextFocus && !this.props.nextFocus)
      this.props.focusCallback(this)
  }

  nextFocus() {
    this.props.updateDataCb({
        type: 'next_focus'
    }, this.props.index)
  }

  delElem = () => {
    if (this.props.updateDataCb)
      this.props.updateDataCb({
        type: 'delete',
      }, this.props.index)
  }

  render() {
    return false;
  }
}
