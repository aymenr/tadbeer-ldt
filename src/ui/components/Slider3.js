import React from "react";
import Slider from "react-slick";

var image1 = require('~/assets/images/intro3.png')


var path = require('path')


console.log('~/')
import  '~/assets/fonts/stylesheet.css';
import PropTypes from 'prop-types';

export default class Slider3 extends React.Component {

  render() {
    var settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      afterChange: index => {
        if (index == 1) {
           console.log('start level 8');
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
          
      
            <div>
            </div>
         
       
        </Slider>
      </div>
      );
  }
}




Slider3.propTypes = {
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
