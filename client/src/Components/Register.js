import React, { useState, useRef, useEffect} from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import image from "./background.png";

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
<>
<Jumbotron fluid style={{backgroundImage: `url(${image}` }}>
  <Container>
  <Row>
    <Col>
    <h1>Fluid jumbotron</h1>
    <p>
      This is a modified jumbotron that occupies the entire horizontal space of
      its parent.
    </p>
    </Col>
    <Col sm={4} className="my-1">
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
    </Col>
    </Row>
  </Container>
</Jumbotron>
<Container>
       
        <Row className="justify-content-md-center">
          <Col md={4}>
            <h2>Heading</h2>
            <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
            <p><a className="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
          </Col>
          </Row>
</Container>
 </>   
  )
}

export default Register;