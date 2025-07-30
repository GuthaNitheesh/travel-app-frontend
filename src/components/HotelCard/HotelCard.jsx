import "./HotelCard.css";
import { useNavigate } from "react-router-dom";
import { useWishlist, useAuth } from "../../context";
import { findHotelInWishlist } from "../../utils";
import { useLocation } from "react-router-dom"; 
export const HotelCard = ({ hotel }) => {
  const { _id, name, image, address, state, rating, price } = hotel;
  const location = useLocation(); 
  const { wishlistDispatch, wishlist } = useWishlist();
  const { accessToken, authDispatch } = useAuth();
  const isHotelInWishlist = findHotelInWishlist(wishlist, _id);
  const navigate = useNavigate();
  const handleHotelCardCLick = () => {
    navigate(`/hotels/${name}/${address}-${state}/${_id}`)
  }
  console.log("wishlist:", wishlist);
console.log("isHotelInWishlist:", isHotelInWishlist);

const handleWishlistClick = (e) => {
  e.stopPropagation();

  if (accessToken) {
    if (!isHotelInWishlist) {
      wishlistDispatch({
        type: "ADD_TO_WISHLIST",
        payload: hotel
      });

      // Only navigate if not already on wishlist page
      if (location.pathname !== "/wishlist") {
        setTimeout(() => {
          navigate("/wishlist");
        }, 300);
      }
    } else {
      wishlistDispatch({
        type: "REMOVE_FROM_WISHLIST",
        payload: _id
      });

      // ❌ Don’t navigate here — let the UI update on its own
      // You can optionally add logic to show empty wishlist message
    }
  } else {
    authDispatch({
      type: "SHOW_AUTH_MODAL"
    });
  }
};

  return (
    <div className="relative hotelcard-container shadow cursor-pointer">
      <div onClick={handleHotelCardCLick}>
        <img
          className="img"
          src={image}
          alt={name}
        />
        <div className="hotelcard-details">
          <div className="d-flex align-center">
            <span className="location">{address}, {state}</span>
            <span className="rating d-flex align-center">
              <span className="material-icons-outlined">star</span>
              <span>{rating}</span>
            </span>
          </div>
          <p className="hotel-name">{name}</p>
          <p className="price-details">
            <span className="price">Rs.{price}</span>
            <span>night</span>
          </p>
        </div>
      </div>
      <button className="button btn-wishlist absolute d-flex align-center" onClick={handleWishlistClick}>
  <span className={`material-icons favorite cursor ${isHotelInWishlist ? "fav-selected" : ""}`}>
    favorite
  </span>
</button>

    </div>
  );
}