import { jwtDecode } from 'jwt-decode';
import React from 'react'




export default function Profile() {
    let decodeToken =jwtDecode(localStorage.getItem('userToken'));
 
  return (<>
       <div className='p-5'>
       <h1>Name: {decodeToken.name}</h1>
        <h4>Role: {decodeToken.role}</h4>
       </div>
  
  
  </>
  )
}
