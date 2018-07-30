import React from "react";
import Slider from "react-slick";
var image1 = require('~/assets/images/1intro.png')
var image2 = require('~/assets/images/2intro.png')
var image3 = require('~/assets/images/3intro.png')
var image4 = require('~/assets/images/4intro.png')
var arrow = require('~/assets/images/arrow.png')
import  '~/assets/fonts/stylesheet.css';
import PropTypes from 'prop-types';

export default class HomeSlider extends React.Component {

  render() {
    var settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      afterChange: index => {
        if (index == 4){
           console.log('start level 1');
          this.props.atLastSlide()
         
        }
      }

    };
    return (
      <div>
        <Slider {...settings}>
       
            <div >
              <img  style ={style.fittedImage} src={image1} />
            </div>
            <div >
              <img  style ={style.fittedImage} src={image2} />
            </div>
            <div >
              <img  style ={style.fittedImage} src={image3} />
            </div>
            <div >
              <img  style ={style.fittedImage} src={image4} />
            </div>
         
       
        </Slider>
      </div>
      );
  }
}




HomeSlider.propTypes = {
  atLastSlide: PropTypes.func.isRequired

}


const style = {
  item: {
    height: '100vh',
  },
  buttonNext: {
    width:'35px',
    fontFamily:'apercubold',
    position:'absolute',
    top:'92%',
    left:'80%',
    zIndex:'100'
  },
  fittedImage: {
    width: '100%',
    height:'100vh'
   
  
  }
}
