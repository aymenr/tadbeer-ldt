/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import ace from 'ace-builds'
import 'modeJS';
import Eval from '../services/Eval'
import { compile } from '@sweet-js/core/dist/browser-sweet'
import NodeLoader from '@sweet-js/core/dist/node-loader'
import Urdu from '../services/Urdu.sjs'

export default class extends Phaser.State {
  init() { 
    this.container = document.querySelector('#content');
    ace.config.set("basePath", "/node_modules/ace-builds/src");
    this.editor = ace.edit(null, {
      minLines: 10,
      maxLines: 2000,
      fontSize: '20px',
      mode: "ace/mode/javascript",
    });
    this.editor.selection.setRange(new ace.Range(0,0,0,3));
    //this.compiler = new Compile()
  }

  preload() { }

  create() {
    let container = document.createElement('div');
    container.id = 'game_container';
    document.body.appendChild(container);
    container.appendChild(this.editor.container);
    container.appendChild(this.getButton());
    container.appendChild(this.getAnswerContainer())
    container.style = 'position:absolute; top:0; left: 0; width: 100%';
  }

  getButton() {
    let button = document.createElement('button');
    button.id = 'run_code';
    button.innerHTML = "Run";
    button.onclick = this.buttonClick;
    return button;
  }

  getAnswerContainer() {
    let div = document.createElement('div');
    div.id = 'answer'
    return div
  }

  buttonClick = () => {
    let code = this.editor.getValue()
    let temp = new NodeLoader('./')

    let compiled = compile(Urdu + ' ' + code)
    Eval(compiled.code, (err, data) => {
        if (data.log)
            document.querySelector('#answer').innerHTML = data.log + "\n"
        if (data.answer != '"undefined"')
            document.querySelector('#answer').innerHTML += data.answer
    })
  }
}
