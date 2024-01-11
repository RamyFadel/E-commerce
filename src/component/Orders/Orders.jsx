import React from 'react'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import styles from './Orders.module.css';
import { useQuery } from 'react-query';



export default function Orders() {
let decodeToken =jwtDecode(localStorage.getItem('userToken'));
const userId=decodeToken.id;
let {data}=useQuery('allOrders',()=>axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
)
let arrayData =data?.data;
console.log("array data",arrayData);


  return (
    <>
  
   <section className='pt-4  bg-main-light'>
   <div className="container allOrders bg-white pt-2">

 <div className="crud mb-5">
  <h2 className="fs-1 fw-bold">Your orders </h2>
  <div className="line1 bg-main" />
  <div className="line2 bg-main" />
  <div className="line3 bg-main" />
</div>

   

      {!(data===undefined)? 
      <div >
        {arrayData.map((elm,index)=>
      <div className="row" key={index} >
            <div className="col-md-2">
              <div className={`${styles.parent} position-relative `}>
                  <img src={elm.cartItems[0].product.imageCover} className='w-100  rounded-3  shadow-lg' height={180} alt="" />
                          <div className={`${styles.layer} py-3 px-4  rounded-3 `} >
                          </div>
                </div>
            </div>


              <div className="col-md-10">
                <table className="table table-striped mt-3">
                    <tbody>
                      <tr>
                        <th scope="col">Product Name : <span className='fw-normal'>{elm.cartItems[0].product.category.name}</span></th>
                        <th scope="col">Status : <span className='fw-normal text-main'>Not delivered</span></th>
                        <th scope="col">Count : <span className='fw-normal'>{elm.cartItems.length}</span></th>
                    </tr>
                    <tr>
                        <th scope="col">Shipping : <span className='fw-normal'>0</span></th>
                        <th scope="col">Total Price : <span className='fw-normal  text-main'>{elm.totalOrderPrice}</span></th>
                        <th scope="col">City : <span className='fw-normal'>{elm.shippingAddress.city}</span></th>

                    </tr>
                    <tr>
                      
                        <th scope="col">Phone : <span className='fw-normal'>{elm.shippingAddress.phone}</span></th>
                        <th scope="col">Payment : <span className='fw-normal text-main'>{elm.paymentMethodType}</span></th>
                        <th scope="col">The Date : <span className='fw-normal'>{elm.updatedAt.split('').slice(0,10).join('')}</span></th>
                    </tr>
                  

                    </tbody>
                    
                </table>
              </div>
          <br /><hr />
      </div>
           )}
      
</div>
 :<h1 className='text-danger'>Not Found Orders</h1>}
   
    </div>
   </section>
    </>
  )
}
