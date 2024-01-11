import {useFormik } from 'formik'
import * as yup from "yup"
import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import{Audio}from 'react-loader-spinner'

export default function Register(){
  let [error,setError]=useState(null);
  let [loading,setLoading]=useState(false);
  let navigate=useNavigate()

 async function submitRegister(values){
  setLoading(true)
  let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).catch((err)=>
  {setLoading(false)
    setError('This account was previously registered with')}
  )

  if(data.message ==='success'){
    setLoading(false)
    navigate('/login')
  }
};
  
  let validationPassword=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const phoneRegExp =/(002|\+2)?01[1205][0-9]{8}$/;

  const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().matches(validationPassword,'The password must contain letters, numbers, and any #$%.').required('password is required'),
    rePassword: yup.string().oneOf([yup.ref("password")],'Invalid rePassword').required('rePassword is required'),
    phone: yup.string().matches(phoneRegExp,'The phone must start 002 or +2 ').required('phone is required'),

  });
  
  let formik =useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'', 
      phone:'',
    },validationSchema,
    onSubmit:submitRegister
    
  });
  return (
    <>
    <div className="container">
      <div className="row">
      <div className="col-md-12">
        {error!==null?<div className='alert alert-danger'>{error}</div>:''}
      <h3 className='my-3'>Register Now :</h3>

        <form onSubmit={formik.handleSubmit}>

        <label htmlFor="name">name:</label>
        <input className='form-control mb-2' type="text" name="name" id="name" value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange}  />
        {formik.errors.name &&formik.touched.name?<div className='alert alert-danger p-2 mt-2'>{formik.errors.name }</div>:''}

        <label htmlFor="email">email:</label>
        <input className='form-control  mb-2' type="email" name="email" id="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
        {formik.errors.email &&formik.touched.email?<div className='alert alert-danger p-2 mt-2'>{formik.errors.email }</div>:''}


        <label htmlFor="password">password:</label>
        <input className='form-control  mb-2' type="password" name="password" id="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
        {formik.errors.password &&formik.touched.password?<div className='alert alert-danger p-2 mt-2'>{formik.errors.password }</div>:''}


        <label htmlFor="rePassword">rePassword:</label>
        <input className='form-control  mb-2' type="password" name="rePassword" id="rePassword" value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} />
        {formik.errors.rePassword &&formik.touched.rePassword?<div className='alert alert-danger p-2 mt-2'>{formik.errors.rePassword }</div>:''}


        <label htmlFor="phone">phone:</label>
        <input placeholder='ex: 00201123456789' className='form-control  mb-2' type="number" name="phone" id="phone" value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} />
        {formik.errors.phone &&formik.touched.phone?<div className='alert alert-danger p-2 mt-2'>{formik.errors.phone }</div>:''}


        <div className='d-flex justify-content-end'>
{loading? <button type='submit' className="btn bg-main mr-4 text-white">
<Audio
  height="20"
  width="80"
  radius="9"
  color="green"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/>
           </button>:<button type='submit' disabled={!(formik.dirty&&formik.isValid)} className="btn bg-main mr-4 text-white">register</button>}
        
         
        </div>


        </form>
      </div>
        
      </div>
    </div>
    </>
  )

}
