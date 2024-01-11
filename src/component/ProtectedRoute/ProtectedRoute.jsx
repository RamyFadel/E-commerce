import {Navigate} from 'react-router-dom';
import React from 'react'

export default function ProtectedRoute(props) {
if(localStorage.getItem('userToken')!==null){
    return props.children
}else{
    return <Navigate to={'/Login'}></Navigate>
}

}
