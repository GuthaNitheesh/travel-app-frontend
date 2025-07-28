

export const getHotelsByCancelation=(hotels,isCancelable)=>{
    const filterHotels=hotels.filter(hotel=>hotel.isCancelable===isCancelable);
    return filterHotels;
}