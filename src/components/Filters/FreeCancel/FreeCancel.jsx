
import "./FreeCancel.css";
import { useFilter } from "../../../context";
export const FreeCancel=()=>{
  const {isCancelable,filterDispatch}=useFilter();
    const handleCancelChange=(event)=>{
filterDispatch({
    type:"CANCELABLE",
    payload:event.target.checked,
})
    }
    return(
        <div className="filter-container">
            <div  className="d-flex align-center gap-larger"> 
                <span className="filter-label">Free Cancelation</span>
                <label className="slide" >

                <input type="checkbox" onChange={handleCancelChange} value={isCancelable}
                checked={isCancelable}></input>
                <span className="slider round"></span>
                </label>
            </div>
        </div>
    )
}