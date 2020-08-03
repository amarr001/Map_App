import React, { useState } from "react";
import "./register.css";

const FavItem = (props) => {

 return (
<ul>
{props.items.map((item)=>{
return <li className="ItemList alert alert-info m-2">{item.Location}
<button className="badge badge-secondary mx-4" onClick={() => props.myOnClick(item._id)}
>Delete</button></li>
})}
</ul>
 )

};

export default FavItem;
/*
<ul>
{props.items.map((item)=>{
return <li className="ItemList alert alert-info">{item.Location}
<button className="badge badge-secondary mx-2" onClick={() => props.myOnClick(item._id)}
>Delete</button></li>
})}
</ul>
*/