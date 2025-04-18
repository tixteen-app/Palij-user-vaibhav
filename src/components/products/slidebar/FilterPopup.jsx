// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { makeApi } from "../../../api/callApi";
// import Slider from "rc-slider";
// import "rc-slider/assets/index.css";
// import "./filterPopup.css";

// const FilterDropdown = ({ show, onClose, onApply }) => {
// 	const [categories, setCategories] = useState([]);
// 	const [selectedCategory, setSelectedCategory] = useState("");
// 	const [selectedCategoryname, setSelectedCategoryname] = useState("");
// 	const [selectedSubcategory, setSelectedSubcategory] = useState("");
// 	const [priceRange, setPriceRange] = useState([50, 5000]);

// 	const location = useLocation();
// 	const navigate = useNavigate();

// 	useEffect(() => {
// 		async function fetchCategories() {
// 			try {
// 				const response = await makeApi("/api/get-all-categories", "GET");
// 				if (response.status === 200) {
// 					setCategories(response.data.categories);
// 				}
// 			} catch (error) {
// 				console.log("Error fetching categories:", error);
// 			}
// 		}
// 		fetchCategories();

// 		const queryParams = new URLSearchParams(location.search);
// 		const categoryFromUrl = queryParams.get("category") || "";
// 		setSelectedCategory(categoryFromUrl);
// 	}, [location.search]);

// 	useEffect(() => {
// 		if (show) {
// 			document.body.style.overflow = "hidden"; // Prevent scrolling when popup is visible
// 		} else {
// 			document.body.style.overflow = "auto"; // Allow scrolling when popup is closed
// 		}

// 		return () => {
// 			document.body.style.overflow = "auto"; // Ensure scrolling is re-enabled when component unmounts
// 		};
// 	}, [show]);

// 	if (!show) {
// 		return null;
// 	}

// 	const handleApply = () => {
// 		const queryParams = new URLSearchParams(location.search);
// 		if (selectedCategory === "") {
// 			queryParams.delete("category");
// 		} else {
// 			queryParams.set("category", selectedCategory);
// 		}
// 		if (selectedSubcategory === "") {
// 			queryParams.delete("subcategory");
// 		} else {
// 			queryParams.set("subcategory", selectedSubcategory);
// 		}
// 		queryParams.set("minPrice", priceRange[0]);
// 		queryParams.set("maxPrice", priceRange[1]);

// 		navigate(`?${queryParams.toString()}`);
// 		onApply(selectedCategory, priceRange[0], priceRange[1], selectedSubcategory);
// 		onClose();
// 	};

// 	const handleCategoryChange = (categoryId) => {
// 		setSelectedCategory(categoryId);
// 		setSelectedSubcategory(""); // Reset subcategory when changing category
// 	};

// 	const handleSubcategoryChange = (subcategoryId) => {
// 		setSelectedSubcategory(subcategoryId);
// 	};

// 	const handlePriceRangeChange = (range) => {
// 		setPriceRange(range);
// 	};

// 	return (
// 		<div className="filter_dropdown_container">
// 			<div className="filter-dropdown">
// 				<div className="filter-dropdown-header">
// 					<h3>Filter</h3>
// 					<button onClick={onClose} className="close-button">X</button>
// 				</div>
// 				<div className="filter-dropdown-body">
// 					{/* Category Filter */}
// 					<div className="filter-section">
// 						<h4>Categories</h4>
// 						<div className="filter-category">
// 							<input
// 								type="radio"
// 								id="all"
// 								name="category"
// 								value=""
// 								checked={selectedCategory === ""}
// 								onChange={() => handleCategoryChange("")}
// 							/>
// 							<label htmlFor="all">All</label>
// 						</div>
// 						{categories.map((category) => (
// 							<div key={category._id} className="filter-category d-flex flex-column">
// 								<div className="w-100" >
// 									<input
// 										type="radio"
// 										id={category._id}
// 										name="category"
// 										value={category._id}
// 										checked={selectedCategory === category._id}
// 										onChange={() => handleCategoryChange(category._id)}
// 									/>
// 									<label htmlFor={category._id}>{category.name}</label>
// 								</div>
// 								<div>
// 									{category.subcategories && category.subcategories.length > 0 && selectedCategory === category._id && (
// 										<div className="subcategories">
// 											{category.subcategories.map((subcategory) => (
// 												<div key={subcategory._id} className="filter-subcategory">
// 													<input
// 														type="radio"
// 														id={subcategory._id}
// 														name="subcategory"
// 														value={subcategory._id}
// 														checked={selectedSubcategory === subcategory._id}
// 														onChange={() => handleSubcategoryChange(subcategory._id)}
// 													/>
// 													<label htmlFor={subcategory._id}>{subcategory.name}</label>
// 												</div>
// 											))}
// 										</div>
// 									)}
// 								</div>
// 							</div>
// 						))}
// 					</div>
// 					{/* Price Filter */}
// 					<h4>Filter By Price</h4>
// 					<div className="filter-section">
// 						<div className="price-slider">
// 							<label>₹{priceRange[0]}</label>
// 							<Slider
// 								range
// 								min={50}
// 								max={5000}
// 								value={priceRange}
// 								onChange={handlePriceRangeChange}
// 							/>
// 							<label>₹{priceRange[1]}</label>
// 						</div>
// 					</div>
// 				</div>
// 				<div className="filter-dropdown-footer">
// 					<button onClick={handleApply} className="apply-button">
// 						Apply
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default FilterDropdown;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { makeApi } from "../../../api/callApi";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./filterPopup.css";

const FilterDropdown = ({ show, onClose, onApply }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryname, setSelectedCategoryname] = useState("");  // New state for category name
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [priceRange, setPriceRange] = useState([50, 5000]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await makeApi("/api/get-all-categories", "GET");
        if (response.status === 200) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    }
    fetchCategories();

    const queryParams = new URLSearchParams(location.search);
    const categoryFromUrl = queryParams.get("category") || "";
    setSelectedCategory(categoryFromUrl);
  }, [location.search]);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when popup is visible
    } else {
      document.body.style.overflow = "auto"; // Allow scrolling when popup is closed
    }

    return () => {
      document.body.style.overflow = "auto"; // Ensure scrolling is re-enabled when component unmounts
    };
  }, [show]);

  if (!show) {
    return null;
  }

  const handleApply = () => {
    const queryParams = new URLSearchParams(location.search);
    if (selectedCategory === "") {
      queryParams.delete("category");
    } else {
      queryParams.set("category", selectedCategory);
    }
    if (selectedSubcategory === "") {
      queryParams.delete("subcategory");
    } else {
      queryParams.set("subcategory", selectedSubcategory);
    }
    queryParams.set("minPrice", priceRange[0]);
    queryParams.set("maxPrice", priceRange[1]);

    navigate(`?${queryParams.toString()}`);
    onApply(selectedCategory, priceRange[0], priceRange[1], selectedSubcategory,selectedCategoryname);
    onClose();
  };

//   const handleCategoryChange = (categoryId) => {
	
//     setSelectedCategory(categoryId);
//     setSelectedSubcategory(""); // Reset subcategory when changing category

//     // Set the selected category name based on the selected category ID
//     const selectedCategoryObj = categories.find(category => category._id === categoryId);
//     if (selectedCategoryObj) {
//       setSelectedCategoryname(selectedCategoryObj.name);
//     }
//   };
const handleCategoryChange = (categoryId) => {
	setSelectedCategory(categoryId);
	setSelectedSubcategory(""); // Reset subcategory when changing category
  
	// If "All" is selected, set category name to an empty string
	if (categoryId === "") {
	  setSelectedCategoryname(""); // Clear the category name if "All" is selected
	} else {
	  // Set the selected category name based on the selected category ID
	  const selectedCategoryObj = categories.find(category => category._id === categoryId);
	  if (selectedCategoryObj) {
		setSelectedCategoryname(selectedCategoryObj.name);
	  }
	}
  };

  const handleSubcategoryChange = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
  };

  return (
    <div className="filter_dropdown_container">
      <div className="filter-dropdown">
        <div className="filter-dropdown-header">
          <h3>Filter</h3>
          <button onClick={onClose} className="close-button">X</button>
        </div>
        <div className="filter-dropdown-body">
          {/* Category Filter */}
          <div className="filter-section">
            <h4>Categories</h4>
            <div className="filter-category">
              <input
                type="radio"
                id="all"
                name="category"
                value=""
                checked={selectedCategory === ""}
                onChange={() => handleCategoryChange("")}
              />
              <label htmlFor="" >All</label>
            </div>
            {categories.map((category) => (
              <div key={category._id} className="filter-category d-flex flex-column">
                <div className="w-100" >
                  <input
                    type="radio"
                    id={category._id}
                    name="category"
                    value={category._id}
                    checked={selectedCategory === category._id}
                    onChange={() => handleCategoryChange(category._id)}
                  />
                  <label htmlFor={category._id}>{category.name}</label>
                </div>
                <div>
                  {category.subcategories && category.subcategories.length > 0 && selectedCategory === category._id && (
                    <div className="subcategories">
                      {category.subcategories.map((subcategory) => (
                        <div key={subcategory._id} className="filter-subcategory">
                          <input
                            type="radio"
                            id={subcategory._id}
                            name="subcategory"
                            value={subcategory._id}
                            checked={selectedSubcategory === subcategory._id}
                            onChange={() => handleSubcategoryChange(subcategory._id)}
                          />
                          <label htmlFor={subcategory._id}>{subcategory.name}</label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Price Filter */}
          <h4>Filter By Price</h4>
          <div className="filter-section">
            <div className="price-slider">
              <label>₹{priceRange[0]}</label>
              <Slider
                range
                min={50}
                max={5000}
                value={priceRange}
                onChange={handlePriceRangeChange}
              />
              <label>₹{priceRange[1]}</label>
            </div>
          </div>
        </div>
        <div className="filter-dropdown-footer">
          <button onClick={handleApply} className="apply-button">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;
