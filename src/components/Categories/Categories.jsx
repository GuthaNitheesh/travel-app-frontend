import axios from "axios";
import { useEffect, useState } from "react";
import "./Categories.css";
import { useCategory } from "../../context";
export const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [numberOfCategoryToShow, setNumberOfCategoryToShow] = useState(0);
const { hotelCategory, setHotelCategory }=useCategory();
    const handleShowMoreRightClick = () => {
        setNumberOfCategoryToShow((prev) => prev + 10);
    };

    const handleShowMoreLeftClick = () => {
        setNumberOfCategoryToShow((prev) => prev - 10);
    };

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("http://localhost:1010/api/category");
                  const categoriesToShow = data.slice(
        numberOfCategoryToShow+10>data.length?data.length-10:numberOfCategoryToShow,
        numberOfCategoryToShow >data.length?data.length:numberOfCategoryToShow+10
    );
                setCategories(categoriesToShow); // ⬅️ Store full data only once
            } catch (err) {
                console.log(err);
            }
        })();
    }, [numberOfCategoryToShow]);

  
    const handleCategoryClick=(category)=>{
        setHotelCategory(category);
    }
console.log(hotelCategory);
    return (
        <section className="categories d-flex align-center gap-large cursor-pointer shadow">
            {numberOfCategoryToShow >= 10 && (
                <button
                    className="button btn-category btn-left fixed cursor-pointer"
                    onClick={handleShowMoreLeftClick}
                >
                    <span className="material-icons-outlined">chevron_left</span>
                </button>
            )}

            {categories&&categories.map(({ _id, category }) => (
                <span className={`${category===hotelCategory?"border-bottom":""}`} onClick={()=>{handleCategoryClick(category)}} key={_id}>{category}</span>
            ))}

            {numberOfCategoryToShow - 10 < categories.length && (
                <button
                    className="button btn-category btn-right fixed cursor-pointer"
                    onClick={handleShowMoreRightClick}
                >
                    <span className="material-icons-outlined">chevron_right</span>
                </button>
            )}
        </section>
    );
};
