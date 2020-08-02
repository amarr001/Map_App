import React, { useState } from "react";

const FavItem = (props) => {

 return (
<ul>
{props.items.map((item)=>{
return <li>{item.Location}<button className="bt bt-primary" onClick={() => props.myOnClick(item._id)}>Delete</button></li>
})}
</ul>
 )

};

export default FavItem;
