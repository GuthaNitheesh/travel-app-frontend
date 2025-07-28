import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";  // ✅ Required CSS
import "./DateSelector.css";

import{useDate} from "../../context";
export const DateSelector = ({placeholder,checkInType}) => {
  const {dateDispatch,checkInDate,checkOutDate}=useDate();
  const handleDateChange=(date)=>{
    dateDispatch({
      type:checkInType==='in'?"CHECK_IN":"CHECK_OUT",
      payload:date,
    })
  }
  console.log({checkInDate,checkOutDate});
  const handleDateFocus=()=>{
  dateDispatch({
    type:"DATE_FOCUS",
  })
  }
  return (
    <DatePicker 
    selected={checkInType==='in'?checkInDate:checkOutDate}
    onChange={(date)=>handleDateChange(date)}
    className="search-dest input"
    onFocus={handleDateFocus}
      dateFormat="dd/MM/yyyy"
      placeholderText="Add Dates"
      closeOnScroll={true}
    />
  );
};
