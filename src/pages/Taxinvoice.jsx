
// "use client";

// import { usePDF } from "react-to-pdf";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import "./CSS/taxinvoice.css";
// import  {assets} from "../assets/assets";
// import { makeApi } from "../api/callApi";

// export default function Taxinvoice() {
//   const [orderSummary, setOrderSummary] = useState(null);
//   const { ordersummary } = useParams();
//   const [shiprocketorder, setShiprocketorder] = useState(null);
//   const [taxDetails, setTaxDetails] = useState({
//     totalGstAmount: 0,
//     totalAmountNoGST: 0,
//     deliveryCharge: 0,
//     finalTotal: 0
//   });

//   useEffect(() => {
//     const fetchOrderSummary = async () => {
//       try {
//         const response = await makeApi(
//           `/api/get-second-order-by-id/${ordersummary}`,
//           "GET"
//         );
//         const fetchedOrderSummary = response.data.secondorder;
//         setOrderSummary(fetchedOrderSummary);

//         // Calculate tax details using the same logic as in cart
//         if (fetchedOrderSummary?.CartId?.orderItems?.length > 0) {
//           let totalGstAmount = 0;
//           let totalAmountNoGST = 0;
//           let totalDiscountedBase = 0;
//           const cart = fetchedOrderSummary.CartId;

//           // Without coupon calculation
//           if (!cart.couapnDiscount) {
//             cart.orderItems.forEach(item => {
//               const finalPrice = item.singleProductPrice || 0;
//               const gstPercentage = item.productId?.Tax || item.productId?.category?.tax || 12;
//               const basePrice = finalPrice / (1 + gstPercentage / 100);

//               totalAmountNoGST += basePrice * item.quantity;
//               totalGstAmount += (finalPrice - basePrice) * item.quantity;
//             });
//           }
//           // With coupon calculation
//           else {
//             const totalDiscount = cart.couapnDiscount;
//             const originalTotal = cart.totalPriceWithoutDiscount;

//             cart.orderItems.forEach(item => {
//               const finalPrice = item.singleProductPrice || 0;
//               const gstPercentage = item.productId?.Tax || item.productId?.category?.tax || 12;

//               // Calculate base price
//               const itemBasePrice = finalPrice / (1 + gstPercentage / 100);

//               // Calculate coupon discount proportion
//               const itemShare = (finalPrice * item.quantity) / originalTotal;
//               const itemDiscount = totalDiscount * itemShare;

//               // Apply coupon discount to base price PER UNIT
//               const discountedBasePerUnit = itemBasePrice - (itemDiscount / (1 + gstPercentage / 100)) / item.quantity;

//               totalDiscountedBase += discountedBasePerUnit * item.quantity;
//               totalGstAmount += discountedBasePerUnit * (gstPercentage / 100) * item.quantity;
//             });

//             totalAmountNoGST = totalDiscountedBase;
//           }

//           // Use the actual paid amount from the order
//           const finalTotal = cart.totalPrice || 0;
//           const deliveryCharge = cart.deliveryCharges || 0;

//           setTaxDetails({
//             totalGstAmount,
//             totalAmountNoGST: cart.couapnDiscount ? totalDiscountedBase : totalAmountNoGST,
//             deliveryCharge,
//             finalTotal
//           });
//         }

//         if (fetchedOrderSummary?.shiprocketOrderId) {
//           const Shipresponse = await makeApi(
//             `/api/shiprocket/get-order-by-id/${fetchedOrderSummary.shiprocketOrderId}`,
//             "GET"
//           );
//           setShiprocketorder(Shipresponse?.data.data);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchOrderSummary();
//   }, [ordersummary]);

//   const [invoiceDate] = useState(new Date().toISOString().split("T")[0]);
//   const isPunjab = orderSummary?.shippingAddress?.state === "Punjab";
//   const logisticPrice = taxDetails.deliveryCharge;
//   const totalPriceWithoutDiscount = taxDetails.totalAmountNoGST + taxDetails.totalGstAmount;
//   const totalPrice = taxDetails.finalTotal;
//   const discount = totalPriceWithoutDiscount - totalPrice;

//   const { toPDF, targetRef } = usePDF({ 
//     filename: `Invoice_${orderSummary?.invoiceId}.pdf`,
//     page: {
//       margin: 10,
//       format: 'a4',
//       orientation: 'portrait'
//     }
//   });

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric'
//     });
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2
//     }).format(amount);
//   };

//   const numberToWords = (num) => {
//     const single = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
//     const double = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 
//                    'Seventeen', 'Eighteen', 'Nineteen'];
//     const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

//     if (num === 0) return 'Zero';

//     const numStr = num.toString().split('.');
//     const wholeNum = parseInt(numStr[0]);
//     const decimalNum = numStr.length > 1 ? parseInt(numStr[1]) : 0;

//     let words = convertToWords(wholeNum);

//     if (decimalNum > 0) {
//       words += ' and ' + convertToWords(decimalNum) + ' Paise';
//     }

//     return words;

//     function convertToWords(num) {
//       if (num < 10) return single[num];
//       if (num < 20) return double[num - 10];
//       if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + single[num % 10] : '');
//       if (num < 1000) return single[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' and ' + convertToWords(num % 100) : '');
//       if (num < 100000) return convertToWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 ? ' ' + convertToWords(num % 1000) : '');
//       if (num < 10000000) return convertToWords(Math.floor(num / 100000)) + ' Lakh' + (num % 100000 ? ' ' + convertToWords(num % 100000) : '');
//       return convertToWords(Math.floor(num / 10000000)) + ' Crore' + (num % 10000000 ? ' ' + convertToWords(num % 10000000) : '');
//     }
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   const renderInvoiceContent = (isPDF = false) => {
//     return (
//       <div className={`invoice-card  ${isPDF ? 'pdf-version' : ''}`} style={{marginTop:"0px"}}>
//         {/* Print Button - Hidden when printing */}
//         <div className="print-button-container">
//           <div onClick={handlePrint} className="print-button">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="16"
//               height="16"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="printer-icon"
//             >
//               <polyline points="6 9 6 2 18 2 18 9"></polyline>
//               <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
//               <rect x="6" y="14" width="12" height="8"></rect>
//             </svg>
//             Print Invoice
//           </div>
//         </div>

//         {/* Invoice Header */}
//         <div className="invoice-header">
//           <div className="header-content">
//             <div className="company-info">
//               <div className="logo-container">
//                 <img src={assets.newlogo} alt="Palji Bakery Logo" className="company-logo" />
//               </div>
//               <div>
//                 <h1 className="company-name">PALJI BAKERY</h1>
//                 <p className="company-address">46V, Main Hambran Rd, Mavir Vihar, Dev Nagar</p>
//                 <p className="company-address">Ludhiana, Punjab 141027</p>
//                 <p className="company-address">Phone: +91 7901706000 | Email: paljibakery@gmail.com</p>
//                 <p className="company-address">GSTIN: 03AABCP1234Z1ZX | PAN: AABCP1234Z</p>
//               </div>
//             </div>
//             <div className="invoice-title">
//               <div>TAX INVOICE</div>
//             </div>
//           </div>
//         </div>

//         {/* Invoice Details Section */}
//         <div className="invoice-details">
//           <div className="details-grid">
//             <div>
//               <div className="detail-row">
//                 <span className="detail-label">Invoice No:</span>
//                 <span>{orderSummary?.invoiceId}</span>
//               </div>
//               <div className="detail-row">
//                 <span className="detail-label">Invoice Date:</span>
//                 <span>{formatDate(orderSummary?.createdAt)}</span>
//               </div>
//               <div className="detail-row">
//                 <span className="detail-label">Order No:</span>
//                 <span>{orderSummary?.orderId}</span>
//               </div>
//             </div>
//             <div>
//               <div className="detail-row">
//                 <span className="detail-label">Payment Method:</span>
//                 <span>{orderSummary?.paymentMethod}</span>
//               </div>
//               <div className="detail-row">
//                 <span className="detail-label">Place of Supply:</span>
//                 <span>{orderSummary?.shippingAddress?.state || "N/A"}</span>
//               </div>
//               <div className="detail-row">
//                 <span className="detail-label">Nature of Supply:</span>
//                 <span>Goods</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Billing & Shipping Section */}
//         <div className="address-section">
//           <div className="address-box">
//             <h3 className="address-title">Billed To:</h3>
//             <p className="customer-name">
//               {orderSummary?.userId?.firstName} {orderSummary?.userId?.lastName}
//             </p>
//             <p className="customer-detail">Email: {orderSummary?.userId?.email}</p>
//             <p className="customer-detail">Phone: {orderSummary?.shippingAddress?.phonenumber || "N/A"}</p>
//           </div>
//           <div className="address-box">
//             <h3 className="address-title">Shipped To:</h3>
//             <p className="customer-name">
//               {orderSummary?.shippingAddress?.firstname} {orderSummary?.shippingAddress?.lastname}
//             </p>
//             <p className="customer-detail">{orderSummary?.shippingAddress?.address}, {orderSummary?.shippingAddress?.city}, {orderSummary?.shippingAddress?.state} - {orderSummary?.shippingAddress?.pincode}</p>
//           </div>
//         </div>

//         {/* Order Summary Table */}
//         <div className="table-container">
//           <div className="table-wrapper">
//             <table className="invoice-table">
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Description</th>
//                   <th>Qty</th>
//                   <th>Rate (₹)</th>
//                   <th>Taxable Amt (₹)</th>
//                   {isPunjab ? (
//                     <>
//                       <th>CGST (%)</th>
//                       <th>CGST Amt (₹)</th>
//                       <th>SGST (%)</th>
//                       <th>SGST Amt (₹)</th>
//                     </>
//                   ) : (
//                     <>
//                       <th>IGST (%)</th>
//                       <th>IGST Amt (₹)</th>
//                     </>
//                   )}
//                   <th>Total (₹)</th>
//                 </tr>
//               </thead>
//               <tbody>
//               {orderSummary?.CartId?.orderItems?.map((item, index) => {
// const taxRate = item?.productId?.category?.tax || 12;
// const finalPrice = item.singleProductPrice || 0;

// let basePrice, gstAmount, halfGST, total;

// // Without coupon
// if (!orderSummary.CartId.couapnDiscount) {
//   basePrice = finalPrice / (1 + taxRate / 100);
//   gstAmount = finalPrice - basePrice;
//   halfGST = gstAmount / 2;
//   total = finalPrice * item.quantity;
// } 
// // With coupon
// else {
//   const totalDiscount = orderSummary.CartId.couapnDiscount;
//   const originalTotal = orderSummary.CartId.totalPriceWithoutDiscount;

//   // Calculate base price
//   basePrice = finalPrice / (1 + taxRate / 100);

//   // Calculate coupon discount proportion
//   const itemShare = (finalPrice * item.quantity) / originalTotal;
//   const itemDiscount = totalDiscount * itemShare;

//   // Apply coupon discount to base price PER UNIT
//   const discountedBasePerUnit = basePrice - (itemDiscount / (1 + taxRate / 100)) / item.quantity;

//   basePrice = discountedBasePerUnit;
//   gstAmount = discountedBasePerUnit * (taxRate / 100);
//   halfGST = gstAmount / 2;
//   total = (discountedBasePerUnit + gstAmount) * item.quantity;
// }

//   return (
//     <tr key={item?._id} className={index % 2 === 0 ? "" : "alt-row"}>
//       <td>{index + 1}</td>
//       <td>
//         <strong>{item?.productId?.name || "N/A"}</strong>
//         <div className="product-description">
//           {item?.size?.size} {item?.size?.sizetype}
//         </div>
//       </td>
//       <td>{item?.quantity || 0}</td>
//       <td>{((basePrice + gstAmount)).toFixed(2)}</td>
//       <td>{(basePrice * item.quantity).toFixed(2)}</td>
//       {isPunjab ? (
//         <>
//           <td>{(taxRate/2).toFixed(2)}%</td>
//           <td>{(halfGST * item.quantity).toFixed(2)}</td>
//           <td>{(taxRate/2).toFixed(2)}%</td>
//           <td>{(halfGST * item.quantity).toFixed(2)}</td>
//         </>
//       ) : (
//         <>
//           <td>{taxRate.toFixed(2)}%</td>
//           <td>{(gstAmount * item.quantity).toFixed(2)}</td>
//         </>
//       )}
//       <td className="total-cell">{total.toFixed(2)}</td>
//     </tr>
//   );
// })}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Total Calculation Section */}
//         <div className="total-section">
//           <div className="total-container">
//             <div className="amount-words">
//               <p className="words-label">Amount in Words:</p>
//               <p className="words-value">{numberToWords(totalPrice)} Rupees Only</p>
//             </div>
//             <div className="amount-calculation">
//               <div className="calc-row">
//                 <span className="calc-label">Sub Total:</span>
//                 <span>{formatCurrency(totalPriceWithoutDiscount)}</span>
//               </div>
//               {discount > 0 && (
//                 <div className="calc-row">
//                   <span className="calc-label">Discount:</span>
//                   <span>-{formatCurrency(discount)}</span>
//                 </div>
//               )}
//               <div className="calc-row">
//                 <span className="calc-label">Shipping Charges:</span>
//                 <span>{formatCurrency(logisticPrice)}</span>
//               </div>
//               <div className="grand-total">
//                 <span>Grand Total:</span>
//                 <span>{formatCurrency(totalPrice)}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer Section */}
//         <div className="invoice-footer">
//           <div className="footer-content">
//             <div className="footer-notes">
//               <p className="footer-note">
//                 This is a computer-generated invoice and does not require a signature unless manually signed.
//               </p>
//               <p className="footer-note">Thank you for your business!</p>
//             </div>
//             <div className="signature-section">
//               <p className="signature-label">For Palji Bakery</p>
//               <div className="signature-line"></div>
//               <p className="signature-label">Authorized Signatory</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="invoice-container">
//       <div ref={targetRef} className="invoice-card pdf-version">
//         {renderInvoiceContent(true)}
//       </div>
//     </div>
//   );
// }


// "use client";

// import { usePDF } from "react-to-pdf";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import { makeApi } from "../api/callApi";
// import { assets } from "../assets/assets";
// import "./CSS/taxinvoice.css";

// export default function Taxinvoice() {
// const [orderSummary, setOrderSummary] = useState(null);
// const { ordersummary } = useParams();
// const [shiprocketorder, setShiprocketorder] = useState(null);
// const [taxDetails, setTaxDetails] = useState({
//   totalGstAmount: 0,
//   totalAmountNoGST: 0,
//   deliveryCharge: 0,
//   finalTotal: 0
// });
// const [loading, setLoading] = useState(false);

// useEffect(() => {
//   const fetchOrderSummary = async () => {
//     try {
//       setLoading(true);
//       const response = await makeApi(
//         `/api/get-second-order-by-id/${ordersummary}`,
//         "GET"
//       );
//       const fetchedOrderSummary = response.data.secondorder;
//       setOrderSummary(fetchedOrderSummary);

//       if (fetchedOrderSummary?.CartId?.orderItems?.length > 0) {
//         let totalGstAmount = 0;
//         let totalAmountNoGST = 0;
//         let totalDiscountedBase = 0;
//         const cart = fetchedOrderSummary.CartId;

//         if (!cart.couapnDiscount) {
//           cart.orderItems.forEach(item => {
//             const finalPrice = item.singleProductPrice || 0;
//             const gstPercentage = item.productId?.Tax || item.productId?.category?.tax || 12;
//             const basePrice = finalPrice / (1 + gstPercentage / 100);

//             totalAmountNoGST += basePrice * item.quantity;
//             totalGstAmount += (finalPrice - basePrice) * item.quantity;
//           });
//         } else {
//           const totalDiscount = cart.couapnDiscount;
//           const originalTotal = cart.totalPriceWithoutDiscount;

//           cart.orderItems.forEach(item => {
//             const finalPrice = item.singleProductPrice || 0;
//             const gstPercentage = item.productId?.Tax || item.productId?.category?.tax || 12;
//             const itemBasePrice = finalPrice / (1 + gstPercentage / 100);
//             const itemShare = (finalPrice * item.quantity) / originalTotal;
//             const itemDiscount = totalDiscount * itemShare;
//             const discountedBasePerUnit = itemBasePrice - (itemDiscount / (1 + gstPercentage / 100)) / item.quantity;

//             totalDiscountedBase += discountedBasePerUnit * item.quantity;
//             totalGstAmount += discountedBasePerUnit * (gstPercentage / 100) * item.quantity;
//           });

//           totalAmountNoGST = totalDiscountedBase;
//         }

//         const finalTotal = cart.totalPrice || 0;
//         const deliveryCharge = cart.deliveryCharges || 0;

//         setTaxDetails({
//           totalGstAmount,
//           totalAmountNoGST: cart.couapnDiscount ? totalDiscountedBase : totalAmountNoGST,
//           deliveryCharge,
//           finalTotal
//         });
//       }

//       if (fetchedOrderSummary?.shiprocketOrderId) {
//         const Shipresponse = await makeApi(
//           `/api/shiprocket/get-order-by-id/${fetchedOrderSummary.shiprocketOrderId}`,
//           "GET"
//         );
//         setShiprocketorder(Shipresponse?.data.data);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchOrderSummary();
// }, [ordersummary]);

// const [invoiceDate] = useState(new Date().toISOString().split("T")[0]);
// const isPunjab = orderSummary?.shippingAddress?.state === "Punjab";
// const logisticPrice = taxDetails.deliveryCharge;
// const totalPriceWithoutDiscount = taxDetails.totalAmountNoGST + taxDetails.totalGstAmount;
// const totalPrice = taxDetails.finalTotal;
// const discount = totalPriceWithoutDiscount - totalPrice;

// const { toPDF, targetRef } = usePDF({ 
//   filename: `Invoice_${orderSummary?.invoiceId}.pdf`,
//   page: {
//     margin: 10,
//     format: 'a4',
//     orientation: 'portrait'
//   }
// });

// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   const day = String(date.getDate()).padStart(2, '0');
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const year = date.getFullYear();
//   return `${day}-${month}-${year}`;
// };

// const formatCurrency = (amount) => {
//   return new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR',
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2
//   }).format(amount);
// };

// const numberToWords = (num) => {
//   const single = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
//   const double = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 
//                  'Seventeen', 'Eighteen', 'Nineteen'];
//   const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

//   if (num === 0) return 'Zero';

//   const numStr = num.toString().split('.');
//   const wholeNum = parseInt(numStr[0]);
//   const decimalNum = numStr.length > 1 ? parseInt(numStr[1]) : 0;

//   let words = convertToWords(wholeNum);

//   if (decimalNum > 0) {
//     words += ' and ' + convertToWords(decimalNum) + ' Paise';
//   }

//   return words;

//   function convertToWords(num) {
//     if (num < 10) return single[num];
//     if (num < 20) return double[num - 10];
//     if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + single[num % 10] : '');
//     if (num < 1000) return single[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' and ' + convertToWords(num % 100) : '');
//     if (num < 100000) return convertToWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 ? ' ' + convertToWords(num % 1000) : '');
//     if (num < 10000000) return convertToWords(Math.floor(num / 100000)) + ' Lakh' + (num % 100000 ? ' ' + convertToWords(num % 100000) : '');
//     return convertToWords(Math.floor(num / 10000000)) + ' Crore' + (num % 10000000 ? ' ' + convertToWords(num % 10000000) : '');
//   }
// };

// const handlePrint = () => {
//   window.print();
// };

//   return (
//     <>
//       {/* {loading && (
//         <div style={{ 
//           height: "100%", 
//           width: "100%", 
//           top: "0", 
//           display: "flex", 
//           justifyContent: "center", 
//           alignItems: "center", 
//           zIndex: "9999", 
//           position: "fixed", 
//           backgroundColor: "rgba(0,0,0,0.3)" 
//         }}> 
//           <PrimaryLoader /> 
//         </div>
//       )} */}

//       <div className="invoice_page_border">
//         <div className="invoice-container">
//           {/* Print Button */}
//           <div className="button-section">
//             <button onClick={handlePrint} className="btn btn-primary">
//               Print Invoice
//             </button>
//           </div>

//           {/* Invoice Header */}
//           <div className="invoice-header">
//             <div className="invoice-info">
//               <div className="logo">
//                 <img src={assets.newlogo} alt="Palji Bakery Logo" className="main_logo_img" />
//               </div>
//               <div>
//                 <h2>PALJI BAKERY</h2>
//                 <p>46V, Main Hambran Rd, Mavir Vihar, Dev Nagar</p>
//                 <p>Ludhiana, Punjab 141027</p>
//                 <p>Phone: +91 7901706000 | Email: paljibakery@gmail.com</p>
//                 <p>GSTIN: 03AABCP1234Z1ZX | PAN: AABCP1234Z</p>
//               </div>
//             </div>
//             <h2>TAX INVOICE</h2>
//           </div>

//           {/* Invoice Details */}
//           <div className="invoice-details">
//             <div className="details-section">
//               <h6>Invoice Details</h6>
//               <div className="table_data_invoice">
//                 <div>Invoice No:</div>
//                 <div>{orderSummary?.invoiceId}</div>
//               </div>
//               <div className="table_data_invoice">
//                 <div>Invoice Date:</div>
//                 <div>{formatDate(orderSummary?.createdAt)}</div>
//               </div>
//               <div className="table_data_invoice">
//                 <div>Order No:</div>
//                 <div>{orderSummary?.orderId}</div>
//               </div>
//             </div>

//             <div className="details-section">
//               <h6>Other Details</h6>
//               <div className="table_data_invoice">
//                 <div>Payment Method:</div>
//                 <div>{orderSummary?.paymentMethod}</div>
//               </div>
//               <div className="table_data_invoice">
//                 <div>Place of Supply:</div>
//                 <div>{orderSummary?.shippingAddress?.state || "N/A"}</div>
//               </div>
//               <div className="table_data_invoice">
//                 <div>Nature of Supply:</div>
//                 <div>Goods</div>
//               </div>
//             </div>
//           </div>

//           {/* Billing & Shipping */}
//           <div className="invoice-details">
//             <div className="details-section">
//               <h6>Billed To</h6>
//               <div className="table_data_invoice">
//                 <div>Name:</div>
//                 <div>{orderSummary?.userId?.firstName} {orderSummary?.userId?.lastName}</div>
//               </div>
//               <div className="table_data_invoice">
//                 <div>Email:</div>
//                 <div>{orderSummary?.userId?.email}</div>
//               </div>
//               <div className="table_data_invoice">
//                 <div>Phone:</div>
//                 <div>{orderSummary?.shippingAddress?.phonenumber || "N/A"}</div>
//               </div>
//             </div>

//             <div className="details-section">
//               <h6>Shipped To</h6>
//               <div className="table_data_invoice">
//                 <div>Name:</div>
//                 <div>{orderSummary?.shippingAddress?.firstname} {orderSummary?.shippingAddress?.lastname}</div>
//               </div>
//               <div className="table_data_invoice">
//                 <div>Address:</div>
//                 <div>
//                   {orderSummary?.shippingAddress?.address}, {orderSummary?.shippingAddress?.city}, 
//                   {orderSummary?.shippingAddress?.state} - {orderSummary?.shippingAddress?.pincode}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Order Items Table */}
//           <div className="invoice-table">
//             <table>
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Description</th>
//                   <th>Qty</th>
//                   <th>Rate (₹)</th>
//                   <th>Taxable Amt (₹)</th>
//                   {isPunjab ? (
//                     <>
//                       <th>CGST (%)</th>
//                       <th>CGST Amt (₹)</th>
//                       <th>SGST (%)</th>
//                       <th>SGST Amt (₹)</th>
//                     </>
//                   ) : (
//                     <>
//                       <th>IGST (%)</th>
//                       <th>IGST Amt (₹)</th>
//                     </>
//                   )}
//                   <th>Total (₹)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orderSummary?.CartId?.orderItems?.map((item, index) => {
//                   const taxRate = item?.productId?.category?.tax || 12;
//                   const finalPrice = item.singleProductPrice || 0;

//                   let basePrice, gstAmount, halfGST, total;

//                   if (!orderSummary.CartId.couapnDiscount) {
//                     basePrice = finalPrice / (1 + taxRate / 100);
//                     gstAmount = finalPrice - basePrice;
//                     halfGST = gstAmount / 2;
//                     total = finalPrice * item.quantity;
//                   } else {
//                     const totalDiscount = orderSummary.CartId.couapnDiscount;
//                     const originalTotal = orderSummary.CartId.totalPriceWithoutDiscount;

//                     basePrice = finalPrice / (1 + taxRate / 100);
//                     const itemShare = (finalPrice * item.quantity) / originalTotal;
//                     const itemDiscount = totalDiscount * itemShare;
//                     const discountedBasePerUnit = basePrice - (itemDiscount / (1 + taxRate / 100)) / item.quantity;

//                     basePrice = discountedBasePerUnit;
//                     gstAmount = discountedBasePerUnit * (taxRate / 100);
//                     halfGST = gstAmount / 2;
//                     total = (discountedBasePerUnit + gstAmount) * item.quantity;
//                   }

//                   return (
//                     <tr key={item?._id}>
//                       <td>{index + 1}</td>
//                       <td>
//                         <strong>{item?.productId?.name || "N/A"}</strong>
//                         <div>{item?.size?.size} {item?.size?.sizetype}</div>
//                       </td>
//                       <td>{item?.quantity || 0}</td>
//                       <td>{(basePrice + gstAmount).toFixed(2)}</td>
//                       <td>{(basePrice * item.quantity).toFixed(2)}</td>
//                       {isPunjab ? (
//                         <>
//                           <td>{(taxRate/2).toFixed(2)}%</td>
//                           <td>{(halfGST * item.quantity).toFixed(2)}</td>
//                           <td>{(taxRate/2).toFixed(2)}%</td>
//                           <td>{(halfGST * item.quantity).toFixed(2)}</td>
//                         </>
//                       ) : (
//                         <>
//                           <td>{taxRate.toFixed(2)}%</td>
//                           <td>{(gstAmount * item.quantity).toFixed(2)}</td>
//                         </>
//                       )}
//                       <td>{total.toFixed(2)}</td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           {/* Total Section */}
//           <div className="invoice-summary">
//             <div className="amount-summary">
//               <h6>Amount in Words</h6>
//               <p>{numberToWords(totalPrice)} Rupees Only</p>
//             </div>
//             <div className="total-amount">
//               <h6>Total Calculation</h6>
//               <div className="table_data_invoice">
//                 <div>Sub Total:</div>
//                 <div>{formatCurrency(totalPriceWithoutDiscount)}</div>
//               </div>
//               {discount > 0 && (
//                 <div className="table_data_invoice">
//                   <div>Discount:</div>
//                   <div>-{formatCurrency(discount)}</div>
//                 </div>
//               )}
//               <div className="table_data_invoice">
//                 <div>Shipping Charges:</div>
//                 <div>{formatCurrency(logisticPrice)}</div>
//               </div>
//               <div className="table_data_invoice" style={{ fontWeight: 'bold' }}>
//                 <div>Grand Total:</div>
//                 <div>{formatCurrency(totalPrice)}</div>
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="terms-and-bank">
//             <div className="terms">
//               <h6>Terms & Conditions</h6>
//               <p>This is a computer-generated invoice and does not require a signature unless manually signed.</p>
//               <p>Thank you for your business!</p>
//             </div>
//             <div className="signature-section">
//               <div className="signature-line"></div>
//               <p>For Palji Bakery</p>
//               <p>Authorized Signatory</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


"use client";

import { usePDF } from "react-to-pdf";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { makeApi } from "../api/callApi";
import { assets } from "../assets/assets";
import "./CSS/taxinvoice.css";

export default function Taxinvoice() {
  const [orderSummary, setOrderSummary] = useState(null);
  const { ordersummary } = useParams();
  const [shiprocketorder, setShiprocketorder] = useState(null);
  const [taxDetails, setTaxDetails] = useState({
    totalGstAmount: 0,
    totalAmountNoGST: 0,
    deliveryCharge: 0,
    finalTotal: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrderSummary = async () => {
      try {
        setLoading(true);
        const response = await makeApi(
          `/api/get-second-order-by-id/${ordersummary}`,
          "GET"
        );
        const fetchedOrderSummary = response.data.secondorder;
        setOrderSummary(fetchedOrderSummary);

        if (fetchedOrderSummary?.CartId?.orderItems?.length > 0) {
          let totalGstAmount = 0;
          let totalAmountNoGST = 0;
          let totalDiscountedBase = 0;
          const cart = fetchedOrderSummary.CartId;

          if (!cart.couapnDiscount) {
            cart.orderItems.forEach(item => {
              const finalPrice = item.singleProductPrice || 0;
              const gstPercentage = item.productId?.Tax || item.productId?.category?.tax || 12;
              const basePrice = finalPrice / (1 + gstPercentage / 100);

              totalAmountNoGST += basePrice * item.quantity;
              totalGstAmount += (finalPrice - basePrice) * item.quantity;
            });
          } else {
            const totalDiscount = cart.couapnDiscount;
            const originalTotal = cart.totalPriceWithoutDiscount;

            cart.orderItems.forEach(item => {
              const finalPrice = item.singleProductPrice || 0;
              const gstPercentage = item.productId?.Tax || item.productId?.category?.tax || 12;
              const itemBasePrice = finalPrice / (1 + gstPercentage / 100);
              const itemShare = (finalPrice * item.quantity) / originalTotal;
              const itemDiscount = totalDiscount * itemShare;
              const discountedBasePerUnit = itemBasePrice - (itemDiscount / (1 + gstPercentage / 100)) / item.quantity;

              totalDiscountedBase += discountedBasePerUnit * item.quantity;
              totalGstAmount += discountedBasePerUnit * (gstPercentage / 100) * item.quantity;
            });

            totalAmountNoGST = totalDiscountedBase;
          }

          const finalTotal = cart.totalPrice || 0;
          const deliveryCharge = cart.deliveryCharges || 0;

          setTaxDetails({
            totalGstAmount,
            totalAmountNoGST: cart.couapnDiscount ? totalDiscountedBase : totalAmountNoGST,
            deliveryCharge,
            finalTotal
          });
        }

        if (fetchedOrderSummary?.shiprocketOrderId) {
          const Shipresponse = await makeApi(
            `/api/shiprocket/get-order-by-id/${fetchedOrderSummary.shiprocketOrderId}`,
            "GET"
          );
          setShiprocketorder(Shipresponse?.data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderSummary();
  }, [ordersummary]);

  const [invoiceDate] = useState(new Date().toISOString().split("T")[0]);
  const isPunjab = orderSummary?.shippingAddress?.state === "Punjab";
  const logisticPrice = taxDetails.deliveryCharge;
  const totalPriceWithoutDiscount = taxDetails.totalAmountNoGST + taxDetails.totalGstAmount;
  const totalPrice = taxDetails.finalTotal;
  const discount = totalPriceWithoutDiscount - totalPrice;

const { toPDF, targetRef } = usePDF({
  filename: `Invoice_${orderSummary?.invoiceId}.pdf`,
  page: {
    margin: 5, // Reduce PDF margins
    format: 'a4',
    orientation: 'portrait'
  },
  overrides: {
    // Ensure PDF matches print output
    scale: 0.9
  }
});

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const numberToWords = (num) => {
    const single = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const double = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
      'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    if (num === 0) return 'Zero';

    const numStr = num.toString().split('.');
    const wholeNum = parseInt(numStr[0]);
    const decimalNum = numStr.length > 1 ? parseInt(numStr[1]) : 0;

    let words = convertToWords(wholeNum);

    if (decimalNum > 0) {
      words += ' and ' + convertToWords(decimalNum) + ' Paise';
    }

    return words;

    function convertToWords(num) {
      if (num < 10) return single[num];
      if (num < 20) return double[num - 10];
      if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + single[num % 10] : '');
      if (num < 1000) return single[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' and ' + convertToWords(num % 100) : '');
      if (num < 100000) return convertToWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 ? ' ' + convertToWords(num % 1000) : '');
      if (num < 10000000) return convertToWords(Math.floor(num / 100000)) + ' Lakh' + (num % 100000 ? ' ' + convertToWords(num % 100000) : '');
      return convertToWords(Math.floor(num / 10000000)) + ' Crore' + (num % 10000000 ? ' ' + convertToWords(num % 10000000) : '');
    }
  };

const handlePrint = () => {
  // Create a style element with forced single-page settings
  const printStyle = document.createElement('style');
  printStyle.innerHTML = `
    @page {
      size: A4;
      margin: 5mm;
    }
    @media print {
      body {
        zoom: 0.75;
        width: 100%;
        height: auto;
        overflow: visible !important;
      }
      .invoice-container {
        transform: scale(0.85);
        transform-origin: top left;
        width: 117%;
      }
      * {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  `;
  document.head.appendChild(printStyle);

  window.print();

  // Clean up after printing
  setTimeout(() => {
    document.head.removeChild(printStyle);
  }, 1000);
};
  return (
    <>
      <div className="invoice-wrapper">
        {/* Print Button */}
        <div className="button-section">
          <button onClick={() => toPDF()} className="btn btn-download">
            Download PDF
          </button>
          <button onClick={handlePrint} className="btn btn-print">
            Print Invoice
          </button>
        </div>

        <div className="invoice-container" ref={targetRef}>
          {/* Invoice Header */}
          <div className="invoice-header">
            <div className="header-gradient">
              <div className="invoice-info invoice-details-row">
  <div className="logo">
    <img src={assets.newlogo} alt="Palji Bakery Logo" className="main_logo_img" />
  </div>
  <div className="company-details">
    <h2>PALJI BAKERY</h2>
    <p>46V, Main Hambran Rd, Mavir Vihar, Dev Nagar</p>
    <p>Ludhiana, Punjab 141027</p>
    <p>Phone: +91 7901706000 | Email: paljibakery@gmail.com</p>
    <p>GSTIN: 03AABCP1234Z1ZX | PAN: AABCP1234Z</p>
  </div>
</div>
            </div>
            <div className="invoice-title">
              <h2>TAX INVOICE</h2>
              <div className="title-decoration"></div>
            </div>
          </div>

          {/* <div className="invoice-details">
            <div className="details-section card">
              <h6 className="section-title">Invoice Details</h6>
              <div className="table_data_invoice">
                <div>Invoice No:</div>
                <div className="highlight">{orderSummary?.invoiceId}</div>
              </div>
              <div className="table_data_invoice">
                <div>Invoice Date:</div>
                <div>{formatDate(orderSummary?.createdAt)}</div>
              </div>
              <div className="table_data_invoice">
                <div>Order No:</div>
                <div className="highlight">{orderSummary?.orderId}</div>
              </div>
            </div>

            <div className="details-section card">
              <h6 className="section-title">Other Details</h6>
              <div className="table_data_invoice">
                <div>Payment Method:</div>
                <div className="payment-method">{orderSummary?.paymentMethod}</div>
              </div>
              <div className="table_data_invoice">
                <div>Place of Supply:</div>
                <div>{orderSummary?.shippingAddress?.state || "N/A"}</div>
              </div>
              <div className="table_data_invoice">
                <div>Nature of Supply:</div>
                <div>Goods</div>
              </div>
            </div>
          </div>

         
          <div className="invoice-details">
            <div className="details-section card">
              <h6 className="section-title">Billed To</h6>
              <div className="table_data_invoice">
                <div>Name:</div>
                <div className="customer-name">
                  {orderSummary?.userId?.firstName} {orderSummary?.userId?.lastName}
                </div>
              </div>
              <div className="table_data_invoice">
                <div>Email:</div>
                <div>{orderSummary?.userId?.email}</div>
              </div>
              <div className="table_data_invoice">
                <div>Phone:</div>
                <div>{orderSummary?.shippingAddress?.phonenumber || "N/A"}</div>
              </div>
            </div>

            <div className="details-section card">
              <h6 className="section-title">Shipped To</h6>
              <div className="table_data_invoice">
                <div>Name:</div>
                <div className="customer-name">
                  {orderSummary?.shippingAddress?.firstname} {orderSummary?.shippingAddress?.lastname}
                </div>
              </div>
              <div className="table_data_invoice">
                <div>Address:</div>
                <div className="shipping-address">
                  {orderSummary?.shippingAddress?.address}, {orderSummary?.shippingAddress?.city},
                  {orderSummary?.shippingAddress?.state} - {orderSummary?.shippingAddress?.pincode}
                </div>
              </div>
            </div>
          </div> */}
          {/* Invoice Details and Other Details - Side by Side */}
<div className="invoice-details-row ">
  <div className="details-section card">
    <h6 className="section-title">Invoice Details</h6>
    <div className="table_data_invoice">
      <div>Invoice No:</div>
      <div className="highlight">{orderSummary?.invoiceId}</div>
    </div>
    <div className="table_data_invoice">
      <div>Invoice Date:</div>
      <div>{formatDate(orderSummary?.createdAt)}</div>
    </div>
    <div className="table_data_invoice">
      <div>Order No:</div>
      <div className="highlight">{orderSummary?.orderId}</div>
    </div>
  </div>

  <div className="details-section card">
    <h6 className="section-title">Other Details</h6>
    <div className="table_data_invoice">
      <div>Payment Method:</div>
      <div className="payment-method">{orderSummary?.paymentMethod}</div>
    </div>
    <div className="table_data_invoice">
      <div>Place of Supply:</div>
      <div>{orderSummary?.shippingAddress?.state || "N/A"}</div>
    </div>
    <div className="table_data_invoice">
      <div>Nature of Supply:</div>
      <div>Goods</div>
    </div>
  </div>
</div>

{/* Billed To and Shipped To - Side by Side */}
<div className="invoice-details-row">
  <div className="details-section card">
    <h6 className="section-title">Billed To</h6>
    <div className="table_data_invoice">
      <div>Name:</div>
      <div className="customer-name">
        {orderSummary?.userId?.firstName} {orderSummary?.userId?.lastName}
      </div>
    </div>
    <div className="table_data_invoice">
      <div>Email:</div>
      <div>{orderSummary?.userId?.email}</div>
    </div>
    <div className="table_data_invoice">
      <div>Phone:</div>
      <div>{orderSummary?.shippingAddress?.phonenumber || "N/A"}</div>
    </div>
  </div>

  <div className="details-section card">
    <h6 className="section-title">Shipped To</h6>
    <div className="table_data_invoice">
      <div>Name:</div>
      <div className="customer-name">
        {orderSummary?.shippingAddress?.firstname} {orderSummary?.shippingAddress?.lastname}
      </div>
    </div>
    <div className="table_data_invoice">
      <div>Address:</div>
      <div className="shipping-address">
        {orderSummary?.shippingAddress?.address}, {orderSummary?.shippingAddress?.city},
        {orderSummary?.shippingAddress?.state} - {orderSummary?.shippingAddress?.pincode}
      </div>
    </div>
  </div>
</div>

          {/* Order Items Table */}
          <div className="invoice-table-container">
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Rate (₹)</th>
                  <th>Taxable Amt (₹)</th>
                  {isPunjab ? (
                    <>
                      <th>CGST (%)</th>
                      <th>CGST Amt (₹)</th>
                      <th>SGST (%)</th>
                      <th>SGST Amt (₹)</th>
                    </>
                  ) : (
                    <>
                      <th>IGST (%)</th>
                      <th>IGST Amt (₹)</th>
                    </>
                  )}
                  <th>Total (₹)</th>
                </tr>
              </thead>
              <tbody>
                {orderSummary?.CartId?.orderItems?.map((item, index) => {
                  const taxRate = item?.productId?.category?.tax || 12;
                  const finalPrice = item.singleProductPrice || 0;

                  let basePrice, gstAmount, halfGST, total;

                  // Without coupon
                  if (!orderSummary.CartId.couapnDiscount) {
                    basePrice = finalPrice / (1 + taxRate / 100);
                    gstAmount = finalPrice - basePrice;
                    halfGST = gstAmount / 2;
                    total = finalPrice * item.quantity;
                  }
                  // With coupon
                  else {
                    const totalDiscount = orderSummary.CartId.couapnDiscount;
                    const originalTotal = orderSummary.CartId.totalPriceWithoutDiscount;

                    // Calculate base price
                    basePrice = finalPrice / (1 + taxRate / 100);

                    // Calculate coupon discount proportion
                    const itemShare = (finalPrice * item.quantity) / originalTotal;
                    const itemDiscount = totalDiscount * itemShare;

                    // Apply coupon discount to base price PER UNIT
                    const discountedBasePerUnit = basePrice - (itemDiscount / (1 + taxRate / 100)) / item.quantity;

                    basePrice = discountedBasePerUnit;
                    gstAmount = discountedBasePerUnit * (taxRate / 100);
                    halfGST = gstAmount / 2;
                    total = (discountedBasePerUnit + gstAmount) * item.quantity;
                  }

                  return (
                    <tr key={item?._id}>
                      <td className="text-center">{index + 1}</td>
                      <td className="product-info">
                        <strong>{item?.productId?.name || "N/A"}</strong>
                        <div className="product-variant">{item?.size?.size} {item?.size?.sizetype}</div>
                      </td>
                      <td className="text-center">{item?.quantity || 0}</td>
                      <td className="text-right">{(basePrice + gstAmount).toFixed(2)}</td>
                      <td className="text-right">{(basePrice * item.quantity).toFixed(2)}</td>
                      {isPunjab ? (
                        <>
                          <td className="text-center">{(taxRate / 2).toFixed(2)}%</td>
                          <td className="text-right">{(halfGST * item.quantity).toFixed(2)}</td>
                          <td className="text-center">{(taxRate / 2).toFixed(2)}%</td>
                          <td className="text-right">{(halfGST * item.quantity).toFixed(2)}</td>
                        </>
                      ) : (
                        <>
                          <td className="text-center">{taxRate.toFixed(2)}%</td>
                          <td className="text-right">{(gstAmount * item.quantity).toFixed(2)}</td>
                        </>
                      )}
                      <td className="text-right total-cell">{total.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Total Section */}
          <div className="invoice-summary">
            <div className="amount-summary card">
              <h6 className="section-title">Amount in Words</h6>
              <p className="amount-words">{numberToWords(totalPrice)} Rupees Only</p>
            </div>
            <div className="total-amount card">
              <h6 className="section-title">Total Calculation</h6>
              <div className="table_data_invoice">
                <div>Sub Total:</div>
                <div className="text-right">{formatCurrency(totalPriceWithoutDiscount)}</div>
              </div>
              {discount > 0 && (
                <div className="table_data_invoice discount-row">
                  <div>Discount:</div>
                  <div className="text-right">-{formatCurrency(discount)}</div>
                </div>
              )}
              <div className="table_data_invoice">
                <div>Shipping Charges:</div>
                <div className="text-right">{formatCurrency(logisticPrice)}</div>
              </div>
              <div className="table_data_invoice grand-total">
                <div>Grand Total:</div>
                <div className="text-right">{formatCurrency(totalPrice)}</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="invoice-footer">
            <div className="terms card">
              <h6 className="section-title">Terms & Conditions</h6>
              <ul className="terms-list">
                <li>This is a computer-generated invoice and does not require a signature unless manually signed.</li>
                <li>Goods once sold will not be taken back.</li>
                <li>Please check all items at the time of delivery.</li>
                <li>Thank you for your business!</li>
              </ul>
            </div>
            <div className="signature-section">
              <div className="signature-placeholder"></div>
              <p className="signature-label">For Palji Bakery</p>
              <p className="signature-title">Authorized Signatory</p>
            </div>
          </div>

          <div className="thank-you">
            <p>Thank you for shopping with us!</p>
          </div>
        </div>
      </div>
    </>
  );
}





