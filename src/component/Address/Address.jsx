import React, { useContext } from 'react'
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContextProvider';
import toast  from 'react-hot-toast';
import * as yup from "yup"

export default function Address() {
  let {OnlinePayment,setNumberCart}=useContext(CartContext);
  const phoneRegExp =/(002|\+2)?01[1205][0-9]{8}$/;

async  function handleAddress(values){
let response =await OnlinePayment(values);

if(response?.data.status==='success'){
  toast.success("success ",{
    duration: 4000,
    position: 'top-center'})
    setNumberCart(0)
 
}
  else{
  toast.error("Error")

}

window.location.href=response?.data.session.url
  }
  const validationSchema = yup.object({
    details: yup.string().required('details is required'),
    phone: yup.string().matches(phoneRegExp,'The phone must start 002 or +2 ').required('phone is required'),
    city: yup.string().required('city is required'),
  });

  let formik=useFormik({
    initialValues: {
            details: '',
            phone: '',
            city: '',
  },validationSchema,onSubmit:handleAddress
})
  return (<>
<div className="container mt-3">
 
<form onSubmit={formik.handleSubmit} >
      <label htmlFor="details" className='text-main'>Details :</label>
      <input placeholder='ex: 20 El Sallab St. Giza fourth floor right apartment' type="text" name='details' id='details' className='form-control my-2 ' value={formik.values.details} onBlur={formik.handleBlur} onChange={formik.handleChange} />
      {formik.errors.details &&formik.touched.details?<div className='alert alert-danger p-2 mt-2'>{formik.errors.details }</div>:''}
    
      <label htmlFor="phone" className='text-main'>phone :</label>
      <input type="number" placeholder='ex: 00201123456789' name='phone' id='phone' className='form-control my-2 '  value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
      {formik.errors.phone &&formik.touched.phone?<div className='alert alert-danger p-2 mt-2'>{formik.errors.phone }</div>:''}
    
      <label htmlFor="city" className='text-main'>city :</label>
      <input placeholder='ex: Cairo' type="text" name='city' id='city' className='form-control my-2 ' value={formik.values.city} onBlur={formik.handleBlur} onChange={formik.handleChange} />
      {formik.errors.city &&formik.touched.city?<div className='alert alert-danger p-2 mt-2'>{formik.errors.city }</div>:''}

  <button type='submit' className='btn bg-main text-white mt-3'>Pay with Visa</button>
             
            
  </form>
</div>
</>
  )
}
