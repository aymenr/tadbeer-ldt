import React from "react";
import Slider from "react-slick";

var image1 = require('~/assets/images/intro0.png')
var image2 = require('~/assets/images/intro02.png')
var image3 = require('~/assets/images/intro1.png')

var path = require('path')
console.log('image1',image1)
console.log('image1',image2)
console.log('a',path.resolve(__dirname))
console.log('dir',__dirname)


console.log('~/')
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
        if (index == 3){
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
            <div >
              <img  style ={style.fittedImage} src={image2} />
            </div>
            <div >
              <img  style ={style.fittedImage} src={image3} />
            </div>
      
      
            <div>
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
