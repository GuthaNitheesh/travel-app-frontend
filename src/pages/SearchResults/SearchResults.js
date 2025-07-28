import { Fragment } from "react/jsx-runtime"
import { HotelCard, Navbar } from "../../components"
import { useDate ,useCategory} from "../../context"
import { useState ,useEffect} from "react"
import axios from "axios";
export const SearchResults=()=>{
    const {destination}=useDate();
      const [hotels, setHotels] = useState([]);
       const { hotelCategory }=useCategory();
    
    useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`https://travel-app-backend-uyij.onrender.com/api/hotels?category=${hotelCategory}`);

        console.log(data);
      
        setHotels(data );
      } catch (err) {
        console.log(err);
      }
    })();
  }, [destination,hotelCategory]);
   

  const filterSearchResults=hotels.filter(({ address, city, state, country }) =>
        (address?.toLowerCase() || "")===(destination?.toLowerCase() || "") ||
        (city?.toLowerCase() || "")===(destination?.toLowerCase() || "") ||
        (state?.toLowerCase() || "")===(destination?.toLowerCase() || "") 
    );
    return(
        <Fragment>
            <Navbar/>
            <section className="main d-flex align-center gap-larger">
                {
                    filterSearchResults?(filterSearchResults.map(hotel=><HotelCard key={hotel._id} hotel={hotel} ></HotelCard>)):(<h3>Nothing Found</h3>)
                }
            </section>
        </Fragment>
    )
}