import React, {useContext, useEffect, useState } from 'react'
import  { CartContext } from '../../Context/CartContextProvider'
import { Link } from 'react-router-dom';
import toast  from 'react-hot-toast';



export default function Cart() {
  let {getLoggedUserCart,removeCartItem,updateCartProduct,setCartId,setNumberCart,numberCart}=useContext(CartContext);
let [cartDetails,setCartDetails]=useState(null);
let [loading,setLoading]=useState(true);

 async function getCart(){
  let {data} =await getLoggedUserCart();
  setLoading(false)
  if (!(data===undefined)){
   setCartDetails(data);
   setCartId(data?.data._id);
 }

}

async function updateCount(id,count){
  let {data} =await updateCartProduct(id,count);
  if(data.status==='success'){
    toast.success(data.status,{
      duration: 4000,
      position: 'top-center'})
      setCartDetails(data);
  }
    else{
    toast.error("Error ")
  }
 
  }
 
  async function removeItem(id){
    let {data} =await removeCartItem(id);
    
    if(data.status==='success'){
      toast.success('Remove',{
        duration: 4000,
        position: 'top-center'})
        setCartDetails(data);
       
       
    }
      else{
      toast.error("Error")
    }

  }
  // async function clear (){
  //   let {data} =await clearCart();
  //   setCartDetails(data);
   
  // }

  useEffect(()=>{getCart()}
  ,[]);
  
  return <>
{loading?<div className='change'><div><span className="loader"></span></div></div>:
<>
{cartDetails?
  <div className=' my-3 mx-auto p-3 bg-main-light w-75 '>    
 
                <h2>Shop Cart</h2>
                <h4 className='h6 text-main fw-bolder'> Cart Items : {cartDetails.numOfCartItems}</h4>
                <h4 className='h6'>Total Cart Price :{cartDetails.data.totalCartPrice}
              <span className='text-main fw-bolder'>  </span>
                EGP</h4>

                 {cartDetails.data.products.map((elm,index)=>
            
                <div className="row border-bottom py-2 px-2" key={index} >

              <div className="col-md-2 pt-1">
              <img className='w-100' src={elm.product.imageCover} alt="" />
               </div>
               <div className="col-md-10 pt-4">
                    <div className="d-flex justify-content-between align-content-center">
                       <div>
                           <h3 className='h6'>{elm.product.title.split(' ').slice(0,10).join(' ')}
                           </h3>
                           <h6 className='text-main '>Price: {elm.price}</h6>
                       </div>
                       <div>
                           <button onClick={()=>{
                            updateCount(elm.product._id,elm.count+1);
                            setNumberCart(numberCart+=1)
                          }}
                           className='btn brdr-main p-1'>+</button>
                           <span className='mx-2'>{elm.count}</span>
                           <button onClick={()=>{
                            if(elm.count>0){
                              updateCount(elm.product._id,elm.count-1);
                              setNumberCart(numberCart-=1)
                            }else{
                              removeItem(elm.product._id)
                            }
                           }}  className='btn brdr-main p-1'>-</button>
                       </div>
                    </div>
                    <button onClick={()=>{
                      removeItem(elm.product._id);
                      setNumberCart(numberCart-=1)
                      }}
                       className='btn p-0'>
                       <i className="fas fa-trash-can font-sm text-danger"></i> Remove
                    </button>
               </div>
              
                </div> )} 

                {cartDetails.numOfCartItems===0?'':             
                <div>
                  <Link to='/AddressCash' className='btn bg-main text-white me-2'>Payment Cash Order</Link>
                  <Link to='/Address' className='btn bg-main w-25 text-white'>Payment Visa Order</Link>
                </div>}
      
           </div>
           :

           <div className=' my-3 mx-auto p-3 bg-main-light w-75 '>    
      

           <h2>Shop Cart</h2>
           <h4 className='h6 text-main fw-bolder'> Cart Items :0</h4>
           <h4 className='h6'>Total Cart Price :0
         <span className='text-main fw-bolder'>  </span>
           EGP</h4>
           </div> 
      }
</>}













    </>
}