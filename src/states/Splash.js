/* globals __DEV__ */
import Phaser from 'phaser'
import Slider from "react-slick";
import {connect_slider} from "../ui/main";

export default class Game extends Phaser.State {
  preload() { }

  create() {
    connect_slider('content')
  }
}
