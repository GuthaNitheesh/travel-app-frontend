import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDate, useHotel } from "../../context";
import { v4 as uuid } from "uuid";
import axios from "axios";
import "./Payment.css";

export const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { guests, checkInDate, checkOutDate } = useDate();
  const { setHotel } = useHotel();

  const numberOfNights =
    checkInDate && checkOutDate
      ? (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24)
      : 0;

  const [singleHotel, setSingleHotel] = useState({});

  useEffect(() => {
    (async () => {
      try {
       const { data } = await axios.get(`https://travel-app-backend-uyij.onrender.com/api/hotels/${id}`);

        setSingleHotel(data);
      } catch (err) {
        console.error("Failed to fetch hotel data", err);
      }
    })();
  }, [id]);

  const { image, name, address, state, rating, price } = singleHotel;

  const totalPayableAmount = (price || 0) * numberOfNights + 200;

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleConfirmBookingClick = async () => {
    const response = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!response) {
      console.log("Razorpay SDK failed to load.");
      return; // ❗Prevent proceeding if Razorpay didn't load
    }

    const options = {
      key: "rzp_test_paVSNdIpeMiguW",
      amount: totalPayableAmount * 100,
      currency: "INR",
      name: "TravelO",
      description: "Thank you for booking with us",
      handler: ({ payment_id }) => {
        setHotel({
          ...singleHotel,
          orderId: uuid(),
          payment_id,
          checkInDate: checkInDate?.toLocaleDateString("en-US", { day: "numeric", month: "short" }),
          checkOutDate: checkOutDate?.toLocaleDateString("en-US", { day: "numeric", month: "short" }),
          totalPayableAmount,
        });
        navigate("/order-summary");
      },
      prefill: {
        name: "Gutha Nitheesh",
        email: "guthanitheesh@gmail.com",
        contact: "9059779824",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <Fragment>
      <header className="heading">
        <h1 className="heading-1">
          <Link className="link" to="/">TravelO</Link>
        </h1>
      </header>

      <main className="payment-page d-flex justify-center">
        <div className="final-details-container d-flex direction-column gap-md">
          <h2>Trip Details</h2>

          <div className="dates-and-guests d-flex direction-column gap-md">
            <h3>Your Trip</h3>
            <div>
              <p>Dates</p>
              <span>
                {checkInDate?.toLocaleDateString("en-US", { day: "numeric", month: "short" })} -
                {checkOutDate?.toLocaleDateString("en-US", { day: "numeric", month: "short" })}
              </span>
            </div>
            <div>
              <p>Guests</p>
              <span>{guests} Guests</span>
            </div>
          </div>

          <div className="d-flex direction-column gap-sm">
            <h3>Pay with</h3>
            <div>Razorpay</div>
          </div>

          <button
            className="button btn-primary btn-reserve cursor btn-pay"
            onClick={handleConfirmBookingClick}
          >
            Confirm Booking
          </button>
        </div>

        <div className="final-details d-flex direction-column gap-large">
          <div className="d-flex gap-sm">
            <img
              className="image"
              src={image || "https://via.placeholder.com/150"}
              alt={name || "Hotel"}
            />
            <div className="d-flex direction-column">
              <div className="d-flex direction-column grow-shrink-basis">
                <span>{name}</span>
                <span>{address}, {state}</span>
              </div>
              <div className="rating-container">
                <span className="rating d-flex align-center">
                  <span className="material-icons-outlined">star</span>
                  <span>{rating}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="tag">
            Your booking is protected by <strong className="strong">TravelO</strong> cover
          </div>

          <div className="price-detail-container">
            <div className="price-distribution d-flex direction-column">
              <h3>Price Details</h3>
              <div className="final-price d-flex align-center justify-space-between">
                <span className="span">Rs. {(price || 0)} x {numberOfNights} nights</span>
                <span className="span">Rs. {(price || 0) * numberOfNights}</span>
              </div>
              <div className="final-price d-flex align-center justify-space-between">
                <span className="span">Service fee</span>
                <span className="span">Rs. 200</span>
              </div>
              <div className="final-price d-flex align-center justify-space-between">
                <span className="span">Total</span>
                <span className="span">Rs. {totalPayableAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};
