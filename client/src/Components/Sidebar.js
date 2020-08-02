import React, { useState } from "react";

const FavItem = (props) => {
  return props.favourites.map((item) => {
    return <li key={item._id} >{item.Location}</li>;
  });
};

export default FavItem;
