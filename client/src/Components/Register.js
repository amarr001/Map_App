import React, { useState, useRef, useEffect } from "react";
import AuthService from "../Services/AuthService";
import Message from "../Components/Message";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import image from "./cliff.jpg";
import "./register.css";

const Register = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  let timeID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timeID);
    };
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.register(user).then((data) => {
      const { message } = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timeID = setTimeout(() => {
          props.history.push("/login");
        }, 2000);
      }
    });
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const resetForm = () => {
    setUser({ username: "", password: "" });
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
                <h4 className="m-2">Register to Start Exploring</h4>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={user.username}
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
                  value={user.password}
                  onChange={onChange}
                  className="form-control m-2"
                  placeholder="Enter Password"
                ></input>
                <button
                  className="btn btn-md btn-secondary btn-block m-2"
                  type="submit"
                >
                  Register
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

export default Register;
