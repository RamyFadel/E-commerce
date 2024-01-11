import React from 'react'
import Slider from "react-slick";
import slider1 from '../../images/slider-image-3.jpeg'
import slider2 from '../../images/slider-image-2.jpeg'
import slider3 from '../../images/slider-image-1.jpeg'



export default function Gallery() {
  let settings = {
    dots: true,
    infinite: true,
    slidesToShow:1,
    slidesToScroll:1,
    arrows:false,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <>
       <Slider {...settings} >
      <div>
        <img src={slider1} className='w-100' height={400} alt="" />
      </div>
      <div>
        <img src={slider2} className='w-100' height={400} alt="" />
      </div>
      <div>
        <img src={slider3} className='w-100' height={400} alt="" />
      </div>
      
    </Slider>
    </>
  )
}
