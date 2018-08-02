/* globals __DEV__ */
import Phaser from 'phaser'
import Slider from "react-slick";
import {connect_slider} from "../ui/main";
import {delete_slider} from "../ui/main";
import {display_canvas} from "../ui/main";

export default class LevelSlider extends Phaser.State {
  preload() { }

  create() {
  	console.log(this.game.state)
    connect_slider('content',this.startGame,3)
  }

  startGame = () => {
  	console.log('starting game');
  	delete_slider()
    display_canvas()

  	this.game.state.start('Level3')
  }
}
