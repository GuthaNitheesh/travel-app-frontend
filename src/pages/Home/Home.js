import React, { Fragment, useEffect, useState } from "react";
import "./Home.css";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { Navbar, HotelCard } from "../../components";

export const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentIndex, setCurrIndex] = useState(16);
  const [testData, setTestData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:1010/api/hotels");
        console.log(data);
        setTestData(data);
        setHotels(data ? data.slice(0, 16) : []);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

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

  return (
    <Fragment>
      <Navbar />
      <main className="main d-flex align-center wrap gap-larger">
        {hotels && hotels.length > 0 ? (
          <InfiniteScroll
            dataLength={hotels.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h3 className="loading">Loading...</h3>}
            endMessage={<p>You have seen it all</p>}
          >
            <div className="main d-flex align-center wrap gap-larger">
              {hotels.map((hotel) => (
                <HotelCard key={hotel._id} hotel={hotel} />
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          <></>
        )}
      </main>
    </Fragment>
  );
};
