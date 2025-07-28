import {  useEffect, useState } from "react";
import "./Home.css";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { getHotelByPrice,getHotelsByRoomsANdBeds,getHotelsByProperty ,getHotelsByRatings,getHotelsByCancelation} from "../../utils";
import { Navbar, HotelCard ,Categories,SearchStayWithDate,Filter,AuthModal} from "../../components";
import { useCategory,useDate ,useFilter,useAuth} from "../../context";
export const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentIndex, setCurrIndex] = useState(16);
  const [testData, setTestData] = useState([]);
  const { hotelCategory }=useCategory();
  const {isSearchModalOpen}=useDate();
  const {isFilterModalOpen,priceRange, noOfBathrooms,
      noOfBedrooms,
      noOfBeds,propertyType,traveloRating,isCancelable}=useFilter();

const {isAuthModalOpen}=useAuth();

  useEffect(() => {
    (async () => {
      try {
const { data } = await axios.get(`https://travel-app-backend-uyij.onrender.com/api/hotels?category=${hotelCategory}`);
        console.log(data);
        setTestData(data);
        setHotels(data ? data.slice(0, 16) : []);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [hotelCategory]);

  const fetchMoreData = () => {
    if (hotels.length >= testData.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      if (hotels && hotels.length > 0) {
        setHotels(hotels.concat(testData.slice(currentIndex, currentIndex + 16)));
        setCurrIndex((pre) => pre + 16);
      } else {
        setHotels([]);
      }
    }, 1000);
  };
console.log("Filter Modal Open?", isFilterModalOpen);
const filterHotelsByPrice=getHotelByPrice(hotels,priceRange);
const filterHotelsByBedsAndRooms=getHotelsByRoomsANdBeds(filterHotelsByPrice,noOfBathrooms,noOfBedrooms,noOfBeds);
const filterHotelsByPropertyType=getHotelsByProperty(filterHotelsByBedsAndRooms,propertyType);
const filterHotelsByRating=getHotelsByRatings(filterHotelsByPropertyType,traveloRating);
const filterHotelsByCancel=getHotelsByCancelation(filterHotelsByRating,isCancelable,isCancelable);
  return (
    
    <div className="relative">
      <Navbar />
      <Categories/>

      {hotels && hotels.length > 0 ? (
        <InfiniteScroll
          dataLength={hotels.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            hotels.length > 0 && <h3 className="alert-text">Loading...</h3>
          }
          endMessage={<p className="alert-text">You have seen it all</p>}
        >
          <main className="main d-flex align-center wrap gap-larger">
            {filterHotelsByCancel &&
              filterHotelsByCancel.map((hotel) => (
                <HotelCard key={hotel._id} hotel={hotel} />
              ))}
          </main>
        </InfiniteScroll>
      ) : (
        <></>
      )}
      {
        isSearchModalOpen&& <SearchStayWithDate/>
      }
      {
        isFilterModalOpen&&<Filter/>
      }
      {isAuthModalOpen&&<AuthModal></AuthModal>}
    </div>
  );
};
