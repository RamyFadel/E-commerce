import axios from 'axios'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
import { CartContext } from '../../Context/CartContextProvider';
import { toast } from 'react-hot-toast';

export default function DetailsProduct() {
    let{id}=useParams()
    let {data,isLoading}=useQuery('getOneProduct',()=>axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`))

    let {addProductItem,numberCart,setNumberCart} =useContext(CartContext);
async function addProduct(Id){
    let {data}=await addProductItem(Id);
        if(data.status==='success'){
          toast.success(data.message,{
            duration: 4000,
            position: 'top-center'})
            setNumberCart(numberCart+=1)
            console.log( numberCart)
         
        }
          else{
          toast.error("Error Adding The Item")
        }
}
   
  return (
    <>
        {isLoading? <div className='change'><div><span className="loader"></span></div></div>:

  <div className="container">
    <div className="row">
        <div className="col-md-4 ">
            <img src={data?.data.data.imageCover} alt="" className='w-100' />
        </div>
        <div className="col-md-8 mt-4 py-5">
        <p className='fw-bolder fs-6'>{data?.data.data.description}</p>
            <p>{data?.data.data.title}</p>
            <h5>{data?.data.data.category.name }</h5>
            <div className='d-flex justify-content-between mt-5'>
                  <p className='fs-5 fw-medium'>{data?.data.data.price} EGP</p>
                  <span><i className="fa-solid fa-star rating-color "></i> <span className=''>{data?.data.data.ratingsAverage}</span></span>
                </div>

                <div className="d-grid gap-2">
                      <button  onClick={()=>addProduct(data?.data.data.id)} className="btn bg-main " type="button">+ Add To Cart</button>
              </div>
        

       
        </div>
    </div>
  </div>
}   
  
    
    </>
  )
}
