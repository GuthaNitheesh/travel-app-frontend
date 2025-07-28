

export const getHotelsByRoomsANdBeds=(hotels, noOfBathrooms,
      noOfBedrooms,
      noOfBeds)=>{
        if(noOfBathrooms==="Any"||noOfBedrooms==="Any"||noOfBeds==="Any")return hotels
   const filterHotels=hotels.filter(({numberOfBathrooms,numberOfBedrooms,numberOfBeds})=>numberOfBathrooms===noOfBathrooms||numberOfBedrooms===noOfBedrooms||numberOfBeds===noOfBeds);
   return filterHotels;
}