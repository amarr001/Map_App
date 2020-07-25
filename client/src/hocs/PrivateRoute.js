//Protect routes

import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const PrivateRoute = ({component: Component, ...rest})=>{
  const { isAuthenticated, user } = useContext(AuthContext);
  return(
    <Route {...rest} render={props =>{
      if(!isAuthenticated)
      return <Redirect to={{pathname: '/login', 
                            state: {from: props.location}}} >
            </Redirect>
    }}
   />
  )
}

export default PrivateRoute;