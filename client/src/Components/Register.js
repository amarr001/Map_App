import React, { useState, useRef, useEffect} from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';

const Register = props =>{
  const[user, setUser] = useState({username: "", password: ""})
  const [message, setMessage] = useState(null);
  let timeID = useRef(null);

  useEffect(() =>{
      return () =>{
        clearTimeout(timeID);
      }
  }, [])

  const onSubmit = e => {
    e.preventDefault();
    AuthService.register(user).then(data => {
      const { message } = data;
      setMessage(message);
      resetForm();
      if(!message.msgError){
        timeID = setTimeout(() =>{
          props.history.push('/login');
        }, 2000)
      }
    })
  }

  const onChange = e => { 
    setUser({...user,[e.target.name] : e.target.value})
    console.log(user);
  }

  const resetForm = () =>{
    setUser({username: "", password: ""})
  }

  return(
    <div>
        <form onSubmit={onSubmit}>
        <h3 className="m-2">Register to Start Exploring</h3>
        <label htmlFor="username" className="sr-only">Username</label>
        <input type="text"  
              name="username" 
              value={user.username}
              onChange={onChange} 
              className="form-control m-2" 
              placeholder="Enter Username">
        </input>
        <label htmlFor="password" className="sr-only">Username</label>
        <input type="password"  
               name="password" 
               value={user.password}
               onChange={onChange} 
               className="form-control m-2" 
               placeholder="Enter Password">
        </input>
        <button className="btn btn-lg btn-primary btn-block m-2"
                type="submit"
        >Register
        </button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  )
}

export default Register;