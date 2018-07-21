import React from 'react'
import {render} from 'react-dom';

import UI from './components/UI';
import Slider from './components/Slider';


export function connect(parentId, buttons, codeCb, editorDefault) {

    const parentElem = document.getElementById(parentId)
    const guiContainer = document.createElement('div')
    guiContainer.classList.add("gui");

    parentElem.appendChild(guiContainer)
    render(
        <UI runCode={codeCb} buttons={buttons} initialEditorData={editorDefault} />,
        guiContainer
    );




}
export function connect_slider(parentId) {
  const parentElem = document.getElementById(parentId)
  const guiContainer = document.createElement('div')
  parentElem.appendChild(guiContainer)
  render(
      <Slider />,
      guiContainer
  );

}

export function deleteUI() {
	let gui = document.getElementsByClassName("gui")[0];
	gui.parentNode.removeChild(gui)

}
