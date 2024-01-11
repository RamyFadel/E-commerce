import React from 'react'
import Home from './component/Home/Home'
import { RouterProvider,routes,createBrowserRouter } from 'react-router-dom'
import Gallery from './component/Gallery/Gallery'
import Categories from './component/Categories/Categories'
import NotFound from './component/NotFound/NotFound'
import Products from './component/Products/Products'
import MainLayout from './MainLayout/MainLayout'
import DetailsProduct from './component/DetailsProduct/DetailsProduct'
import Register from './component/Register/Register'
import Login from './component/Login/Login'
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute'
import { QueryClient, QueryClientProvider } from 'react-query'
import Cart from './component/Cart/Cart'
import CartContextProvider from './Context/CartContextProvider'
import {Toaster} from 'react-hot-toast'
import Profile from './component/profile/Profile'
import Address from './component/Address/Address'

import AddressCash from './component/Address/AddressCash'
import Orders from './component/Orders/Orders'




const queryClient = new QueryClient()
export default function App() {

let routes =createBrowserRouter([ 
{path:'/',element:<MainLayout/>,children:[
{index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
{path:'Home',element:<ProtectedRoute><Home/></ProtectedRoute>},
{path:'Gallery',element:<ProtectedRoute><Gallery/></ProtectedRoute>},
{path:'Products',element:<ProtectedRoute><Products/></ProtectedRoute>},
{path:'Categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
{path:'Cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
{path:'Profile',element:<ProtectedRoute><Profile/></ProtectedRoute>},
{path:'Address',element:<ProtectedRoute><Address/></ProtectedRoute>},
{path:'AddressCash',element:<ProtectedRoute><AddressCash/></ProtectedRoute>},
{path:'allorders',element:<ProtectedRoute><Orders/></ProtectedRoute>},
{path:'Register',element:<Register/>},
{path:'Login',element:<Login/>},
{path:'*',element:<NotFound/>},
{path:'details/:id',element:<DetailsProduct/>},
]}  ])


  return (<>
 
  <QueryClientProvider client={queryClient}>
  
  <CartContextProvider>
  <UserContextProvider>
     <RouterProvider router={routes}/>
    </UserContextProvider>
    </CartContextProvider>
<Toaster/>
  </QueryClientProvider>
  
   
    </>
  )
}
