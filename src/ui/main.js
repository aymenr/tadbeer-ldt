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

const makeEditorData = () => {
  return [{
    type: 'blank'
  }]
}

export function connect(parentId, width, height) {

    const parentElem = document.getElementById(parentId)
    parentElem.style.width=width + 'px'
    parentElem.style.height=height + 'px'

    const guiContainer = document.createElement('div')
    parentElem.appendChild(guiContainer)
    let buttons = makeButtons()
    let editorData = makeEditorData()
    render(
        <UI buttons={buttons} initialEditorData={editorData} />,
        guiContainer
    );
}
