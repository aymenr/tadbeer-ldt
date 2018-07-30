import Blank from './components/Blank';
import React from 'react';
import FuncCall from './components/FuncCall';
import NumberEle from './components/Number.js'
import ParamNumEle from './components/ParamNum.js'
import Expression from './components/Expression.js'
import { FuncCallButton, NumberButton, ParamNumButton} from './components/keyboard/index';
import If from './components/If.js';
import IfButton from './components/keyboard/IfButton.js'
import BinOpButton from './components/keyboard/BinOpButton.js'
import BinOp from './components/BinOp.js'

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
    case 'expression':
      return <Expression {...ele} />
    case 'if':
      return <If {...ele} />
    case 'binop':
      return <BinOp {...ele} />
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
    case 'if_button':
      return <IfButton {...button} />
    case 'binop_button':
      return <BinOpButton {...button} />
  }
}

export {
  getCorrespEle,
  getCorrespButton
}
