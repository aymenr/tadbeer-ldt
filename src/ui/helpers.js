import Blank from './components/Blank';
import React from 'react';
import FuncCall from './components/FuncCall';
import NumberEle from './components/Number.js'
import ParamNumEle from './components/ParamNum.js'
import { FuncCallButton, NumberButton, ParamNumButton} from './components/keyboard/index';

const getCorrespEle = (ele) => {
  switch (ele.type) {
    case 'blank':
      return <Blank { ...ele } />
    case 'func_call':
      return <FuncCall { ...ele } />
    case 'number':
      return <NumberEle {...ele } />
    case 'param_nums':
      return <ParamNumEle {...ele} />
  }
}

const getCorrespButton = (button) => {
  switch (button.type) {
    case 'func_call_button':
      return <FuncCallButton { ...button } />
    case 'number_button':
      return <NumberButton {...button } />
    case 'param_num':
      return <ParamNumButton {...button}/>
  }
}

export {
  getCorrespEle,
  getCorrespButton
}
