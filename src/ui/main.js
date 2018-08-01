import React from 'react'
import {render} from 'react-dom';

import UI from './components/UI';
import Slider from './components/Slider';



export function update(parentId, buttons, codeCb, editorDefault, instructions) {
	const guiContainer = document.querySelector('.gui')
	render(
		<UI runCode={codeCb} buttons={buttons} initialEditorData={editorDefault} />,
		guiContainer
	)
}

export function connect(parentId, buttons, codeCb, editorDefault,instructions) {

    //HTML structure, is it better to use react to render this or attach it to the dom like this???
    //content -> gui -> editor + keyboard 
                        //body-text ->errors 
                            // -> instructions
    const parentElem = document.getElementById(parentId)

    //create all the elements that i need to append to parent, errors will be later shifted to popups components 
    const guiContainer = document.createElement('div')
    guiContainer.classList.add("gui");
    const bodyTextElem = document.createElement('div')
    bodyTextElem.classList.add('body-text')
    const errorsElem = document.createElement('div')
    errorsElem.classList.add('errors')
    errorsElem.style.color = 'red'


    const instructionsElem = document.createElement('div')
    instructionsElem.classList.add('instructions')


    instructionsElem.innerHTML = "<h3> Instructions</h3>" + instructions
    bodyTextElem.appendChild(errorsElem)
    bodyTextElem.appendChild(instructionsElem)
    

    parentElem.appendChild(guiContainer)
    render(
        <UI runCode={codeCb} buttons={buttons} initialEditorData={editorDefault} />,
        guiContainer
    );
    guiContainer.appendChild(bodyTextElem)



}
export function connect_slider(parentId,sliderCb,context) {
 
  const parentElem = document.getElementById(parentId)
  const sliderContainer = document.createElement('div')
  sliderContainer.classList.add("slider");
  parentElem.appendChild(sliderContainer)
  render(
      <Slider atLastSlide={sliderCb}  />,
      sliderContainer
  );


}
// should probably be a component RIGHT? render vs appending?
export function showError(error) {
  
  if(error =="obstruction_error"){  
      error = 'Basheer siraf sarak pay chal sakta hay'
  } else if (error =='outofbounds_error') {
    error = 'Basheer dabbon say bahir nahi ja sakta'
  }
  const errorsElem = document.getElementsByClassName('errors')[0]
  errorsElem.innerHTML = '<h3>' + error +'</h3>'

}


export function deleteUI() {
	let gui = document.getElementsByClassName("gui")[0];
	gui.parentNode.removeChild(gui)

}
export function delete_slider() {
  let gui = document.getElementsByClassName("slider")[0];
  gui.parentNode.removeChild(gui)

}
