import React, {  useState } from 'react'
import { MdOutlineFavoriteBorder,MdFavorite } from 'react-icons/md'
import { addOrRemoveFavorite, isFindFavorite } from '../helpers/favorites';
import { Store } from 'react-notifications-component';

const Favorite = ({name=''}) => {
  const [isFavorite ,setIsFavorite] = useState(isFindFavorite(name));
  
  const onClickFavorite = () => { 
    setIsFavorite(!isFavorite)
    addOrRemoveFavorite(name)
    if(!isFavorite){
      Store.addNotification({
        title: "Success!",
        message: "Favorite has been added",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
    }else{
      Store.addNotification({
        title: "Success!",
        message: "Removed from favorite.",
        type: "warning",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
    }
   
  }

  return (
    <>
      {isFavorite ? <><MdFavorite data-testid="favorite-test-id" onClick={() => onClickFavorite()} fill='#FFD700' size={25}/></> : <><MdOutlineFavoriteBorder  data-testid="favorite-test-id" onClick={() => onClickFavorite()} fill='#FFD700' size={25}/></>}
    </>
  )
}

export default Favorite