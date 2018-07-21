import React, { Component } from 'react';

export default class Statement extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

    this._isMounted = true;
  }

  setFocus = (focus) => {
    if (this._isMounted)
      return this.setState({ focus:focus })
    else
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
