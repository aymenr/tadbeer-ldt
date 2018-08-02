import React from 'react'
import {render} from 'react-dom';

import UI from './components/UI';
import Slider from './components/Slider';
import Slider2 from './components/Slider2';
import Slider3 from './components/Slider3';
import Slider4 from './components/Slider4';




export function update(parentId, buttons, codeCb, editorDefault, instructions) {
	const guiContainer = document.querySelector('.gui')
	render(
		<UI runCode={codeCb} buttons={buttons} initialEditorData={editorDefault} instructions ={instructions} />,
		guiContainer
	)
}

export function connect(parentId, buttons, codeCb, editorDefault,instructions,tutorial) {
    //HTML structure, is it better to use react to render this or attach it to the dom like this???
    //content -> gui -> editor + keyboard 
                        //body-text ->errors 
                            // -> instructions
    const parentElem = document.getElementById(parentId)

    //create all the elements that i need to append to parent, errors will be later shifted to popups components 
    const guiContainer = document.createElement('div')
    guiContainer.classList.add("gui");
    guiContainer.style.marginTop = '10px';
    const bodyTextElem = document.createElement('div')
    bodyTextElem.classList.add('body-text')
    const errorsElem = document.createElement('div')
    errorsElem.classList.add('errors')
    errorsElem.style.color = 'red'


    


    bodyTextElem.appendChild(errorsElem)
    
    

    parentElem.appendChild(guiContainer)
    render(
        <UI runCode={codeCb} buttons={buttons} initialEditorData={editorDefault} instructions={instructions} tutorial = {tutorial} />,
        guiContainer
    );
    guiContainer.appendChild(bodyTextElem)



}
export function connect_slider(parentId,sliderCb,number) {
  console.log("CONNECTING SLIDER");
  const parentElem = document.getElementById(parentId)
  const sliderContainer = document.createElement('div')
  sliderContainer.classList.add("slider");
  parentElem.appendChild(sliderContainer)
  if (number ==1) {
     render(
      <Slider atLastSlide={sliderCb}  />,
      sliderContainer
  );
  } else if (number ==2) {
     render(
      <Slider2 atLastSlide={sliderCb}  />,
      sliderContainer
  );
  } else if (number ==3) {
     render(
      <Slider3 atLastSlide={sliderCb}  />,
      sliderContainer
  );
  } else if (number ==4) {
     render(
      <Slider4 atLastSlide={sliderCb}  />,
      sliderContainer
  );
  }


}

export function toggleRunButton(enabled) {
  const runButton = document.getElementsByClassName('run-button')[0]
  if (enabled) 
    runButton.style.backgroundColor = "#c5f67b"
  else
     runButton.style.backgroundColor = "#bdbdbd"
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
