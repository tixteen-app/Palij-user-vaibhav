import { useNavigate } from 'react-router';
import { assets } from '../../../assets/assets'
import styles from './Savory.module.css'
import { useEffect, useRef, useState } from 'react';
import { makeApi } from '../../../api/callApi';
import {
  addToCart,
  removeFromCart,
  fetchCart,
  fetchWishlist,
} from "../../../utils/productFunction.js"
import Primaryloader from '../../loaders/primaryloader';
import LoginPopup from '../../LoginPopup/LoginPopup.jsx';


const Savory = () => {

  const [AllProductLoader, setAllProductLoader] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const swiperRef = useRef(null);


  const [selectedSize, setSelectedSize] = useState(null);
  const [IsLogin, setIsLogin] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [quantityLoading, setQuantityLoading] = useState({});
  const [productLoaders, setProductLoaders] = useState({})
  const [AddTocartLoader, setAddTocartLoader] = useState({})
  const [completeCart, setCompleteCart] = useState([]);



  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLogin(!!token)
  }, [localStorage.getItem("token")])

  const fetchProduct = async () => {
    try {
      setAllProductLoader(true);
      const categoriesResponse = await makeApi(`/api/get-all-categories`, "GET");
      const categories = categoriesResponse.data.categories;

      if (categories.length > 0) {
        const categoryId = categories[2]._id;
        const response = await makeApi(
          `/api/get-all-products-by-category/${categoryId}`,
          "GET"
        );
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAllProductLoader(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchCart(setCartItems)
    fetchCartItems()
  }, []);

  function handleNavigate(id) {
    navigate(`product/product-details/${id}`)
  }

  const handleCategoryClick = () => {
    navigate(`/product/all-products?category=65f3c6ee7fd052885f56d587`);
  };

  const fetchCartItems = async () => {
    try {
      await fetchCart(setCartItems, setCompleteCart, setAddTocartLoader);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };
  const handleIncreaseQuantity = async (productId, size) => {
    if (!IsLogin) {
      setShowPopup(true);
      return;
    }
    const cartItem = cartItems.find(item => item.productId === productId && item.size === size._id);
    if (size.quantity === cartItem?.quantity) {
      toast('Cannot add more than available quantity.', { type: 'error' });
      return;
    }
    try {
      setQuantityLoading(prev => ({ ...prev, [productId]: true }));
      await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, size._id);
    } catch (error) {
      console.error("Error increasing quantity:", error);
    } finally {
      setQuantityLoading(prev => ({ ...prev, [productId]: false }));
    }
  };


  const handleDecreaseQuantity = async (productId, size) => {
    const cartItem = cartItems.find(item => item.productId === productId && item.size === size._id);
    if (cartItem && cartItem.quantity > 0) {
      try {
        setQuantityLoading(prev => ({ ...prev, [productId]: true }));
        await removeFromCart(productId, setProductLoaders, setCartItems, fetchCartItems, size._id);
      } catch (error) {
        console.error("Error decreasing quantity:", error);
      }
      finally {
        setQuantityLoading(prev => ({ ...prev, [productId]: false }));
      }
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>SAVORY</h2>
        <h2 style={{ cursor: "pointer" }} onClick={handleCategoryClick}>VIEW ALL <img src={assets.brownArrow} alt="" />
        </h2>
      </div>
      <div className={styles.content}>
        {products.slice(0, 4).map(item => (
          <div onClick={() => handleNavigate(item._id)} style={{ cursor: "pointer" }}>
            <div className={styles.productContent}>
              <div className={styles.productImage}>
                <img src={item.thumbnail} alt="" />
              </div>
              <div className={styles.name}>
                <p>{item.name}</p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Savory

// import { useNavigate } from 'react-router';
// import { assets } from '../../../assets/assets';
// import styles from './Savory.module.css';
// import { useEffect, useRef, useState } from 'react';
// import { makeApi } from '../../../api/callApi';
// import {
//   addToCart,
//   removeFromCart,
//   fetchCart,
//   fetchWishlist,
// } from "../../../utils/productFunction.js";
// import Primaryloader from '../../loaders/primaryloader';
// import LoginPopup from '../../LoginPopup/LoginPopup.jsx';
// import AddIcon from "../../../assets/add_icon_green.png";
// import RemoveIcon from "../../../assets/remove_icon_red.png";

// const Savory = () => {

//   const [AllProductLoader, setAllProductLoader] = useState(false);
//   const [products, setProducts] = useState([]);
//   console.log(products);
//   const navigate = useNavigate();
//   const swiperRef = useRef(null);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [IsLogin, setIsLogin] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const [quantityLoading, setQuantityLoading] = useState({});
//   const [productLoaders, setProductLoaders] = useState({});
//   const [AddTocartLoader, setAddTocartLoader] = useState({});
//   const [completeCart, setCompleteCart] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLogin(!!token);
//   }, [localStorage.getItem("token")]);

//   const fetchProduct = async () => {
//     try {
//       setAllProductLoader(true);
//       const categoriesResponse = await makeApi(`/api/get-all-categories`, "GET");
//       const categories = categoriesResponse.data.categories;

//       if (categories.length > 0) {
//         const categoryId = categories[2]._id;
//         const response = await makeApi(
//           `/api/get-all-products-by-category/${categoryId}`,
//           "GET"
//         );
//         setProducts(response.data.products);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setAllProductLoader(false);
//     }
//   };

//   useEffect(() => {
//     fetchProduct();
//     fetchCart(setCartItems);
//     fetchCartItems();
//   }, []);

//   const fetchCartItems = async () => {
//     try {
//       await fetchCart(setCartItems, setCompleteCart, setAddTocartLoader);
//     } catch (error) {
//       console.error("Error fetching cart items:", error);
//     }
//   };

//   const handleIncreaseQuantity = async (productId, size) => {
//     if (!IsLogin) {
//       setShowPopup(true);
//       return;
//     }
//     const cartItem = cartItems.find(item => item.productId === productId && item.size === size._id);
//     if (size.quantity === cartItem?.quantity) {
//       toast('Cannot add more than available quantity.', { type: 'error' });
//       return;
//     }
//     try {
//       setQuantityLoading(prev => ({ ...prev, [productId]: true }));
//       await addToCart(productId, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, size._id);
//     } catch (error) {
//       console.error("Error increasing quantity:", error);
//     } finally {
//       setQuantityLoading(prev => ({ ...prev, [productId]: false }));
//     }
//   };

//   const handleDecreaseQuantity = async (productId, size) => {
//     const cartItem = cartItems.find(item => item.productId === productId && item.size === size._id);
//     if (cartItem && cartItem.quantity > 0) {
//       try {
//         setQuantityLoading(prev => ({ ...prev, [productId]: true }));
//         await removeFromCart(productId, setProductLoaders, setCartItems, fetchCartItems, size._id);
//       } catch (error) {
//         console.error("Error decreasing quantity:", error);
//       } finally {
//         setQuantityLoading(prev => ({ ...prev, [productId]: false }));
//       }
//     }
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//   };

//   const handleNavigate = (id) => {
//     // navigate(`product/product-details/${id}`);
//   };

//   const handleCategoryClick = () => {
//     // navigate(`/product/all-products?category=65f3c6ee7fd052885f56d587`);
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <h2>SAVORY</h2>
//         <h2 style={{ cursor: "pointer" }} onClick={handleCategoryClick}>VIEW ALL <img src={assets.brownArrow} alt="" /></h2>
//       </div>

//       {showPopup && <LoginPopup onClose={closePopup} />}

//       <div className={styles.content}>
//         {AllProductLoader ? (
//           <div className={styles.AllProductLoader}>
//             <div>
//               <Primaryloader />
//             </div>
//           </div>
//         ) : (
//           products.slice(0, 4).map(item => 
//           {
//             <div key={item._id} onClick={() => handleNavigate(item._id)} style={{ cursor: "pointer" }}>
//               <div className={styles.productContent}>
//                 <div className={styles.productImage}>
//                   <img src={item.thumbnail} alt="" />
//                 </div>
//                 <div className={styles.name}>
//                   <p>{item.name}</p>
//                 </div>
//                 <div className={styles.addToCartSection}>
//                   <div className={styles.cartActions}>
//                     {cartItems.some(cartItem => cartItem.productId === item._id) ? (
//                       <div className={styles.cartIncDec}>
//                         <img
//                           src={RemoveIcon}
//                           alt="Remove"
//                           onClick={() => handleDecreaseQuantity(item._id, item.size[0])}
//                         />
//                         {quantityLoading[item._id] ? (
//                           <div className={styles.loader}></div>
//                         ) : (
//                           <p>{cartItems.find(cartItem => cartItem.productId === item._id)?.quantity || 0}</p>
//                         )}
//                         <img
//                           src={AddIcon}
//                           alt="Add"
//                           onClick={() => handleIncreaseQuantity(item._id, item.size[0])}
//                         />
//                       </div>
//                     ) : (
//                       <button onClick={() => handleIncreaseQuantity(item._id, item.size[0])}>
//                         Add to Cart 
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// export default Savory;
