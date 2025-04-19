import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import LoginPopup from "../../components/LoginPopup/LoginPopup.jsx";
import PrimaryLoader from "../loaders/primaryloader.jsx";
import { makeApi } from "../../api/callApi.tsx";
import styles from "../../pages/CSS/product/productDetails.module.css";
import { addToCart, removeFromCart, fetchCart, addToCartCake, removeCakeFromCart } from "../../utils/productFunction.js";
import "../../pages/CSS/product/productDetails.css";
import { GoArrowLeft } from "react-icons/go";
import { assets } from "../../assets/assets.js";
import ReactImageMagnify from 'react-image-magnify';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function ProductDetails() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [completeCart, setCompleteCart] = useState([]);
  const [load, setLoad] = useState(false)
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isInCart, setIsInCart] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [includes, setIncludes] = useState();
  const [quantityLoading, setQuantityLoading] = useState(false);
  const [productNuturitions, setProductNuturitions] = useState([]);
  const [productLoaders, setProductLoaders] = useState({});
  const [fetchCartLoader, setFetchCartLoader] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const [cakeMessage, setCakeMessage] = useState("");
  const [currentCartMessage, setCurrentCartMessage] = useState("");
  const [pincodeInput, setPincodeInput] = useState("");
  const [pincodeCheckResult, setPincodeCheckResult] = useState(null);
  const [checkingPincode, setCheckingPincode] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  console.log("-=-=-=-", selectedIndex);


  const checkPincodeAvailability = async () => {
    if (!pincodeInput.trim()) {
      toast('Please enter a pincode', { type: 'error' });
      return;
    }

    setCheckingPincode(true);
    try {
      const isAvailable = product?.category?.availablePinCodes?.includes(pincodeInput);
      setPincodeCheckResult(isAvailable);

      if (isAvailable) {
        toast('Pincode is available for delivery', { type: 'success' });
      } else {
        toast('Pincode is not available for delivery', { type: 'error' });
      }
    } catch (error) {
      console.error("Error checking pincode:", error);
      toast('Error checking pincode', { type: 'error' });
    } finally {
      setCheckingPincode(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLogin(!!token);
    fetchProduct();
    fetchCartItems();
  }, [productId]);

  const [visibleImages, setVisibleImages] = useState(4);
  const [showbttn, setShowbtn] = useState(3);
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  const [showCakeMessagePopup, setShowCakeMessagePopup] = useState(false);
  const [tempCakeMessage, setTempCakeMessage] = useState("");
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCartWithMessage = async () => {
    if (!isLogin) {
      setShowPopup(true);
      return;
    }
    if (!selectedSize) {
      toast('Please select a size', { type: 'error' });
      return;
    }

    setIsAddingToCart(true);

    try {
      await addToCartCake(
        productId,
        setIsLogin,
        setShowPopup,
        fetchCartItems,
        setCartItems,
        setProductLoaders,
        selectedSize._id,
        tempCakeMessage
      );
      setShowCakeMessagePopup(false);
      setTempCakeMessage("");
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleAddToCartClick = () => {
    if (product?.category?._id === "67b451f7ec3a4e4a3bbe5633") {
      // Always show message popup for cakes
      setShowCakeMessagePopup(true);
    } else {
      handleIncreaseQuantity();
    }
  };

  const handleIncreaseQuantity = async () => {
    setQuantityLoading(true);
    if (!isLogin) {
      setShowPopup(true);
      return;
    }
    if (!selectedSize) {
      toast('Please select a size', { type: 'error' });
      return;
    }
    if (selectedSize.quantity === cartQuantity) {
      toast('Cannot add more than available quantity.', { type: 'error' });
      return;
    }

    try {
      if (product?.category?._id === "67b451f7ec3a4e4a3bbe5633") {
        // For cake products, show the message popup
        setShowCakeMessagePopup(true);
      } else {
        // For non-cake products
        await addToCart(
          productId,
          setIsLogin,
          setShowPopup,
          fetchCartItems,
          setCartItems,
          setProductLoaders,
          selectedSize._id
        );
      }
    } catch (error) {
      console.error("Error increasing quantity:", error);
    } finally {
      setQuantityLoading(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 550) {
        setShowbtn(3);
        setVisibleImages(3);
      } else {
        setShowbtn(5);
        setVisibleImages(5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const checkCart = () => {
      const cartItem = completeCart?.orderItems?.find(item =>
        item.productId._id === productId &&
        item.size._id === selectedSize?._id
      );

      setIsInCart(!!cartItem);
      setCartQuantity(cartItem ? cartItem.quantity : 0);

      if (cartItem?.cakemessage) {
        setCurrentCartMessage(cartItem.cakemessage);
        setCakeMessage(cartItem.cakemessage);
      } else {
        setCurrentCartMessage("");
        setCakeMessage("");
      }
    };

    checkCart();
  }, [completeCart, productId, selectedSize]);

  const updateCakeMessage = async () => {
    if (!isLogin || !isInCart || !selectedSize || cakeMessage === currentCartMessage) {
      return;
    }

    try {
      await makeApi('/api/update-cart-message', 'PUT', {
        productId,
        sizeId: selectedSize._id,
        message: cakeMessage
      });
      setCurrentCartMessage(cakeMessage);
    } catch (error) {
      console.error("Error updating cake message:", error);
      setCakeMessage(currentCartMessage);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cakeMessage !== currentCartMessage) {
        updateCakeMessage();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [cakeMessage]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await makeApi(`/api/get-single-product/${productId}`, "GET");
      setProduct(response.data.product);
      setSizes(response.data.sizes);
      setIncludes(response.data.include)
      setSelectedImage(response.data.product.image[0])
      setProductNuturitions(response.data.productNuturitions)
      if (response.data.sizes.length > 0) {
        const availableSize = response.data.sizes[0];
        setSelectedSize(availableSize || null);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (index) => {
    setSelectedIndex(index);
  };


  const fetchCartItems = async () => {
    try {
      await fetchCart(setCartItems, setCompleteCart, setFetchCartLoader);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    const checkCart = () => {
      const cartItem = cartItems.find(item => item.productId === productId && item.size === selectedSize?._id);
      setIsInCart(!!cartItem);
      setCartQuantity(cartItem ? cartItem.quantity : 0);
    };
    checkCart();
  }, [cartItems, productId, selectedSize]);

  const handleSizeChange = size => setSelectedSize(size);

  const handleAddToCart = async () => {
    if (!isLogin) {
      setShowPopup(true);
      return;
    }
    if (!selectedSize) {
      toast('Please select a size', { type: 'error' });
      return;
    }
    try {
      if (product?.category?._id === "67b451f7ec3a4e4a3bbe5633") {
        setShowCakeMessagePopup(true);
      } else {
        await addToCart(
          productId,
          setIsLogin,
          setShowPopup,
          fetchCartItems,
          setCartItems,
          setProductLoaders,
          selectedSize._id
        );
        navigate('/cart');
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleDecreaseQuantity = async () => {
    if (cartQuantity > 0) {
      try {
        setQuantityLoading(true);
        if (product?.category?._id === "67b451f7ec3a4e4a3bbe5633") {
          // Handle cake removal
          const cakeItems = completeCart.orderItems.filter(item =>
            item.productId._id === productId &&
            item.size._id === selectedSize?._id
          );

          if (cakeItems.length > 0) {
            const lastItem = cakeItems[cakeItems.length - 1];
            await removeCakeFromCart(
              lastItem._id,
              setProductLoaders,
              setCartItems,
              fetchCartItems
            );
          }
        } else {
          // Existing non-cake removal
          await removeFromCart(
            productId,
            setProductLoaders,
            setCartItems,
            fetchCartItems,
            selectedSize._id
          );
        }
      } catch (error) {
        console.error("Error decreasing quantity:", error);
      } finally {
        setQuantityLoading(false);
      }
    }
  };

  const handleBuyNow = () => {
    if (!isLogin) {
      setShowPopup(true);
    } else {
      handleAddToCart();
      fetchCartItems();
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  function calculateDiscountPercentage(originalPrice, finalPrice) {
    if (!originalPrice || !finalPrice || originalPrice <= finalPrice) {
      return null;
    }
    const discount = ((originalPrice - finalPrice) / originalPrice) * 100;
    return Math.round(discount);
  }

  if (loading) {
    return (
      <div className={styles.productLoader}>
        <PrimaryLoader />
      </div>
    );
  }

  if (!product) {
    return <h1>Product Not Found</h1>;
  }

  const scrollLeft = () => {
    const newIndex = Math.max(0, selectedIndex - 1);
    setSelectedIndex(newIndex);

    // Update startIndex if we need to scroll the thumbnail container
    if (newIndex < startIndex) {
      setStartIndex(newIndex);
    }
  };

  const scrollRight = () => {
    const newIndex = Math.min(product.image.length - 1, selectedIndex + 1);
    setSelectedIndex(newIndex);

    // Update startIndex if we need to scroll the thumbnail container
    if (newIndex >= startIndex + visibleImages) {
      setStartIndex(startIndex + 1);
    }
  };
  const countProductsWithSameId = (productId) => {
    if (!completeCart?.orderItems) return 0;

    return completeCart.orderItems.reduce((count, item) => {
      return item.productId._id === productId ? count + 1 : count;
    }, 0);
  };

  return (
    <>
      {showPopup && <LoginPopup onClose={closePopup} />}
      <ToastContainer position="top-center" />
      <div>
        <div className={styles.backButton} >
          <GoArrowLeft onClick={() => navigate(-1)} />
        </div>
        <div className={styles.productContainer}>
          <div className={styles.imgContainer}>
            <div className={styles.innerImgContainer}>
              <div className={styles.mainImg} onMouseEnter={() => setIsHoveringImage(true)}
                onMouseLeave={() => setIsHoveringImage(false)}
              >
                <div className={styles.desktopImg}>
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: 'Selected Product Image',
                        width: 500,
                        height: 450,
                        src: product.image[selectedIndex],
                        className: "smallZoom"
                      },
                      largeImage: {
                        src: product.image[selectedIndex],
                        width: 2500,
                        height: 2500,
                        className: "largeZoom",
                        style: {
                          backgroundColor: "#000",
                        }
                      },
                      enlargedImageContainerDimensions: {
                        width: "180%",
                        height: "130%",
                      },
                      shouldHideHintAfterFirstActivation: false
                    }}
                  />
                </div>
                {/* <img src={selectedImage} alt="Selected" className={styles.mediaMainImg} /> */}
                <img
                  src={product.image[selectedIndex]}
                  alt="Selected"
                  className={styles.mediaMainImg}
                />
              </div>



              <div className={styles.subImgContainer}>
                {(product.image.length > visibleImages) && (
                  <button
                    className={styles.scrollButton}
                    onClick={scrollLeft}
                    disabled={selectedIndex === 0}
                  >
                    <FaChevronLeft />
                  </button>
                )}

                <div className={styles.subImg} ref={scrollContainerRef}>
                  {product.image.slice(startIndex, startIndex + visibleImages).map((imgUrl, index) => {
                    const actualIndex = startIndex + index;
                    return (
                      <div
                        key={actualIndex}
                        className={`${styles.subImg1} ${actualIndex === selectedIndex ? styles.activeImage : ""}`}
                        onClick={() => handleImageClick(actualIndex)}
                      >
                        <img src={imgUrl} alt={`Product Image ${actualIndex + 1}`} />
                      </div>
                    );
                  })}
                </div>

                {(product.image.length > visibleImages) && (
                  <button
                    className={styles.scrollButton}
                    onClick={scrollRight}
                    disabled={selectedIndex === product.image.length - 1}
                  >
                    <FaChevronRight />
                  </button>
                )}
              </div>

            </div>
          </div>
          <div className={styles.productContant}>
            <div className={styles.title}>
              <div className={styles.productPriceName}>
                <h1 className={styles.productdetailsname}>{product?.name}</h1>
                <div className={styles.priceDetails}>
                  <div className={styles.priceFlexCol}>
                    <div className={styles.dicountinprecentage}>
                      <h4>₹{selectedSize?.FinalPrice.toFixed(2)}</h4>
                      {selectedSize?.price > selectedSize?.FinalPrice &&
                        <span style={{ color: 'red', marginLeft: '15px' }}>
                          -{calculateDiscountPercentage(selectedSize?.price, selectedSize?.FinalPrice)}%
                        </span>}
                    </div>

                    {selectedSize?.price > selectedSize?.FinalPrice && (
                      <span className={styles.mrpSpan}> M.R.P ₹{selectedSize?.price}</span>
                    )}
                    <span className={styles.inclusiveOffAllTax}>Inclusive of all taxes</span>
                    <div className={styles.actions}>
                      {isInCart ? (
                        <div className={styles.cartIncDec}>
                          <svg xmlns="http://www.w3.org/2000/svg" onClick={handleDecreaseQuantity} width="30" height="30" fill="currentColor" class="bi bi-dash text-black" style={{ cursor: "pointer" }} viewBox="0 0 16 16">
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                          </svg>
                          {quantityLoading ? (
                            <div className={styles.countLoaderss}>
                            </div>
                          ) : (
                            <>
                              {
                                countProductsWithSameId(productId) > 1 ? (
                                  <p>{countProductsWithSameId(productId)}</p>
                                ) : (
                                  <p>{cartQuantity}</p>
                                )
                              }
                            </>
                          )}
                          <svg xmlns="http://www.w3.org/2000/svg" onClick={handleIncreaseQuantity} width="30" height="30" fill="currentColor" class="bi bi-plus text-black" style={{ cursor: "pointer" }} viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                          </svg>
                        </div>
                      ) : (
                        fetchCartLoader ? (
                          <div className={styles.countLoaderss}>
                          </div>
                        ) : (
                          <>
                            <div
                              className={styles.addTocart}
                              onClick={handleAddToCartClick}
                            >
                              Add to Cart
                            </div>
                          </>
                        )
                      )}
                    </div>
                  </div>
                  {showCakeMessagePopup && (
                    <div className="new_message_popup__overlay">
                      <div className="new_message_popup__popup">
                        <div className="new_message_popup__header">
                          <h3 className="new_message_popup__title">Personalize Your Cake</h3>
                          <p className="new_message_popup__subtitle">Add a special message to make it unique!</p>
                        </div>
                        <div className="new_message_popup__content">
                          <textarea
                            className="new_message_popup__textarea"
                            value={tempCakeMessage}
                            onChange={(e) => setTempCakeMessage(e.target.value)}
                            placeholder="Happy Birthday! 🎂 (max 20 characters)"
                            maxLength={20}
                          />
                          <div className="new_message_popup__counter">
                            {tempCakeMessage.length}/20 characters
                          </div>
                        </div>
                        <div className="new_message_popup__buttons">
                          <button
                            className="new_message_popup__button new_message_popup__button--cancel"
                            onClick={() => {
                              setShowCakeMessagePopup(false);
                              setTempCakeMessage("");
                            }}
                            disabled={isAddingToCart}
                          >
                            Cancel
                          </button>
                          <button
                            className="new_message_popup__button new_message_popup__button--save"
                            onClick={handleAddToCartWithMessage}
                          // disabled={isAddingToCart || !tempCakeMessage.trim()}
                          >
                            {isAddingToCart ? (
                              <>
                                <span className="new_message_popup__spinner"></span>
                                Adding to Cart...
                              </>
                            ) : (
                              'Add Message'
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className={styles.allAddToCart}>
                    {sizes.length > 1 && sizes.some(size => size.size && size.size.toLowerCase() !== 'null') && (
                      <div className={styles.sizeOptions}>
                        <div className={styles.selectQuntitytext}>Select Quantity:</div>
                        <div className={styles.sizeButtons}>
                          {sizes.map(size => (
                            size.size && size.size.toLowerCase() !== 'null' && (
                              <div
                                key={size._id}
                                className={`${styles.sizeButtondiv} ${size._id === selectedSize?._id ? '' : styles.selectedSizeButton}`}
                                onClick={() => handleSizeChange(size)}
                              >
                                <div className={styles.finalpricebutton}>
                                  ₹{size.FinalPrice}
                                </div>
                                <div className={styles.sizetypebutton}>
                                  {size.size}{size.sizetype}
                                </div>
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
            <div className={styles.description}>
              <p className={styles.description} >{product?.description}</p>
            </div>
            {product?.category?._id === "67b451f7ec3a4e4a3bbe5633" && (
              <div className={styles.pincodeCheckContainer}>
                <div className={styles.pincodeCheckTitle}>Check Delivery Availability</div>
                <div className={styles.pincodeInputGroup}>
                  {!isHoveringImage ? <>
                    <input
                      type="text"
                      value={pincodeInput}
                      onChange={(e) => setPincodeInput(e.target.value)}
                      placeholder="Enter your pincode"
                      maxLength={6}
                      className={styles.pincodeInput}
                    />
                  </> : <>
                    <input
                      type="text"
                      value={pincodeInput}
                      onChange={(e) => setPincodeInput(e.target.value)}
                      placeholder=""
                      maxLength={6}
                      className={styles.pincodeInput}
                    />
                  </>
                  }
                  <button
                    onClick={checkPincodeAvailability}
                    disabled={checkingPincode}
                    className={styles.pincodeCheckButton}
                  >
                    {checkingPincode ? 'Checking...' : 'Check'}
                  </button>
                </div>
                {pincodeCheckResult !== null && (
                  <div className={`${styles.pincodeResult} ${pincodeCheckResult ? styles.pincodeAvailable : styles.pincodeNotAvailable
                    }`}>
                    {pincodeCheckResult ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                        Available for delivery at this pincode
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                        Not available for delivery at this pincode
                      </>
                    )}
                  </div>
                )}
              </div>
            )}


            <div className={styles.description}>
              {product?.category?._id == "67b451f7ec3a4e4a3bbe5633" && <div className={styles.availableonlyspan}><span> Available Only in </span> <span style={{ textDecoration: 'underline', textUnderlineOffset: "3px" }} > Ludhiana </span> </div>}
              <p className={styles.description}> </p>
            </div>

            <div className={styles.vegetarian}>
              <img src={assets.vegetarian} alt="" />
              <p>This is a <strong>Vegetarian</strong> product.</p>
            </div>
            {includes && includes.length > 0 && (
              <div className={styles.includes}>
                <h2>INCLUDES</h2>
                <ul>
                  {includes.map((item, id) => (
                    <li key={id}>{item?.include}</li>
                  ))}
                </ul>
              </div>
            )}


            {product?.ingridents && (
              <div className={styles.product_details_new_section}>
                <h2 className={styles.title_for_ingredients} >INGREDIENTS</h2>
                <p className={styles.product_details_new_text}>
                  {product.ingridents}
                </p>
              </div>
            )}

            {product?.allergen && (
              <div className={styles.product_details_new_section}>
                <h2 className={styles.title_for_ingredients}>ALLERGENS</h2>
                <p className={styles.product_details_new_text}>
                  {product.allergen}
                </p>
              </div>
            )}

            {
              productNuturitions && productNuturitions.length > 1 && (
                <div className={styles.nutritionContainer}>
                  <h2 className={styles.title2}>NUTRITIONAL INFORMATION Per 100g <br />
                    <span>Approximate Composition</span></h2>
                  <hr />
                  <div className={styles.nutritionGrid}>
                    <div className={styles.header}>
                      <span>Nutritional Facts</span>
                      <span>Values</span>
                    </div>
                    {productNuturitions.map((item) => (
                      <div key={item._id} className={styles.nutritionRow}>
                        <span className={styles.nutritionName}>{item.nutrition}</span>
                        <span className={styles.nutritionValue}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            }



          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import LoginPopup from "../../components/LoginPopup/LoginPopup.jsx";
// import PrimaryLoader from "../loaders/primaryloader.jsx";
// import { makeApi } from "../../api/callApi.tsx";
// import styles from "../../pages/CSS/product/productDetails.module.css";
// import { addToCart, removeFromCart, fetchCart, addToCartCake, removeCakeFromCart } from "../../utils/productFunction.js";
// import "../../pages/CSS/product/productDetails.css";
// import { GoArrowLeft } from "react-icons/go";
// import { assets } from "../../assets/assets.js";
// import ReactImageMagnify from 'react-image-magnify';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// function ProductDetails() {
//   const navigate = useNavigate();
//   const { productId } = useParams();
//   const [completeCart, setCompleteCart] = useState([]);
//   const [load, setLoad] = useState(false)
//   const [product, setProduct] = useState(null);
//   const [selectedImage, setSelectedImage] = useState("");

//   const [sizes, setSizes] = useState([]);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const [isInCart, setIsInCart] = useState(false);
//   const [cartQuantity, setCartQuantity] = useState(0);
//   const [isLogin, setIsLogin] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [includes, setIncludes] = useState();
//   const [quantityLoading, setQuantityLoading] = useState(false);
//   const [productNuturitions, setProductNuturitions] = useState([]);
//   const [productLoaders, setProductLoaders] = useState({});
//   const [fetchCartLoader, setFetchCartLoader] = useState(false);
//   const [startIndex, setStartIndex] = useState(0);
//   const scrollContainerRef = useRef(null);
//   const [cakeMessage, setCakeMessage] = useState("");
//   const [currentCartMessage, setCurrentCartMessage] = useState("");
//   const [pincodeInput, setPincodeInput] = useState("");
//   const [pincodeCheckResult, setPincodeCheckResult] = useState(null);
//   const [checkingPincode, setCheckingPincode] = useState(false);


//   const checkPincodeAvailability = async () => {
//     if (!pincodeInput.trim()) {
//       toast('Please enter a pincode', { type: 'error' });
//       return;
//     }

//     setCheckingPincode(true);
//     try {
//       const isAvailable = product?.category?.availablePinCodes?.includes(pincodeInput);
//       setPincodeCheckResult(isAvailable);

//       if (isAvailable) {
//         toast('Pincode is available for delivery', { type: 'success' });
//       } else {
//         toast('Pincode is not available for delivery', { type: 'error' });
//       }
//     } catch (error) {
//       console.error("Error checking pincode:", error);
//       toast('Error checking pincode', { type: 'error' });
//     } finally {
//       setCheckingPincode(false);
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsLogin(!!token);
//     fetchProduct();
//     fetchCartItems();
//   }, [productId]);

//   const [visibleImages, setVisibleImages] = useState(4);
//   const [showbttn, setShowbtn] = useState(3);
//   const [isHoveringImage, setIsHoveringImage] = useState(false);

//   const [showCakeMessagePopup, setShowCakeMessagePopup] = useState(false);
//   const [tempCakeMessage, setTempCakeMessage] = useState("");
//   const [isAddingToCart, setIsAddingToCart] = useState(false);

//   const handleAddToCartWithMessage = async () => {
//     if (!isLogin) {
//       setShowPopup(true);
//       return;
//     }
//     if (!selectedSize) {
//       toast('Please select a size', { type: 'error' });
//       return;
//     }

//     setIsAddingToCart(true);

//     try {
//       await addToCartCake(
//         productId,
//         setIsLogin,
//         setShowPopup,
//         fetchCartItems,
//         setCartItems,
//         setProductLoaders,
//         selectedSize._id,
//         tempCakeMessage
//       );
//       setShowCakeMessagePopup(false);
//       setTempCakeMessage("");
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     } finally {
//       setIsAddingToCart(false);
//     }
//   };

//   const handleAddToCartClick = () => {
//     if (product?.category?._id === "67b451f7ec3a4e4a3bbe5633") {
//       // Always show message popup for cakes
//       setShowCakeMessagePopup(true);
//     } else {
//       handleIncreaseQuantity();
//     }
//   };

//   const handleIncreaseQuantity = async () => {
//     setQuantityLoading(true);
//     if (!isLogin) {
//       setShowPopup(true);
//       return;
//     }
//     if (!selectedSize) {
//       toast('Please select a size', { type: 'error' });
//       return;
//     }
//     if (selectedSize.quantity === cartQuantity) {
//       toast('Cannot add more than available quantity.', { type: 'error' });
//       return;
//     }

//     try {
//       if (product?.category?._id === "67b451f7ec3a4e4a3bbe5633") {
//         // For cake products, show the message popup
//         setShowCakeMessagePopup(true);
//       } else {
//         // For non-cake products
//         await addToCart(
//           productId,
//           setIsLogin,
//           setShowPopup,
//           fetchCartItems,
//           setCartItems,
//           setProductLoaders,
//           selectedSize._id
//         );
//       }
//     } catch (error) {
//       console.error("Error increasing quantity:", error);
//     } finally {
//       setQuantityLoading(false);
//     }
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth <= 550) {
//         setShowbtn(3);
//         setVisibleImages(3);
//       } else {
//         setShowbtn(5);
//         setVisibleImages(5);
//       }
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     const checkCart = () => {
//       const cartItem = completeCart?.orderItems?.find(item =>
//         item.productId._id === productId &&
//         item.size._id === selectedSize?._id
//       );

//       setIsInCart(!!cartItem);
//       setCartQuantity(cartItem ? cartItem.quantity : 0);

//       if (cartItem?.cakemessage) {
//         setCurrentCartMessage(cartItem.cakemessage);
//         setCakeMessage(cartItem.cakemessage);
//       } else {
//         setCurrentCartMessage("");
//         setCakeMessage("");
//       }
//     };

//     checkCart();
//   }, [completeCart, productId, selectedSize]);

//   const updateCakeMessage = async () => {
//     if (!isLogin || !isInCart || !selectedSize || cakeMessage === currentCartMessage) {
//       return;
//     }

//     try {
//       await makeApi('/api/update-cart-message', 'PUT', {
//         productId,
//         sizeId: selectedSize._id,
//         message: cakeMessage
//       });
//       setCurrentCartMessage(cakeMessage);
//     } catch (error) {
//       console.error("Error updating cake message:", error);
//       setCakeMessage(currentCartMessage);
//     }
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (cakeMessage !== currentCartMessage) {
//         updateCakeMessage();
//       }
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [cakeMessage]);

//   const fetchProduct = async () => {
//     try {
//       setLoading(true);
//       const response = await makeApi(`/api/get-single-product/${productId}`, "GET");
//       setProduct(response.data.product);
//       setSizes(response.data.sizes);
//       setIncludes(response.data.include)
//       setSelectedImage(response.data.product.image[0])
//       setProductNuturitions(response.data.productNuturitions)
//       if (response.data.sizes.length > 0) {
//         const availableSize = response.data.sizes[0];
//         setSelectedSize(availableSize || null);
//       }
//     } catch (error) {
//       console.error("Error fetching product details:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageClick = (imageUrl) => {
//     setSelectedImage(imageUrl)
//   }

//   const fetchCartItems = async () => {
//     try {
//       await fetchCart(setCartItems, setCompleteCart, setFetchCartLoader);
//     } catch (error) {
//       console.error("Error fetching cart items:", error);
//     }
//   };

//   useEffect(() => {
//     const checkCart = () => {
//       const cartItem = cartItems.find(item => item.productId === productId && item.size === selectedSize?._id);
//       setIsInCart(!!cartItem);
//       setCartQuantity(cartItem ? cartItem.quantity : 0);
//     };
//     checkCart();
//   }, [cartItems, productId, selectedSize]);

//   const handleSizeChange = size => setSelectedSize(size);

//   const handleAddToCart = async () => {
//     if (!isLogin) {
//       setShowPopup(true);
//       return;
//     }
//     if (!selectedSize) {
//       toast('Please select a size', { type: 'error' });
//       return;
//     }
//     try {
//       if (product?.category?._id === "67b451f7ec3a4e4a3bbe5633") {
//         setShowCakeMessagePopup(true);
//       } else {
//         await addToCart(
//           productId,
//           setIsLogin,
//           setShowPopup,
//           fetchCartItems,
//           setCartItems,
//           setProductLoaders,
//           selectedSize._id
//         );
//         navigate('/cart');
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };

//   const handleDecreaseQuantity = async () => {
//     if (cartQuantity > 0) {
//       try {
//         setQuantityLoading(true);
//         if (product?.category?._id === "67b451f7ec3a4e4a3bbe5633") {
//           // Handle cake removal
//           const cakeItems = completeCart.orderItems.filter(item =>
//             item.productId._id === productId &&
//             item.size._id === selectedSize?._id
//           );

//           if (cakeItems.length > 0) {
//             const lastItem = cakeItems[cakeItems.length - 1];
//             await removeCakeFromCart(
//               lastItem._id,
//               setProductLoaders,
//               setCartItems,
//               fetchCartItems
//             );
//           }
//         } else {
//           // Existing non-cake removal
//           await removeFromCart(
//             productId,
//             setProductLoaders,
//             setCartItems,
//             fetchCartItems,
//             selectedSize._id
//           );
//         }
//       } catch (error) {
//         console.error("Error decreasing quantity:", error);
//       } finally {
//         setQuantityLoading(false);
//       }
//     }
//   };

//   const handleBuyNow = () => {
//     if (!isLogin) {
//       setShowPopup(true);
//     } else {
//       handleAddToCart();
//       fetchCartItems();
//     }
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//   };

//   function calculateDiscountPercentage(originalPrice, finalPrice) {
//     if (!originalPrice || !finalPrice || originalPrice <= finalPrice) {
//       return null;
//     }
//     const discount = ((originalPrice - finalPrice) / originalPrice) * 100;
//     return Math.round(discount);
//   }

//   if (loading) {
//     return (
//       <div className={styles.productLoader}>
//         <PrimaryLoader />
//       </div>
//     );
//   }

//   if (!product) {
//     return <h1>Product Not Found</h1>;
//   }

//   const scrollLeft = () => {
//     if (startIndex > 0) {
//       setStartIndex(startIndex - 1);
//     }
//   };

//   const scrollRight = () => {
//     if (startIndex + 4 < product.image.length + 1) {
//       setStartIndex(startIndex + 1);
//     }
//   };
//   const countProductsWithSameId = (productId) => {
//     if (!completeCart?.orderItems) return 0;

//     return completeCart.orderItems.reduce((count, item) => {
//       return item.productId._id === productId ? count + 1 : count;
//     }, 0);
//   };

//   return (
//     <>
//       {showPopup && <LoginPopup onClose={closePopup} />}
//       <ToastContainer position="top-center" />
//       <div>
//         <div className={styles.backButton} >
//           <GoArrowLeft onClick={() => navigate(-1)} />
//         </div>
//         <div className={styles.productContainer}>
//           <div className={styles.imgContainer}>
//             <div className={styles.innerImgContainer}>
//               <div className={styles.mainImg} onMouseEnter={() => setIsHoveringImage(true)}
//                 onMouseLeave={() => setIsHoveringImage(false)}
//               >
//                 <div className={styles.desktopImg}>
//                   <ReactImageMagnify
//                     {...{
//                       smallImage: {
//                         alt: 'Selected Product Image',
//                         width: 500,
//                         height: 450,
//                         src: selectedImage,
//                         className: "smallZoom"
//                       },
//                       largeImage: {
//                         src: selectedImage,
//                         width: 2500,
//                         height: 2500,
//                         className: "largeZoom",
//                         style: {
//                           backgroundColor: "#000",
//                         }
//                       },
//                       enlargedImageContainerDimensions: {
//                         width: "180%",
//                         height: "130%",
//                       },
//                       shouldHideHintAfterFirstActivation: false
//                     }}
//                   />
//                 </div>
//                 <img src={selectedImage} alt="Selected" className={styles.mediaMainImg} />
//               </div>

//               <div className={styles.subImgContainer}>
//                 {(product.image.length + 1) > showbttn && (
//                   <button className={styles.scrollButton} onClick={scrollLeft} disabled={startIndex === 0}>
//                     <FaChevronLeft />
//                   </button>
//                 )}
//                 <div className={styles.subImg} ref={scrollContainerRef}>
//                   {product.image.slice(startIndex, startIndex + visibleImages).map((imgUrl, index) => (
//                     <div
//                       key={startIndex + index}
//                       className={`${styles.subImg1} ${selectedImage === imgUrl ? styles.activeImage : ""}`}
//                       onClick={() => handleImageClick(imgUrl)}
//                     >
//                       <img src={imgUrl} alt={`Product Image ${startIndex + index}`} />
//                     </div>
//                   ))}
//                 </div>
//                 {(product.image.length + 1) > showbttn && (
//                   <button className={styles.scrollButton} onClick={scrollRight} disabled={startIndex + 4 >= product.image.length + 1}>
//                     <FaChevronRight />
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className={styles.productContant}>
//             <div className={styles.title}>
//               <div className={styles.productPriceName}>
//                 <h1 className={styles.productdetailsname}>{product?.name}</h1>
//                 <div className={styles.priceDetails}>
//                   <div className={styles.priceFlexCol}>
//                     <div className={styles.dicountinprecentage}>
//                       <h4>₹{selectedSize?.FinalPrice.toFixed(2)}</h4>
//                       {selectedSize?.price > selectedSize?.FinalPrice &&
//                         <span style={{ color: 'red', marginLeft: '15px' }}>
//                           -{calculateDiscountPercentage(selectedSize?.price, selectedSize?.FinalPrice)}%
//                         </span>}
//                     </div>

//                     {selectedSize?.price > selectedSize?.FinalPrice && (
//                       <span className={styles.mrpSpan}> M.R.P ₹{selectedSize?.price}</span>
//                     )}
//                     <span className={styles.inclusiveOffAllTax}>Inclusive of all taxes</span>
//                     <div className={styles.actions}>
//                       {isInCart ? (
//                         <div className={styles.cartIncDec}>
//                           <svg xmlns="http://www.w3.org/2000/svg" onClick={handleDecreaseQuantity} width="30" height="30" fill="currentColor" class="bi bi-dash text-black" style={{ cursor: "pointer" }} viewBox="0 0 16 16">
//                             <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
//                           </svg>
//                           {quantityLoading ? (
//                             <div className={styles.countLoaderss}>
//                             </div>
//                           ) : (
//                             <>
//                               {
//                                 countProductsWithSameId(productId) > 1 ? (
//                                   <p>{countProductsWithSameId(productId)}</p>
//                                 ) : (
//                                   <p>{cartQuantity}</p>
//                                 )
//                               }
//                             </>
//                           )}
//                           <svg xmlns="http://www.w3.org/2000/svg" onClick={handleIncreaseQuantity} width="30" height="30" fill="currentColor" class="bi bi-plus text-black" style={{ cursor: "pointer" }} viewBox="0 0 16 16">
//                             <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
//                           </svg>
//                         </div>
//                       ) : (
//                         fetchCartLoader ? (
//                           <div className={styles.countLoaderss}>
//                           </div>
//                         ) : (
//                           <>
//                             <div
//                               className={styles.addTocart}
//                               onClick={handleAddToCartClick}
//                             >
//                               Add to Cart
//                             </div>
//                           </>
//                         )
//                       )}
//                     </div>
//                   </div>
//                   {showCakeMessagePopup && (
//                     <div className="new_message_popup__overlay">
//                       <div className="new_message_popup__popup">
//                         <div className="new_message_popup__header">
//                           <h3 className="new_message_popup__title">Personalize Your Cake</h3>
//                           <p className="new_message_popup__subtitle">Add a special message to make it unique!</p>
//                         </div>
//                         <div className="new_message_popup__content">
//                           <textarea
//                             className="new_message_popup__textarea"
//                             value={tempCakeMessage}
//                             onChange={(e) => setTempCakeMessage(e.target.value)}
//                             placeholder="Happy Birthday! 🎂 (max 20 characters)"
//                             maxLength={20}
//                           />
//                           <div className="new_message_popup__counter">
//                             {tempCakeMessage.length}/20 characters
//                           </div>
//                         </div>
//                         <div className="new_message_popup__buttons">
//                           <button
//                             className="new_message_popup__button new_message_popup__button--cancel"
//                             onClick={() => {
//                               setShowCakeMessagePopup(false);
//                               setTempCakeMessage("");
//                             }}
//                             disabled={isAddingToCart}
//                           >
//                             Cancel
//                           </button>
//                           <button
//                             className="new_message_popup__button new_message_popup__button--save"
//                             onClick={handleAddToCartWithMessage}
//                           // disabled={isAddingToCart || !tempCakeMessage.trim()}
//                           >
//                             {isAddingToCart ? (
//                               <>
//                                 <span className="new_message_popup__spinner"></span>
//                                 Adding to Cart...
//                               </>
//                             ) : (
//                               'Add Message'
//                             )}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                   <div className={styles.allAddToCart}>
//                     {sizes.length > 1 && sizes.some(size => size.size && size.size.toLowerCase() !== 'null') && (
//                       <div className={styles.sizeOptions}>
//                         <div className={styles.selectQuntitytext}>Select Quantity:</div>
//                         <div className={styles.sizeButtons}>
//                           {sizes.map(size => (
//                             size.size && size.size.toLowerCase() !== 'null' && (
//                               <div
//                                 key={size._id}
//                                 className={`${styles.sizeButtondiv} ${size._id === selectedSize?._id ? '' : styles.selectedSizeButton}`}
//                                 onClick={() => handleSizeChange(size)}
//                               >
//                                 <div className={styles.finalpricebutton}>
//                                   ₹{size.FinalPrice}
//                                 </div>
//                                 <div className={styles.sizetypebutton}>
//                                   {size.size}{size.sizetype}
//                                 </div>
//                               </div>
//                             )
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//             </div>
//             <div className={styles.description}>
//               <p className={styles.description} >{product?.description}</p>
//             </div>
//             {product?.category?._id === "67b451f7ec3a4e4a3bbe5633" && (
//               <div className={styles.pincodeCheckContainer}>
//                 <div className={styles.pincodeCheckTitle}>Check Delivery Availability</div>
//                 <div className={styles.pincodeInputGroup}>
//                   {!isHoveringImage ? <>
//                     <input
//                       type="text"
//                       value={pincodeInput}
//                       onChange={(e) => setPincodeInput(e.target.value)}
//                       placeholder="Enter your pincode"
//                       maxLength={6}
//                       className={styles.pincodeInput}
//                     />
//                   </> : <>
//                     <input
//                       type="text"
//                       value={pincodeInput}
//                       onChange={(e) => setPincodeInput(e.target.value)}
//                       placeholder=""
//                       maxLength={6}
//                       className={styles.pincodeInput}
//                     />
//                   </>
//                   }
//                   <button
//                     onClick={checkPincodeAvailability}
//                     disabled={checkingPincode}
//                     className={styles.pincodeCheckButton}
//                   >
//                     {checkingPincode ? 'Checking...' : 'Check'}
//                   </button>
//                 </div>
//                 {pincodeCheckResult !== null && (
//                   <div className={`${styles.pincodeResult} ${pincodeCheckResult ? styles.pincodeAvailable : styles.pincodeNotAvailable
//                     }`}>
//                     {pincodeCheckResult ? (
//                       <>
//                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
//                           <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
//                         </svg>
//                         Available for delivery at this pincode
//                       </>
//                     ) : (
//                       <>
//                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
//                           <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
//                           <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
//                         </svg>
//                         Not available for delivery at this pincode
//                       </>
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}


//             <div className={styles.description}>
//               {product?.category?._id == "67b451f7ec3a4e4a3bbe5633" && <div className={styles.availableonlyspan}><span> Available Only in </span> <span style={{ textDecoration: 'underline', textUnderlineOffset: "3px" }} > Ludhiana </span> </div>}
//               <p className={styles.description}> </p>
//             </div>

//             <div className={styles.vegetarian}>
//               <img src={assets.vegetarian} alt="" />
//               <p>This is a <strong>Vegetarian</strong> product.</p>
//             </div>
//             {includes && includes.length > 0 && (
//               <div className={styles.includes}>
//                 <h2>INCLUDES</h2>
//                 <ul>
//                   {includes.map((item, id) => (
//                     <li key={id}>{item?.include}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}


//             {product?.ingridents && (
//               <div className={styles.product_details_new_section}>
//                 <h2 className={styles.title_for_ingredients} >INGREDIENTS</h2>
//                 <p className={styles.product_details_new_text}>
//                   {product.ingridents}
//                 </p>
//               </div>
//             )}

//             {product?.allergen && (
//               <div className={styles.product_details_new_section}>
//                 <h2 className={styles.title_for_ingredients}>ALLERGENS</h2>
//                 <p className={styles.product_details_new_text}>
//                   {product.allergen}
//                 </p>
//               </div>
//             )}

//             {
//               productNuturitions && productNuturitions.length > 1 && (
//                 <div className={styles.nutritionContainer}>
//                   <h2 className={styles.title2}>NUTRITIONAL INFORMATION Per 100g <br />
//                     <span>Approximate Composition</span></h2>
//                   <hr />
//                   <div className={styles.nutritionGrid}>
//                     <div className={styles.header}>
//                       <span>Nutritional Facts</span>
//                       <span>Values</span>
//                     </div>
//                     {productNuturitions.map((item) => (
//                       <div key={item._id} className={styles.nutritionRow}>
//                         <span className={styles.nutritionName}>{item.nutrition}</span>
//                         <span className={styles.nutritionValue}>{item.value}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )
//             }



//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ProductDetails;