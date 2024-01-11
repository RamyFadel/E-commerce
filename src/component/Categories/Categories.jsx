import React from 'react'
import axios from 'axios';
import Slider from "react-slick";
import { useQuery } from 'react-query';


export default function Categories() {
  let settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows:false, 
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

const { isLoading, data, isError,isFetched } = useQuery('Categories', () => axios.get("https://ecommerce.routemisr.com/api/v1/categories"))


  return (
    <>
   
<div className='py-5'>
{isLoading? <div className='change'><div><span className="loader"></span></div></div>:  <div>
      <h2>shop popular Categories</h2>
      <Slider {...settings} >
      
      {data?.data.data.map((elm,index)=>
       <div key={index}>
       <img src={elm.image} className='w-100' height={250} alt="" />
       </div>
      )}
     </Slider>



     </div>}
  
    </div>
    </>
  )
}
