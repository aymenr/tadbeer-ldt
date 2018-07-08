import React from 'react'
import {render} from 'react-dom';

import UI from './components/UI';

const makeButtons = () => {
  let buttons = [{
    type: 'func_call_button',
    name: 'uper',
    numArgs: 1
  },
    {
    type: 'number_button' 
  }]
  return buttons;
}


export function connect(parentId, buttons, codeCb, editorDefault) {

    const parentElem = document.getElementById(parentId)
    const width = window.innerWidth * window.devicePixelRatio
    const height = window.innerHeight * window.devicePixelRatio
 
    parentElem.style.width=width + 'px'
    parentElem.style.height=height + 'px'

    const guiContainer = document.createElement('div')
    parentElem.appendChild(guiContainer)
    render(
        <UI runCode={codeCb} buttons={buttons} initialEditorData={editorDefault} />,
        guiContainer
    );
}
