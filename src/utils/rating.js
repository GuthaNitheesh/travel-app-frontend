

export const getHotelsByRatings=(hotels,rating)=>{
    const filterHotels=hotels.filter(hotel=>hotel.rating>=rating);
    return filterHotels;
}