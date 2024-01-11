import React, {useContext} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { CartContext } from '../../Context/CartContextProvider';
import toast  from 'react-hot-toast';

export default function Products() {
const { isLoading,data } = useQuery("products", () => axios.get('https://ecommerce.routemisr.com/api/v1/products'));
let {addProductItem,setNumberCart,numberCart} =useContext(CartContext);
async function addProduct(Id){
    let {data}=await addProductItem(Id);
        if(data.status==='success'){
          toast.success(data.message,{
            duration: 4000,
            position: 'top-center'}) 
            setNumberCart(numberCart+=1)
           
        }
          else{
          toast.error("Error Adding The Item")
        }
}
  return (
    <>
    {isLoading? <div className='change'><div><span className="loader"></span></div></div>:
  <div className="container mt-2">
    <div className="row">
      { data?.data.data.map((elm)=>
  
         <div className="col-sm-4 col-md-3 col-lg-2 py-3 product cursor-pointer price-rating-media" key={elm._id}>
          <Link to={"/details/"+elm.id} className='nav-link'>
          <div>
            <div className='over-flow'>  <img src={elm.imageCover}  height={200} alt="" /></div>
               <div className='py-3'>
                  <span className='text-main fw-bolder '>{elm.category.name}</span>
                    <p className='fw-bolder'>{elm.title.split(' ').slice(0,2).join(' ')}</p>
                    
                <div className='d-flex justify-content-between '>
                  <p className='fs-5 fw-medium'>{elm.price} EGP</p>
                  <span><i className="fa-solid fa-star rating-color "></i> <span className=''>{elm.ratingsAverage}</span></span>
                </div>

              </div>
        </div>
          </Link>
        
      <button onClick={()=>addProduct(elm.id)} className='btn bg-main btn-addToCart '> Add to cart</button>

      </div>
      )}


    </div>
  </div>
}

     
        
    </>
  )
}
