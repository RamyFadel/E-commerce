import React, { useContext } from 'react'
import logo from '../../images/freshcart-logo.svg'
import { NavLink,Link } from 'react-router-dom'
import { userContext } from '../../Context/UserContext';
import {useNavigate} from'react-router-dom'
import { CartContext } from '../../Context/CartContextProvider';



export default function Navbar() {
  let {userToken,setUserToken} =useContext(userContext);
  let {numberCart} =useContext(CartContext);
let navigate =useNavigate()
  
  function SignOutButton(){
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate('/Login')
  }
  return (
   
    <>
  
<nav className="navbar navbar-expand-lg bg-body-tertiary py-3 ">
  <div className="container-fluid">
    <img src={logo} alt="fresh cart" />
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    {userToken!==null?<ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link cursor-pointer" aria-current="page" to="/Home">Home</NavLink>
        </li>

        <li className="nav-item cursor-pointer">
          <NavLink className="nav-link" to="/Products">Products</NavLink>
        </li>
        
        <li className="nav-item cursor-pointer">
          <NavLink className="nav-link" to="/Categories">Categories</NavLink>
        </li>
        
        <li className="nav-item cursor-pointer">
          <NavLink className="nav-link" to="/allorders">Orders</NavLink>
        </li>
     
      </ul>:''}
      
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
       
        {userToken!==null?<> 

        <Link to='/Cart' type="button" className="mt-2 me-2 position-relative">
          <i className="fa-solid fa-cart-shopping text-main" />
          <span className="position-absolute top-0 start-10 translate-middle badge rounded-pill bg-danger">
           {numberCart}
            <span className="visually-hidden">unread messages</span>
          </span>
        </Link>

        <li className="nav-item">
          <a onClick={SignOutButton} className="nav-link" aria-current="page" href="#">SignOut</a>
        </li>

        <li className="nav-item cursor-pointer">
          <NavLink className="nav-link" to="/Profile">Profile</NavLink>
        </li>
        </> :<>
          <li className="nav-item">
          <Link className="nav-link" to="/Login">Login </Link>
        </li>
        <li>
          <Link className="nav-link" to="/Register">Register</Link>
        </li> 
        </>
        }
    
      
      </ul>
    </div>
  </div>
</nav>

    </>
  )
}
