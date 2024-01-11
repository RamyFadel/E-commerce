import React, { createContext, useState} from 'react'
import axios from 'axios'




export let CartContext =createContext();
export default function CartContextProvider(props) {
let getUserToken=localStorage.getItem('userToken');
let headers={token:getUserToken};
let [cartId,setCartId]=useState(null);
let [numberCart,setNumberCart] =useState(0);




  function addProductItem(productId){
  return axios.post('https://ecommerce.routemisr.com/api/v1/cart',{productId},{headers}).then((response)=>response).catch((err)=>err);
  }
  function getLoggedUserCart(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart',{headers}).then((response)=>response).catch((err)=>err);
    }

    function removeCartItem(id){
      return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers}).then((response)=>response).catch((err)=>err);
      }
      function updateCartProduct(id,count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{headers}).then((response)=>response).catch((err)=>err);
        }
        // function clearCart(){
        //   return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers}).then((response)=>response).catch((err)=>err);
        //   }
          function updateCartProduct(id,count){
            return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{headers}).then((response)=>response).catch((err)=>err);
            }

//--------------- PaymentMethod------
function paymentCashOrder(vales) {
  return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{shippingAddress:vales},{headers}).then((response)=>response).catch((err)=>err);
}

function OnlinePayment(vales){
  return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{shippingAddress:vales},{headers}).then((response)=>response).catch((err)=>err);
}




  return (
    <CartContext.Provider value={{addProductItem,getLoggedUserCart,removeCartItem,updateCartProduct,setCartId,paymentCashOrder,OnlinePayment,numberCart,setNumberCart}}>
      {props.children}
    </CartContext.Provider>
    
  )
}
