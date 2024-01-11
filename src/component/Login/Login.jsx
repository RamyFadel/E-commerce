import {useFormik } from 'formik'
import * as yup from "yup"
import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import{BallTriangle}from 'react-loader-spinner'
import { userContext } from '../../Context/UserContext'
import { useContext } from 'react'

export default function Login(){
  let [error,setError]=useState(null);
  let [loading,setLoading]=useState(false);
  let navigate = useNavigate();
  let {setUserToken} =useContext(userContext);

 async function submitLogin(values){
  setLoading(true)
  let {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values).catch((err)=>
  {setLoading(false)
    setError('There is an error in the email or password in one of them')}
  )

  if(data.message ==='success'){
  localStorage.setItem('userToken',data.token)
  setUserToken(data.token)
    setLoading(false)
    navigate('/')
  }
};
  
  let validationPassword=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const validationSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().matches(validationPassword,'The password must contain letters, numbers, and any #$%.').required('password is required'),
  
  });
  
  let formik =useFormik({
    initialValues:{
      email:'',
      password:'',
    },validationSchema,
    onSubmit:submitLogin
    
  });
  return (
    <>
    <div className="container">
      <div className="row">
      <div className="col-md-12">
        {error!==null?<div className='alert alert-danger'>{error}</div>:''}
      <h3 className='my-3'>Login Now :</h3>
        <form onSubmit={formik.handleSubmit}>

        <label htmlFor="email">email:</label>
        <input className='form-control  mb-2' type="email" name="email" id="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
        {formik.errors.email &&formik.touched.email?<div className='alert alert-danger p-2 mt-2'>{formik.errors.email }</div>:''}


        <label htmlFor="password">password:</label>
        <input className='form-control  mb-2' type="password" name="password" id="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
        {formik.errors.password &&formik.touched.password?<div className='alert alert-danger p-2 mt-2'>{formik.errors.password }</div>:''}

        <div className='d-flex justify-content-end'>
              {loading? <button type='submit' className="btn bg-main mr-4 text-white">
              <BallTriangle
              height={30}
              width={50}
              radius={5}
              color="#fff"
              ariaLabel="ball-triangle-loading"
              wrapperClass={{}}
              wrapperStyle=""
              visible={true}/></button>
              :<><button type='submit' disabled={!(formik.dirty&&formik.isValid)} className="btn bg-main text-white mx-2">Login</button>
              
              </>
              }
        
         
        </div>


        </form>
      </div>
        
      </div>
    </div>
    </>
  )

}
