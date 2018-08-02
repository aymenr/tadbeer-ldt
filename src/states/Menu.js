/* globals __DEV__ */
import React, { Component } from 'react';
import {render} from 'react-dom';
import Phaser from 'phaser'




export default class Menu extends Phaser.State {
    init() {}

    create() {

    const parent = document.getElementById('content')

    const container = document.createElement('div')
    container.classList.add("menu-container");
    parent.appendChild(container)
    let that = this
    render(
        <StartMenu level={that} />,
        container
    );
    }

}

class StartMenu extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <img src = "assets/images/header.jpg" style={styles.header}></img>
        <div style= {styles.container}>
          <h2 style = {styles.headingText} > Functions </h2>
          <div style={styles.flexContainer}>
            <div style ={{width: '50%'}} onClick= { () => {startLevel(1, this)} }>
              <img src = "assets/images/Level1.png" style ={styles.button}></img>
              <p style ={styles.text}> Level 1  </p>
            </div>
            <div style ={{width: '50%'}}  onClick= { () => {startLevel(2, this)} }>
              <img src = "assets/images/Level2.png" style ={styles.button}></img>
              <p style ={styles.text}> Level 2  </p>
            </div>
            <div style ={{width: '50%'}} onClick= { () => {startLevel(3, this)} }>
              <img src = "assets/images/Level3.png" style ={styles.button}></img>
              <p style ={styles.text}> Level 3  </p>
            </div>
          </div>
        </div>
      </div>
      );
  }
}



const styles = {
  header: {
    width: '100%'
  },
  button: {
    width: '107px',
    height: '72px',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    align: 'inline-center',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block'
  },
  text: {
    color:'purple'
  },
  headingText: {
    textAlign: 'center',
    color:'purple',
  },
  container: {
    paddingTop: '20px',
    borderLeft: 'solid 1px #979797',
    borderRight: 'solid 1px #979797'    
  },
  flexContainer: {
    textAlign: 'center',
    display: 'flex',
    flexWrap: 'wrap',
  },
}

function startLevel(number, level){
  var menuContainer = document.getElementsByClassName("menu-container")[0];
  menuContainer.parentNode.removeChild(menuContainer)
  level.props.level.state.start('Level' + number)

}
