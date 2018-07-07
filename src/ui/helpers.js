import Blank from './components/Blank';
import React from 'react';
import FuncCall from './components/FuncCall';
import NumberEle from './components/Number.js'
import { FuncCallButton, NumberButton } from './components/keyboard/index';

const getCorrespEle = (ele) => {
  switch (ele.type) {
    case 'blank':
      return <Blank { ...ele } />
    case 'func_call':
      return <FuncCall { ...ele } />
    case 'number':
      return <NumberEle {...ele } />
  }
}

const getCorrespButton = (button) => {
  switch (button.type) {
    case 'func_call_button':
      return <FuncCallButton { ...button } />
    case 'number_button':
      return <NumberButton {...button } />
  }
}

export {
  getCorrespEle,
  getCorrespButton
}
