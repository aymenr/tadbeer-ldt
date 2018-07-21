import React from "react";
import Slider from "react-slick";
var image = require('~/assets/images/character.png')
var image2 = require('~/assets/images/down.png')

export default class HomeSlider extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <CustomNextArrow />,
      prevArrow: <CustomPrevArrow />

    };
    return (
      <div style={{height: "100vh"}} >
        <Slider {...settings}>
          <div style={[style.item]}>
            <div style={style.item1} >
              <h3>1</h3>
            </div>
          </div>
          <div style={style.item}>
            <div style={style.item2}>
              <h3>2</h3>
            </div>
          </div>
          <div style={style.item}>
            <h3>3</h3>
          </div>
          <div style={style.item}>
            <h3>4</h3>
          </div>
          <div style={style.item}>
            <h3>5</h3>
          </div>
          <div style={style.item}>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
      );
  }
}

class CustomNextArrow extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick}> Next</button> 
    )
  }
}

class CustomPrevArrow extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick}> Previous</button> 
    )
  }
}

const style = {
  item: {
    height: '100vh',
  },
  item1: {
    backgroundImage: "url('" + image + "')",
    height: "100vh",
    backgroundSize: "cover"
  },
  item2: {
    backgroundImage: "url('" + image2+"')",
    height: "100vh",
    backgroundSize: "cover"
  }
}
