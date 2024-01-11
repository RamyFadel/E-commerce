import React from 'react'
import amazon from "../../images/amazon.png"
import american from "../../images/american.png"
import master from "../../images/master.png"
import paypal from "../../images/paypal.png"
import app from "../../images/app.png"
import google from "../../images/google.png"

export default function Footer() {
  
  return (
    <>
    <footer className='bg-main-light mt-4 p-5'>
    <div className="container">
        <div className="row">

        <div className="col-md-12">
            <h3>Get the FreshCart app</h3>
            <h6>We Will Send you a link, Open it on your phone to download the app</h6>
        </div>
        
            <div className="col-lg-10 mb-4">
                <input type="email" className='w-100 form-control' placeholder='Email...' />

            </div>

            <div className="col-lg-2">
               <form>
               <button type="submit"  className='btn bg-main p-2 text-white'>Share App Link</button>
               </form>
            </div>
            
            <hr className='mt-1'/>

            <div className="col-lg-6 mb-3 ">
              <div className='d-flex '>
                <div className='m-2 fw-bold'>Payment Partners</div>

                <div className='me-2 cursor-pointer image-footer-media'><img src={amazon} className=''  height={50}  alt="amazon" /></div>

                <div className='me-2 cursor-pointer image-footer-media'><img src={american}  height={50}  alt="american" /></div>

                <div className='me-2 cursor-pointer image-footer-media'><img src={master}  height={50}  alt="master" /></div>

                <div className='cursor-pointer image-footer-media'><img src={paypal}  height={50}  alt="paypal" /></div>

              </div>
            </div>

            <div className="col-lg-6 ">
              <div className='d-flex '>
                <div className='me-3 pt-2 fw-bold'>Get deliveries with FreshCart</div>

                <div className='me-2 cursor-pointer image-footer-media'><img src={app} width={130} className='rounded'  height={50}  alt="app" /></div>

                <div className='cursor-pointer image-footer-media'><img src={google} width={130} className='rounded'  height={50}  alt="google" /></div>

                </div>
            </div>
           
          
        </div>
    </div>
    </footer>
    </>
  )
}
