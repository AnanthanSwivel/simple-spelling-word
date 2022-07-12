export const addOrRemoveFavorite = (item:string) => {
    let favoriteArray =JSON.parse(localStorage.getItem('favorites') ?? '[]') ;
    let index = favoriteArray?.indexOf(item);
    if( index !== -1){
        favoriteArray?.splice(index, 1);
    }
    else{
        favoriteArray.push(item)
    }
    localStorage.setItem('favorites' , JSON.stringify(favoriteArray));
}


export const isFindFavorite = (item:string) =>{
    let favoriteArray =JSON.parse(localStorage.getItem('favorites') ?? '[]') ;
    return favoriteArray.includes(item)>0;
}