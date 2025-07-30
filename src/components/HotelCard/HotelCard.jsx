import "./HotelCard.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useWishlist, useAuth } from "../../context";
import { findHotelInWishlist } from "../../utils";

export const HotelCard = ({ hotel }) => {
  const { _id, name, image, address, state, rating, price } = hotel;
  const { wishlistDispatch, wishlist } = useWishlist();
  const { accessToken, authDispatch } = useAuth();
  const isHotelInWishlist = findHotelInWishlist(wishlist, _id);
  const navigate = useNavigate();
  const location = useLocation();

  const handleHotelCardClick = () => {
    navigate(`/hotels/${name}/${address}-${state}/${_id}`);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation(); // ✅ Prevent click bubbling to card

    if (accessToken) {
      if (!isHotelInWishlist) {
        wishlistDispatch({
          type: "ADD_TO_WISHLIST",
          payload: hotel,
        });

        // ✅ Only navigate if NOT on wishlist page
        if (location.pathname !== "/wishlist") {
          setTimeout(() => {
            navigate("/wishlist");
          }, 300);
        }
      } else {
        wishlistDispatch({
          type: "REMOVE_FROM_WISHLIST",
          payload: _id,
        });
      }
    } else {
      authDispatch({
        type: "SHOW_AUTH_MODAL",
      });
    }
  };

  return (
    <div className="relative hotelcard-container shadow cursor-pointer">
      {/* 🛠️ MOVE this click ONLY on content, NOT whole card */}
      <div className="card-content" onClick={handleHotelCardClick}>
        <img className="img" src={image} alt={name} />
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

      {/* ✅ Wishlist Button OUTSIDE the card click */}
      <button
        className="button btn-wishlist absolute d-flex align-center"
        onClick={handleWishlistClick}
      >
        <span
          className={`material-icons favorite cursor ${isHotelInWishlist ? "fav-selected" : ""}`}
        >
          favorite
        </span>
      </button>
    </div>
  );
};
