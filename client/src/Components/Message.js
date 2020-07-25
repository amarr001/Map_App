import React from 'react';
import {Alert} from 'react-bootstrap';

const Message = props =>{

if(props.message.msgError)
  return(
     <Alert variant="danger">{props.message.msgBody}</Alert>
  )
else
  return(
    <Alert variant="primary">{props.message.msgBody}</Alert>
  )
}

export default Message;