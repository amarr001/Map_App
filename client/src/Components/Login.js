import React, { useState, useContext } from "react";
import AuthService from "../Services/AuthService";
import Message from "../Components/Message";
import { AuthContext } from "../Context/AuthContext";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import image from "./cliff.jpg";

const Login = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setmessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.login(user).then((data) => {
      const { isAuthenticated, user, message } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push("/map");
      } else setmessage(message);
    });
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  return (
    <div>
      <Jumbotron fluid style={{ backgroundImage: `url(${image}` }}>
        <Container>
          <Row>
            <Col className="headerColour" md={5}>
              <h1>Welcome to Mapp-App!</h1>
              <h5>
                Your personalised map repository where you can save and edit
                information about your favourite locations and routes
              </h5>
            </Col>
          </Row>
        </Container>
      </Jumbotron>

      <Container className="backContainer">
        <Row className="justify-content-md-center">
          <Col sm={4} className="my-1">
            <div>
              <form onSubmit={onSubmit}>
                <h3 className="m-2">Please Sign in</h3>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  onChange={onChange}
                  className="form-control m-2"
                  placeholder="Enter Username"
                ></input>
                <label htmlFor="password" className="sr-only">
                  Username
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={onChange}
                  className="form-control m-2"
                  placeholder="Enter Password"
                ></input>
                <button
                  className="btn btn-md btn-secondary btn-block m-2"
                  type="submit"
                >
                  Log in
                </button>
              </form>
              {message ? <Message message={message} /> : null}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
