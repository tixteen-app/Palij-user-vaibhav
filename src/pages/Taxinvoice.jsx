// import React from "react";
// import { usePDF } from "react-to-pdf";
// import "./CSS/taxinvoice.css";

// const TaxInvoice = ({ orderSummary, onClose }) => {
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

//   const renderInvoiceContent = (isPDF = false) => {
//     return (
//       <div className={`tax_invoice-content ${isPDF ? 'pdf-version' : ''}`}>
//         {/* Header Section */}
//         <div className="tax_invoice-header">
//           <div className="tax_invoice-company-info">
//             <h1 className="tax_invoice-company-name">Plaji Bakery</h1>
//             <p className="tax_invoice-company-address">
//               4GV, Main Hambran Rd. Mayur Vihar, Dev Nagar, Ludhiana
//             </p>
//             <p className="tax_invoice-company-contact">
//               Contact: +91-9876543210 | Email: paljibakery.shop@gmail.com
//             </p>
//             <p className="tax_invoice-company-gst">
//               GSTIN: 07AAXCS0655F1ZV
//             </p>
//           </div>
          
//           <div className="tax_invoice-title">
//             <h2>TAX INVOICE</h2>
//             <div className="tax_invoice-title-border"></div>
//           </div>
//         </div>

//         {/* Invoice Details */}
//         <div className="tax_invoice-details-grid">
//           <div className="tax_invoice-details-left">
//             <div className="tax_invoice-detail-row">
//               <span className="tax_invoice-detail-label">Invoice No:</span>
//               <span className="tax_invoice-detail-value">{orderSummary?.invoiceId}</span>
//             </div>
//             <div className="tax_invoice-detail-row">
//               <span className="tax_invoice-detail-label">Invoice Date:</span>
//               <span className="tax_invoice-detail-value">{formatDate(orderSummary?.createdAt)}</span>
//             </div>
//             <div className="tax_invoice-detail-row">
//               <span className="tax_invoice-detail-label">Order No:</span>
//               <span className="tax_invoice-detail-value">{orderSummary?.orderId}</span>
//             </div>
//           </div>
          
//           <div className="tax_invoice-details-right">
//             <div className="tax_invoice-detail-row">
//               <span className="tax_invoice-detail-label">Payment Method:</span>
//               <span className="tax_invoice-detail-value">{orderSummary?.paymentMethod}</span>
//             </div>
//             <div className="tax_invoice-detail-row">
//               <span className="tax_invoice-detail-label">Nature of Supply:</span>
//               <span className="tax_invoice-detail-value">Goods</span>
//             </div>
//             <div className="tax_invoice-detail-row">
//               <span className="tax_invoice-detail-label">Place of Supply:</span>
//               <span className="tax_invoice-detail-value">{orderSummary?.shippingAddress?.state || "N/A"}</span>
//             </div>
//           </div>
//         </div>

//         {/* Customer Details */}
//         <div className="tax_invoice-customer-section">
//           <div className="tax_invoice-customer-billing">
//             <h3>Billed To:</h3>
//             <p className="tax_invoice-customer-name">
//               {orderSummary?.userId?.firstName} {orderSummary?.userId?.lastName}
//             </p>
//             <p>{orderSummary?.userId?.email}</p>
//             <p>Phone: {orderSummary?.shippingAddress?.phonenumber || "N/A"}</p>
//           </div>
          
//           <div className="tax_invoice-customer-shipping">
//             <h3>Shipped To:</h3>
//             <p className="tax_invoice-customer-name">
//               {orderSummary?.shippingAddress?.firstname} {orderSummary?.shippingAddress?.lastname}
//             </p>
//             <p>{orderSummary?.shippingAddress?.address}</p>
//             <p>
//               {orderSummary?.shippingAddress?.city}, {orderSummary?.shippingAddress?.state}
//             </p>
//             <p>
//               {orderSummary?.shippingAddress?.country} - {orderSummary?.shippingAddress?.pincode}
//             </p>
//           </div>
//         </div>

//         {/* Product Table */}
//         <div className="tax_invoice-table-container">
//           <table className="tax_invoice-table">
//             <thead>
//               <tr>
//                 <th className="text-center">#</th>
//                 <th>Description</th>
//                 {/* <th className="text-center">HSN/SAC</th> */}
//                 <th className="text-center">Qty</th>
//                 <th className="text-right">Rate (₹)</th>
//                 <th className="text-right">Taxable Amt (₹)</th>
//                 {isPunjab ? (
//                   <>
//                     <th className="text-right">CGST (%)</th>
//                     <th className="text-right">CGST Amt (₹)</th>
//                     <th className="text-right">SGST (%)</th>
//                     <th className="text-right">SGST Amt (₹)</th>
//                   </>
//                 ) : (
//                   <>
//                     <th className="text-right">IGST (%)</th>
//                     <th className="text-right">IGST Amt (₹)</th>
//                   </>
//                 )}
//                 <th className="text-right">Total (₹)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orderSummary?.CartId?.orderItems?.map((item, index) => {
//                 const taxRate = item?.productId?.category?.tax || 0;
//                 const taxableAmount = item?.singleProductPrice ? 
//                   item.singleProductPrice / (1 + taxRate / 100) : 0;
//                 const gstAmount = item?.singleProductPrice ? 
//                   item.singleProductPrice - taxableAmount : 0;
//                 const halfGST = gstAmount / 2;
//                 const total = item?.singleProductPrice * item?.quantity;

//                 return (
//                   <tr key={item?._id}>
//                     <td className="text-center">{index + 1}</td>
//                     <td>
//                       <strong>{item?.productId?.name || "N/A"}</strong>
//                       <div className="product-description">
//                         {item?.size?.size} {item?.size?.sizetype}
//                       </div>
//                     </td>
//                     {/* <td className="text-center">-</td> */}
//                     <td className="text-center">{item?.quantity || 0}</td>
//                     <td className="text-right">{item?.singleProductPrice?.toFixed(2) || "0.00"}</td>
//                     <td className="text-right">{(taxableAmount * item.quantity).toFixed(2)}</td>
//                     {isPunjab ? (
//                       <>
//                         <td className="text-right">{(taxRate/2).toFixed(2)}%</td>
//                         <td className="text-right">{(halfGST * item.quantity).toFixed(2)}</td>
//                         <td className="text-right">{(taxRate/2).toFixed(2)}%</td>
//                         <td className="text-right">{(halfGST * item.quantity).toFixed(2)}</td>
//                       </>
//                     ) : (
//                       <>
//                         <td className="text-right">{taxRate.toFixed(2)}%</td>
//                         <td className="text-right">{(gstAmount * item.quantity).toFixed(2)}</td>
//                       </>
//                     )}
//                     <td className="text-right">{total.toFixed(2)}</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         {/* Summary Section */}
//         <div className="tax_invoice-summary-grid">
//           <div className="tax_invoice-notes">
//             <h4>Terms & Conditions:</h4>
//             <ul>
//               <li>Goods once sold will not be taken back.</li>
//               <li>Payment should be made in full before delivery.</li>
//               <li>Subject to {orderSummary?.shippingAddress?.city || "Ludhiana"} jurisdiction.</li>
//             </ul>
            
//             <div className="tax_invoice-signature">
//               <p>For Plaji Bakery</p>
//               <div className="tax_invoice-signature-line"></div>
//               <p>Authorized Signatory</p>
//             </div>
//           </div>
          
//           <div className="tax_invoice-totals">
//             <div className="tax_invoice-total-row">
//               <span>Sub Total:</span>
//               <span>{formatCurrency(totalPriceWithoutDiscount)}</span>
//             </div>
//             {/* <div className="tax_invoice-total-row">
//               <span>Tax Amount:</span>
//               <span>{formatCurrency(taxPrice)}</span>
//             </div> */}
//             <div className="tax_invoice-total-row">
//               <span>Shipping Charges:</span>
//               <span>{formatCurrency(logisticPrice)}</span>
//             </div>
//             {discount > 0 && (
//               <div className="tax_invoice-total-row">
//                 <span>Discount:</span>
//                 <span>-{formatCurrency(discount)}</span>
//               </div>
//             )}
//             <div className="tax_invoice-total-row grand-total">
//               <span>Grand Total:</span>
//               <span>{formatCurrency(totalPrice)}</span>
//             </div>
            
//             <div className="tax_invoice-amount-in-words">
//               <p>Amount in words: {numberToWords(totalPrice)} Rupees Only</p>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="tax_invoice-footer">
//           <p>Thank you for your business!</p>
//           <p>This is a computer generated invoice and does not require signature.</p>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="tax_invoice-overlay">
//       <div className="tax_invoice-container">
//         <div className="tax_invoice-actions">
//           <button className="tax_invoice-close-button" onClick={onClose}>
//             Close
//           </button>
//           <button
//             className="tax_invoice-download-button"
//             onClick={toPDF}
//           >
//             Download Invoice
//           </button>
//         </div>
        
//         {/* Visible invoice (responsive) */}
//         {renderInvoiceContent(false)}
        
//         {/* Hidden div that only shows desktop version for PDF */}
//         <div style={{ position: 'absolute', left: '-9999px', width: '900px' }}>
//           <div ref={targetRef} className="tax_invoice-content pdf-version">
//             {renderInvoiceContent(true)}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaxInvoice;


// "use client"

// import { useState } from "react"
// import "./CSS/taxinvoice.css";


// export default function TaxInvoice() {
//   const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split("T")[0])

//   // Sample data - would be replaced with actual data in a real implementation
//   const invoiceData = {
//     invoiceNo: "INV-2023-0001",
//     orderNo: "ORD-2023-0001",
//     paymentMethod: "Online Payment",
//     placeOfSupply: "Punjab",
//     natureOfSupply: "B2C",
//     customer: {
//       name: "Rahul Sharma",
//       gstin: "29AADCB2230M1ZP",
//       email: "rahul.sharma@example.com",
//       phone: "9876543210",
//       address: "123, Green Avenue, Model Town, Ludhiana, Punjab - 141002",
//     },
//     shippingAddress: {
//       name: "Rahul Sharma",
//       address: "123, Green Avenue, Model Town, Ludhiana, Punjab - 141002",
//     },
//     items: [
//       {
//         id: 1,
//         description: "Party Mix",
//         hsnCode: "1905",
//         qty: 3,
//         rate: 140,
//         taxableAmount: 420,
//         igstRate: 5,
//         igstAmount: 21,
//         total: 441,
//       },
//       {
//         id: 2,
//         description: "Desi Biscuits",
//         hsnCode: "1905",
//         qty: 2,
//         rate: 140,
//         taxableAmount: 280,
//         igstRate: 5,
//         igstAmount: 14,
//         total: 294,
//       },
//       {
//         id: 3,
//         description: "Nachni Chips",
//         hsnCode: "1905",
//         qty: 1,
//         rate: 140,
//         taxableAmount: 140,
//         igstRate: 5,
//         igstAmount: 7,
//         total: 147,
//       },
//     ],
//     subTotal: 840,
//     shippingCharges: 50,
//     grandTotal: 890,
//     totalTax: 42,
//   }

//   // Calculate amount in words
//   const amountInWords = "Eight Hundred Ninety Rupees Only"

//   // Handle print function
//   const handlePrint = () => {
//     window.print()
//   }

//   return (
//     <div className="invoice-container">
//       <div className="invoice-card">
//         {/* Print Button - Hidden when printing */}
//         <div className="print-button-container">
//           <button onClick={handlePrint} className="print-button">
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
//           </button>
//         </div>

//         {/* Invoice Header */}
//         <div className="invoice-header">
//           <div className="header-content">
//             <div className="company-info">
//               <div className="logo-container">
//                 <img src="/placeholder.svg?height=50&width=50" alt="Palji Bakery Logo" className="company-logo" />
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
//               <h2>TAX INVOICE</h2>
//             </div>
//           </div>
//         </div>

//         {/* Invoice Details Section */}
//         <div className="invoice-details">
//           <div className="details-grid">
//             <div>
//               <div className="detail-row">
//                 <span className="detail-label">Invoice No:</span>
//                 <span>{invoiceData.invoiceNo}</span>
//               </div>
//               <div className="detail-row">
//                 <span className="detail-label">Invoice Date:</span>
//                 <span>{invoiceDate}</span>
//               </div>
//               <div className="detail-row">
//                 <span className="detail-label">Order No:</span>
//                 <span>{invoiceData.orderNo}</span>
//               </div>
//             </div>
//             <div>
//               <div className="detail-row">
//                 <span className="detail-label">Payment Method:</span>
//                 <span>{invoiceData.paymentMethod}</span>
//               </div>
//               <div className="detail-row">
//                 <span className="detail-label">Place of Supply:</span>
//                 <span>{invoiceData.placeOfSupply}</span>
//               </div>
//               <div className="detail-row">
//                 <span className="detail-label">Nature of Supply:</span>
//                 <span>{invoiceData.natureOfSupply}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Billing & Shipping Section */}
//         <div className="address-section">
//           <div className="address-box">
//             <h3 className="address-title">Billed To:</h3>
//             <p className="customer-name">{invoiceData.customer.name}</p>
//             <p className="customer-detail">GSTIN: {invoiceData.customer.gstin}</p>
//             <p className="customer-detail">Email: {invoiceData.customer.email}</p>
//             <p className="customer-detail">Phone: {invoiceData.customer.phone}</p>
//             <p className="customer-detail">{invoiceData.customer.address}</p>
//           </div>
//           <div className="address-box">
//             <h3 className="address-title">Shipped To:</h3>
//             <p className="customer-name">{invoiceData.shippingAddress.name}</p>
//             <p className="customer-detail">{invoiceData.shippingAddress.address}</p>
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
//                   <th>HSN Code</th>
//                   <th>Qty</th>
//                   <th>Rate (₹)</th>
//                   <th>Taxable Amt (₹)</th>
//                   <th>IGST (%)</th>
//                   <th>IGST Amt (₹)</th>
//                   <th>Total (₹)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {invoiceData.items.map((item, index) => (
//                   <tr key={item.id} className={index % 2 === 0 ? "" : "alt-row"}>
//                     <td>{index + 1}</td>
//                     <td>{item.description}</td>
//                     <td>{item.hsnCode}</td>
//                     <td>{item.qty}</td>
//                     <td>{item.rate.toFixed(2)}</td>
//                     <td>{item.taxableAmount.toFixed(2)}</td>
//                     <td>{item.igstRate}</td>
//                     <td>{item.igstAmount.toFixed(2)}</td>
//                     <td className="total-cell">{item.total.toFixed(2)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Tax Breakdown Table */}
//         <div className="tax-summary">
//           <h3 className="tax-title">Tax Summary</h3>
//           <div className="table-wrapper">
//             <table className="tax-table">
//               <thead>
//                 <tr>
//                   <th>Tax Type</th>
//                   <th>Taxable Amount</th>
//                   <th>Rate (%)</th>
//                   <th>Tax Amount (₹)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>IGST</td>
//                   <td>{invoiceData.subTotal.toFixed(2)}</td>
//                   <td>5%</td>
//                   <td>{invoiceData.totalTax.toFixed(2)}</td>
//                 </tr>
//                 <tr className="total-tax-row">
//                   <td colSpan={3}>Total Tax</td>
//                   <td>{invoiceData.totalTax.toFixed(2)}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Total Calculation Section */}
//         <div className="total-section">
//           <div className="total-container">
//             <div className="amount-words">
//               <p className="words-label">Amount in Words:</p>
//               <p className="words-value">{amountInWords}</p>
//             </div>
//             <div className="amount-calculation">
//               <div className="calc-row">
//                 <span className="calc-label">Sub Total:</span>
//                 <span>₹{invoiceData.subTotal.toFixed(2)}</span>
//               </div>
//               <div className="calc-row">
//                 <span className="calc-label">Shipping Charges:</span>
//                 <span>₹{invoiceData.shippingCharges.toFixed(2)}</span>
//               </div>
//               <div className="grand-total">
//                 <span>Grand Total:</span>
//                 <span>₹{invoiceData.grandTotal.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer Section */}
        // <div className="invoice-footer">
        //   <div className="footer-content">
        //     <div className="footer-notes">
        //       <p className="footer-note">
        //         This is a computer-generated invoice and does not require a signature unless manually signed.
        //       </p>
        //       <p className="footer-note">Thank you for your business!</p>
        //     </div>
        //     <div className="signature-section">
        //       <p className="signature-label">For Palji Bakery</p>
        //       <div className="signature-line"></div>
        //       <p className="signature-label">Authorized Signatory</p>
        //     </div>
        //   </div>
        // </div>
//       </div>
//     </div>
//   )
// }



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

//   const renderInvoiceContent = (isPDF = false) => {
//     return (
//       <div className={`invoice-card  ${isPDF ? 'pdf-version' : ''}`}>
//         {/* Print Button - Hidden when printing */}
//         <div className="print-button-container">
//           <button onClick={() => toPDF()} className="print-button">
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
//             Download Invoice
//           </button>
          
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
//     // <div className="invoice-overlay"  >
//       <div className="invoice-container">
//         {/* Visible invoice (responsive) */}
//         {/* {renderInvoiceContent(false)} */}
        
//         {/* Hidden div that only shows desktop version for PDF */}
//         {/* <div style={{ position: 'absolute', left: '-9999px', width: '900px' }}> */}
//           <div ref={targetRef} className="invoice-card pdf-version">
//             {renderInvoiceContent(true)}
//           </div>
//         {/* </div> */}
//       </div>
//     // </div>
//   );
// }

"use client"

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
  const taxPrice = Number(orderSummary?.taxprice) || 0;
  const logisticPrice = orderSummary?.CartId?.deliveryCharges || 0;
  const totalPriceWithoutDiscount = orderSummary?.CartId?.totalPriceWithoutDiscount || 0;
  const totalPrice = orderSummary?.CartId?.totalPrice || 0;
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
                  const taxRate = item?.productId?.category?.tax || 0;
                  const taxableAmount = item?.singleProductPrice ? 
                    item.singleProductPrice / (1 + taxRate / 100) : 0;
                  const gstAmount = item?.singleProductPrice ? 
                    item.singleProductPrice - taxableAmount : 0;
                  const halfGST = gstAmount / 2;
                  const total = item?.singleProductPrice * item?.quantity;

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
                      <td>{item?.singleProductPrice?.toFixed(2) || "0.00"}</td>
                      <td>{(taxableAmount * item.quantity).toFixed(2)}</td>
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