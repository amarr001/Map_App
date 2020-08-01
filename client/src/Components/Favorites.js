import React, { useState, useContext, useEffect } from 'react';
import TodoItem from './TodoItem';
import FavService from '../Services/FavService';
import { AuthContext } from "../Context/AuthContext";

const Favourites = props =>{
    const [favourite,setFavourite] = useState({name: ""});
    const authContext = useContext(AuthContext);

    useEffect(()=>{
      FavService.postFavourite().then(data=>{
        setFavourite({name: data.favourites});
      })
    },[]);

    return(
      <div>
        <ul className="list-group">
          {
          
             <TodoItem key={favourite._id} favourite={favourite}></TodoItem>
            
          }
        </ul>
        <br/>
      </div>
    )
}

export default Favourites;