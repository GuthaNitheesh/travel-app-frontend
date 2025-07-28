
export const getHotelByPrice=(hotels,priceRange)=>{
    const filterHotelsByPrice=hotels.filter(hotel=>hotel.price>=priceRange[0]&&hotel.price<=priceRange[1])
return filterHotelsByPrice;
}