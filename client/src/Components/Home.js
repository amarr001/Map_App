import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Register from './Register';


const Home = () => {
  return(

<Jumbotron fluid>
  <Container>
    <h1>Fluid jumbotron</h1>
    <p>
      This is a modified jumbotron that occupies the entire horizontal space of
      its parent.
    </p>
    <Register/>
  </Container>
</Jumbotron>
  
  )  
}
  
export default Home;