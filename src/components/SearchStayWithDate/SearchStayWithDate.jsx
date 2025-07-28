import { DateSelector } from "../DateSelector/DateSelector";
import "./SearchStayWithDate.css";

import { useDate, useCategory } from "../../context";

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const SearchStayWithDate = () => {
    const { destination, guests, isSearchResultOpen, dateDispatch } = useDate();
    const [hotels, setHotels] = useState([]);
    const { hotelCategory } = useCategory();
    const navigate=useNavigate();
    useEffect(() => {
        (async () => {
            try {
const { data } = await axios.get(`https://travel-app-backend-uyij.onrender.com/api/hotels?category=${hotelCategory}`);

                setHotels(data);

            } catch (err) {
                console.log(err);
            }
        })();
    }, [hotelCategory]);
    const handleDestination = (e) => {
        dateDispatch({
            type: "DESTINATION",
            payload: e.target.value,
        })

    }

    const handleGuestChange = (e) => {
        dateDispatch({
            type: "GUESTS",
            payload: e.target.value
        })
    }

    const handleSearchResultClick = (value) => {
        dateDispatch({
            type: "DESTINATION",
            payload: value
        });
    };

    const destinationOptions = hotels.filter(({ address, city, state, country }) =>
        (address?.toLowerCase() || "").includes(destination?.toLowerCase() || "") ||
        (city?.toLowerCase() || "").includes(destination?.toLowerCase() || "") ||
        (state?.toLowerCase() || "").includes(destination?.toLowerCase() || "") ||
        (country?.toLowerCase() || "").includes(destination?.toLowerCase() || "")
    );

const handleSearchButtonClick=()=>{
    dateDispatch({
        type:"CLOSE_SEARCH_MODAL"
    })
    navigate(`/hotels/${destination}`);
}
    return (
        <div className="destination-container">
            <div className="destination-options d-flex align-center absolute">
                <div className="location-container">
                    <label className="label">Where</label>
                    <input value={destination} onChange={handleDestination}
                        className="input search-dest" placeholder="Search Destination" autoFocus />
                </div>

                <div className="location-container">
                    <label className="label">Check in</label>
                    <DateSelector checkInType="in" />
                </div>

                <div className="location-container">
                    <label className="label">Check Out</label>
                    <DateSelector checkInType="out" />
                </div>

                <div className="location-container">
                    <label className="label">No of Guests</label>
                    <input value={guests} className="input search-dest" placeholder="Add guests" onChange={handleGuestChange} />
                </div>

                <div className="search-container d-flex align-center cursor" onClick={handleSearchButtonClick}>
                    <span className="material-icons-outlined">search</span>
                    <span>Search</span>
                </div>
            </div>
            {isSearchResultOpen && destinationOptions.length > 0 && (
                <div className="search-result-container absolute">
                    {destinationOptions.map(({ address, city }, index) => (
                        <p
                            key={index}
                            className="p cursor-pointer"
                            onMouseDown={() => handleSearchResultClick(address)}
                        >
                            {address}, {city}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};
