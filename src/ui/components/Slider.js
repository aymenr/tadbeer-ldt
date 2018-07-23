import React from "react";
import Slider from "react-slick";
var image = require('~/assets/images/bench.png')
var image2 = require('~/assets/images/khamba.png')
import PropTypes from 'prop-types';

export default class HomeSlider extends React.Component {

  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      afterChange: index => {
        if (index == 3){
           console.log('start level 1');
          this.props.atLastSlide()
         
        }
      },
      nextArrow: <CustomNextArrow />,
      prevArrow: <CustomPrevArrow />


    };
    return (
      <div style={{height: "100vh"}} >
        <Slider {...settings}>
          <div style={[style.item]}>
            <div style={style.item1} >
              <h3>Bushra aik rickshaw driver hay. </h3>
              <h3>Us kay rickshaw ka naam Basheer hay. </h3>
              <p>Bushra ko rus malai khane ka shauk hay.  </p>
              <p> Lekan usay kaam say fursat nahi milti. </p>
              <p> Wo coding seekh rahe hay </p>
              <p>  Ta kay computer Basheer ko bata sakay kay kya karna hay</p>
              <p> Aur Bushra araam se rus malai kha sake. </p>
              <p>Bushra ko code likhte huay madad chayie</p>
              <p> Warna us ke sawarian intezar karti reh jayen geen.</p>
            </div>
          </div>
     
          <div style={style.item}>
            <h3>Lekan ye code hay kya?</h3>
            <p> Code computer ko batata hay kay kya karna hay.  </p>

            <p> Phone pay button dabanay say code chalta hay.
            Aur phone ko batata hay kay kya karna hay.
            </p>



          </div>
          <div style={style.item}>
             <p> Computer har line ko baari baari chalata hay</p>
          </div>
          <div style={style.item}>
            <p>Jayse ap english aur urdu may baat kar sakte hayn.</p>
            <p> Computer bhe mukhtalif zabanon may baat kar sakta hay.  </p>
            <p> Ap Urduscript may computer say baat karen ge.  </p>
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


HomeSlider.propTypes = {
  atLastSlide: PropTypes.func.isRequired

}


const style = {
  item: {
    height: '100vh',
  }
  // item1: {
  //   backgroundImage: "url('" + image + "')",
  //   height: "100vh",
  //   backgroundSize: "cover"
  // },
  // item2: {
  //   backgroundImage: "url('" + image2+"')",
  //   height: "100vh",
  //   backgroundSize: "cover"
  // }
}
