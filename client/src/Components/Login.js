import React, { useState, useContext } from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';
import {AuthContext} from '../Context/AuthContext';

const Login = props =>{
  const[user, setUser] = useState({username: "", password: ""})
  const [message, setmessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onSubmit = e => {
    e.preventDefault();
    AuthService.login(user).then(data => {
      const { isAuthenticated, user, message } = data;
      if(isAuthenticated){
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push('/map')
      }
      else
        setmessage(message);
    })
  }

  const onChange = e => { 
    setUser({...user,[e.target.name] : e.target.value})
    console.log(user);
  }

  return(
    <div>
        <form onSubmit={onSubmit}>
        <h3>Please Sign in</h3>
        <label htmlFor="username" className="sr-only">Username</label>
        <input type="text"  
              name="username" 
              onChange={onChange} 
              className="form-control" 
              placeholder="Enter Username">
        </input>
        <label htmlFor="password" className="sr-only">Username</label>
        <input type="password"  
               name="password" 
               onChange={onChange} 
               className="form-control" 
               placeholder="Enter Password">
        </input>
        <button className="btn btn-lg btn-primary btn-block"
                type="submit"
        >Log in
        </button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  )
}

export default Login;