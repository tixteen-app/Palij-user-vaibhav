// "use client"

// import { usePDF } from "react-to-pdf";
// import React, { useEffect, useState } from "react";

// import { useNavigate, useParams } from "react-router";
// import "./CSS/taxinvoice.css";
// import logo from "../assets/favicon.svg";
// import { makeApi } from "../api/callApi";

// export default function Taxinvoice() {

//   const [orderSummary, setOrderSummary] = useState(null);

//     const { ordersummary } = useParams();
//       const [shiprocketorder, setShiprocketorder] = useState(null);
    
  
//      useEffect(() => {
//         const fetchOrderSummary = async () => {
//           try {
//             // Fetch order summary data
//             const response = await makeApi(
//               `/api/get-second-order-by-id/${ordersummary}`,
//               "GET"
//             );
//             // If order summary is successful, set it to state
//             const fetchedOrderSummary = response.data.secondorder;
//             setOrderSummary(fetchedOrderSummary);
    
//             // Once orderSummary is set, check if shiprocketOrderId is available
//             if (fetchedOrderSummary?.shiprocketOrderId) {
//               const Shipresponse = await makeApi(
//                 `/api/shiprocket/get-order-by-id/${fetchedOrderSummary.shiprocketOrderId}`,
//                 "GET"
//               );
//               setShiprocketorder(Shipresponse?.data.data);
//             }
//           } catch (error) {
//             console.log(error);
//           }
//         };
    
//         // Call the function to fetch order summary
//         fetchOrderSummary();
//       }, [ordersummary]);


//   const [invoiceDate] = useState(new Date().toISOString().split("T")[0]);
//   const isPunjab = orderSummary?.shippingAddress?.state === "Punjab";
//   const taxPrice = Number(orderSummary?.taxprice) || 0;
//   const logisticPrice = orderSummary?.CartId?.deliveryCharges || 0;
//   const totalPriceWithoutDiscount = orderSummary?.CartId?.totalPriceWithoutDiscount || 0;
//   const totalPrice = orderSummary?.CartId?.totalPrice || 0;
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
//       <div className={`invoice-card  ${isPDF ? 'pdf-version' : ''}`}>
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
//                 <img src={logo} alt="Palji Bakery Logo" className="company-logo" />
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
//                 {orderSummary?.CartId?.orderItems?.map((item, index) => {
//                   const taxRate = item?.productId?.category?.tax || 0;
//                   const taxableAmount = item?.singleProductPrice ? 
//                     item.singleProductPrice / (1 + taxRate / 100) : 0;
//                   const gstAmount = item?.singleProductPrice ? 
//                     item.singleProductPrice - taxableAmount : 0;
//                   const halfGST = gstAmount / 2;
//                   const total = item?.singleProductPrice * item?.quantity;

//                   return (
//                     <tr key={item?._id} className={index % 2 === 0 ? "" : "alt-row"}>
//                       <td>{index + 1}</td>
//                       <td>
//                         <strong>{item?.productId?.name || "N/A"}</strong>
//                         <div className="product-description">
//                           {item?.size?.size} {item?.size?.sizetype}
//                         </div>
//                       </td>
//                       <td>{item?.quantity || 0}</td>
//                       <td>{item?.singleProductPrice?.toFixed(2) || "0.00"}</td>
//                       <td>{(taxableAmount * item.quantity).toFixed(2)}</td>
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
//                       <td className="total-cell">{total.toFixed(2)}</td>
//                     </tr>
//                   );
//                 })}
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

"use client";

import { usePDF } from "react-to-pdf";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./CSS/taxinvoice.css";
import logo from "../assets/favicon.svg";
import { makeApi } from "../api/callApi";

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

  useEffect(() => {
    const fetchOrderSummary = async () => {
      try {
        // Fetch order summary data
        const response = await makeApi(
          `/api/get-second-order-by-id/${ordersummary}`,
          "GET"
        );
        // If order summary is successful, set it to state
        const fetchedOrderSummary = response.data.secondorder;
        setOrderSummary(fetchedOrderSummary);

        // Calculate tax details
        if (fetchedOrderSummary?.CartId?.orderItems?.length > 0) {
          let totalGstAmount = 0;
          let totalAmountNoGST = 0;
          const discountPercentage = 10; // Assuming 10% cart-level discount

          fetchedOrderSummary.CartId.orderItems.forEach(item => {
            const finalPrice = item.singleProductPrice || 0;
            const taxPercentage = item.productId?.category?.tax || 18;
            
            // Step 1: Get base price without GST
            const basePrice = finalPrice / (1 + taxPercentage / 100);
            
            // Step 2: Apply discount to base price
            const discountedBase = basePrice * (1 - discountPercentage / 100);
            
            // Step 3: Calculate GST on discounted base
            const gstAmount = discountedBase * (taxPercentage / 100);

            totalAmountNoGST += discountedBase * item.quantity;
            totalGstAmount += gstAmount * item.quantity;
          });

          // Calculate delivery charges based on discounted total + GST
          const subtotal = totalAmountNoGST + totalGstAmount;
          const deliveryCharge = subtotal < 500 ? 75 : 0;
          const finalTotal = subtotal + deliveryCharge;

          setTaxDetails({
            totalGstAmount,
            totalAmountNoGST,
            deliveryCharge,
            finalTotal
          });
        }

        // Once orderSummary is set, check if shiprocketOrderId is available
        if (fetchedOrderSummary?.shiprocketOrderId) {
          const Shipresponse = await makeApi(
            `/api/shiprocket/get-order-by-id/${fetchedOrderSummary.shiprocketOrderId}`,
            "GET"
          );
          setShiprocketorder(Shipresponse?.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Call the function to fetch order summary
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
      margin: 10,
      format: 'a4',
      orientation: 'portrait'
    }
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
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
    window.print();
  };

  const renderInvoiceContent = (isPDF = false) => {
    return (
      <div className={`invoice-card  ${isPDF ? 'pdf-version' : ''}`}>
        {/* Print Button - Hidden when printing */}
        <div className="print-button-container">
          <div onClick={handlePrint} className="print-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="printer-icon"
            >
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            Print Invoice
          </div>
        </div>

        {/* Invoice Header */}
        <div className="invoice-header">
          <div className="header-content">
            <div className="company-info">
              <div className="logo-container">
                <img src={logo} alt="Palji Bakery Logo" className="company-logo" />
              </div>
              <div>
                <h1 className="company-name">PALJI BAKERY</h1>
                <p className="company-address">46V, Main Hambran Rd, Mavir Vihar, Dev Nagar</p>
                <p className="company-address">Ludhiana, Punjab 141027</p>
                <p className="company-address">Phone: +91 7901706000 | Email: paljibakery@gmail.com</p>
                <p className="company-address">GSTIN: 03AABCP1234Z1ZX | PAN: AABCP1234Z</p>
              </div>
            </div>
            <div className="invoice-title">
              <div>TAX INVOICE</div>
            </div>
          </div>
        </div>

        {/* Invoice Details Section */}
        <div className="invoice-details">
          <div className="details-grid">
            <div>
              <div className="detail-row">
                <span className="detail-label">Invoice No:</span>
                <span>{orderSummary?.invoiceId}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Invoice Date:</span>
                <span>{formatDate(orderSummary?.createdAt)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Order No:</span>
                <span>{orderSummary?.orderId}</span>
              </div>
            </div>
            <div>
              <div className="detail-row">
                <span className="detail-label">Payment Method:</span>
                <span>{orderSummary?.paymentMethod}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Place of Supply:</span>
                <span>{orderSummary?.shippingAddress?.state || "N/A"}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Nature of Supply:</span>
                <span>Goods</span>
              </div>
            </div>
          </div>
        </div>

        {/* Billing & Shipping Section */}
        <div className="address-section">
          <div className="address-box">
            <h3 className="address-title">Billed To:</h3>
            <p className="customer-name">
              {orderSummary?.userId?.firstName} {orderSummary?.userId?.lastName}
            </p>
            <p className="customer-detail">Email: {orderSummary?.userId?.email}</p>
            <p className="customer-detail">Phone: {orderSummary?.shippingAddress?.phonenumber || "N/A"}</p>
          </div>
          <div className="address-box">
            <h3 className="address-title">Shipped To:</h3>
            <p className="customer-name">
              {orderSummary?.shippingAddress?.firstname} {orderSummary?.shippingAddress?.lastname}
            </p>
            <p className="customer-detail">{orderSummary?.shippingAddress?.address}, {orderSummary?.shippingAddress?.city}, {orderSummary?.shippingAddress?.state} - {orderSummary?.shippingAddress?.pincode}</p>
          </div>
        </div>

        {/* Order Summary Table */}
        <div className="table-container">
          <div className="table-wrapper">
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
                  const taxRate = item?.productId?.category?.tax || 18;
                  const finalPrice = item.singleProductPrice || 0;
                  const basePrice = finalPrice / (1 + taxRate / 100);
                  const discountedBase = basePrice * 0.9; // 10% discount
                  const gstAmount = discountedBase * (taxRate / 100);
                  const halfGST = gstAmount / 2;
                  const total = (discountedBase + gstAmount) * item.quantity;

                  return (
                    <tr key={item?._id} className={index % 2 === 0 ? "" : "alt-row"}>
                      <td>{index + 1}</td>
                      <td>
                        <strong>{item?.productId?.name || "N/A"}</strong>
                        <div className="product-description">
                          {item?.size?.size} {item?.size?.sizetype}
                        </div>
                      </td>
                      <td>{item?.quantity || 0}</td>
                      <td>{(discountedBase + gstAmount).toFixed(2)}</td>
                      <td>{(discountedBase * item.quantity).toFixed(2)}</td>
                      {isPunjab ? (
                        <>
                          <td>{(taxRate/2).toFixed(2)}%</td>
                          <td>{(halfGST * item.quantity).toFixed(2)}</td>
                          <td>{(taxRate/2).toFixed(2)}%</td>
                          <td>{(halfGST * item.quantity).toFixed(2)}</td>
                        </>
                      ) : (
                        <>
                          <td>{taxRate.toFixed(2)}%</td>
                          <td>{(gstAmount * item.quantity).toFixed(2)}</td>
                        </>
                      )}
                      <td className="total-cell">{total.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total Calculation Section */}
        <div className="total-section">
          <div className="total-container">
            <div className="amount-words">
              <p className="words-label">Amount in Words:</p>
              <p className="words-value">{numberToWords(totalPrice)} Rupees Only</p>
            </div>
            <div className="amount-calculation">
              <div className="calc-row">
                <span className="calc-label">Sub Total:</span>
                <span>{formatCurrency(totalPriceWithoutDiscount)}</span>
              </div>
              {discount > 0 && (
                <div className="calc-row">
                  <span className="calc-label">Discount:</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}
              <div className="calc-row">
                <span className="calc-label">Shipping Charges:</span>
                <span>{formatCurrency(logisticPrice)}</span>
              </div>
              <div className="grand-total">
                <span>Grand Total:</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="invoice-footer">
          <div className="footer-content">
            <div className="footer-notes">
              <p className="footer-note">
                This is a computer-generated invoice and does not require a signature unless manually signed.
              </p>
              <p className="footer-note">Thank you for your business!</p>
            </div>
            <div className="signature-section">
              <p className="signature-label">For Palji Bakery</p>
              <div className="signature-line"></div>
              <p className="signature-label">Authorized Signatory</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="invoice-container">
      <div ref={targetRef} className="invoice-card pdf-version">
        {renderInvoiceContent(true)}
      </div>
    </div>
  );
}