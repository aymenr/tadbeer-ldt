import React, { Component } from 'react';

export default class Statement extends Component {

  constructor(props) {
    super(props);
    this.focus = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  setFocus = (focus) => {
      return this.setState({ focus:focus })
      this.focus = true  
      return new Promise(resolve => resolve())
  }

  componentWillUnmount() {
    this._isMounted = false;
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
