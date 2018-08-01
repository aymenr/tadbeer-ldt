import React from "react";
import Slider from "react-slick";
var image1 = require('~/assets/images/premise1.png')
var image2 = require('~/assets/images/p2.png')
var image3 = require('~/assets/images/intro1.png')
var image4 = require('~/assets/images/intro2.png')
var image5 = require('~/assets/images/intro3.png')
var image6 = require('~/assets/images/intro4.png')
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
        if (index == 6){
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
            <div >
              <img  style ={style.fittedImage} src={image4} />
            </div>
             <div >
              <img  style ={style.fittedImage} src={image5} />
            </div>
             <div >
              <img  style ={style.fittedImage} src={image6} />
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
