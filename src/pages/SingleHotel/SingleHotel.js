import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FinalPrice, HotelDetails, HotelImages, Navbar, AuthModal } from "../../components"; // ✅ Import AuthModal
import { useAuth } from "../../context"; // ✅ Import useAuth hook

import "./SingleHotel.css";

export const SingleHotel = () => {
  const [singleHotel, setSingleHotel] = useState(null);
  const { id } = useParams();
  const { isAuthModalOpen } = useAuth(); // ✅ Get auth modal state

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://travel-app-backend-uyij.onrender.com/api/hotels/${id}`
        );
        setSingleHotel(data);
        console.log(data);
      } catch (err) {
        console.error("Error fetching hotel:", err);
      }
    })();
  }, [id]);

  const name = singleHotel?.name;
  const country = singleHotel?.country;

  return (
    <Fragment>
      <Navbar />
      <main className="single-hotel-page">
        <p className="hotel-name-add">
          {name}, {country}
        </p>
        {singleHotel && <HotelImages singleHotel={singleHotel} />}
        <div className="d-flex ">
          {singleHotel && <HotelDetails singleHotel={singleHotel} />}
          <FinalPrice singleHotel={singleHotel}></FinalPrice>
        </div>
      </main>

      {/* ✅ Render AuthModal when open */}
      {isAuthModalOpen && <AuthModal />}
    </Fragment>
  );
};
