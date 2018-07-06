import Blank from './components/Blank';
import React from 'react';
import FuncCall from './components/FuncCall';
import { FuncCallButton } from './components/keyboard/index';

const getCorrespEle = (ele) => {
  switch (ele.type) {
    case 'blank':
      return <Blank { ...ele } />

    case 'func_call':
      return <FuncCall { ...ele } />
  }
}

const getCorrespButton = (button) => {
  switch (button.type) {
    case 'func_call_button':
      return <FuncCallButton { ...button } />
  }
}

export {
  getCorrespEle,
  getCorrespButton
}
