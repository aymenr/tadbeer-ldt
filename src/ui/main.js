import React from 'react'
import {render} from 'react-dom';

import UI from './components/UI';


export function connect(parentId, buttons, codeCb, editorDefault) {

    const parentElem = document.getElementById(parentId)
    const guiContainer = document.createElement('div')
    parentElem.appendChild(guiContainer)
    render(
        <UI runCode={codeCb} buttons={buttons} initialEditorData={editorDefault} />,
        guiContainer
    );
}
