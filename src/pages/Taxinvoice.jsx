// import React from "react";
// import { usePDF } from "react-to-pdf"; // Import the usePDF hook
// import "./CSS/taxinvoice.css";

// const TaxInvoice = ({ orderSummary, onClose }) => {
//   const isPunjab = orderSummary?.shippingAddress?.state === "Punjab";
//   const taxPrice = Number(orderSummary?.taxprice) || 0;
//   const logisticPrice = orderSummary?.CartId?.deliveryCharges || 0;
//   const totalPriceWithoutDiscount = orderSummary?.CartId?.totalPriceWithoutDiscount || 0;
//   const totalPrice = orderSummary?.CartId?.totalPrice || 0;
//   const discount = totalPriceWithoutDiscount - totalPrice;

//   // Use the usePDF hook to generate and download the PDF
//   const { toPDF, targetRef } = usePDF({ filename: `TaxInvoice_${orderSummary?._id}.pdf` });

//   return (
//     <div className="tax_invoice-overlay">
//       <div className="tax_invoice-container">
//         {/* Close Button */}
//         <button className="tax_invoice-close-button" onClick={onClose}>
//           Close
//         </button>
//         {/* Download Bill Button */}
//         <button
//           className="tax_invoice-download-button"
//           onClick={toPDF} // Trigger PDF generation
//           style={{ marginLeft: "10px", backgroundColor: "#4CAF50", color: "white" }}
//         >
//           Download
//         </button>
//         <div ref={targetRef} className="p-3">
//           {/* Company Header */}
//           <div className="tax_invoice-company-header">
//             <h1 className="tax_invoice-company-name">Plaji Bakery</h1>
//             <p className="tax_invoice-company-address">4GV, Main Hambran Rd. Mayur Vihar, Dev Nagar, Ludhiana</p>
//             <p className="tax_invoice-company-contact">
//               Contact: +91-9876543210 | Email: paljibakery.shop@gmail.com | GSTIN: 07AAXCS0655F1ZV
//             </p>
//           </div>

//           {/* Invoice Title */}
//           <div className="tax_invoice-title">
//             <h2>Retail Invoice</h2>
//           </div>

//           {/* Invoice Details */}
//           <div className="tax_invoice-details">
//             <div className="invoice-row">
//               <div>Invoice No:</div>
//               <div>{orderSummary?.invoiceId}</div>
//             </div>
//             <div className="invoice-row">
//               <div>Invoice Date:</div>
//               <div>{new Date(orderSummary?.createdAt).toLocaleDateString()}</div>
//             </div>
//             <div className="invoice-row">
//               <div>Order No:</div>
//               <div>{orderSummary?.orderId}</div>
//             </div>
//             <div className="invoice-row">
//               <div>Order Date:</div>
//               <div>{new Date(orderSummary?.createdAt).toLocaleDateString()}</div>
//             </div>
//             <div className="invoice-row">
//               <div>Nature of Supply:</div>
//               <div>Goods</div>
//             </div>
//             <div className="invoice-row">
//               <div>Place of Supply:</div>
//               <div>{orderSummary?.shippingAddress?.state}</div>
//             </div>
//           </div>


//           {/* Invoice Table */}
//           <div className="tax_invoice-table-container">
//             <table className="tax_invoice-table">
//               <thead>
//                 <tr>
//                   <th>S.No</th>
//                   <th>Description of Goods</th>
//                   <th>Qty</th>
//                   <th>Rate (INR)</th>
//                   <th>Taxable Amt (INR)</th>
//                   {isPunjab ? (
//                     <>
//                       <th>CGST (INR)</th>
//                       <th>SGST (INR)</th>
//                     </>
//                   ) : (
//                     <th>IGST (INR)</th>
//                   )}
//                 </tr>
//               </thead>
//               <tbody>
//                 {orderSummary?.CartId?.orderItems?.map((item, index) => {
//                   const taxRate = item?.productId?.category?.tax || 0;
//                   const taxableAmount = item?.singleProductPrice ? item.singleProductPrice / (1 + taxRate / 100) : 0;
//                   const gstAmount = item?.singleProductPrice ? item.singleProductPrice - taxableAmount : 0;
//                   const halfGST = gstAmount / 2;

//                   return (
//                     <tr key={item?._id}>
//                       <td>{index + 1}</td>
//                       <td>{item?.productId?.name || "N/A"}</td>
//                       <td>{item?.quantity || 0}</td>
//                       <td>{item?.singleProductPrice?.toFixed(2) || "0.00"}</td>
//                       <td>{taxableAmount.toFixed(2)}</td>
//                       {isPunjab ? (
//                         <>
//                           <td>{halfGST.toFixed(2)}</td>
//                           <td>{halfGST.toFixed(2)}</td>
//                         </>
//                       ) : (
//                         <td>{gstAmount.toFixed(2)}</td>
//                       )}
//                     </tr>
//                   );
//                 })}
//               </tbody>
//               <tfoot>
//                 <tr>
//                   <td colSpan={5}>
//                     <strong>Total Taxable Amount</strong>
//                   </td>
//                   <td>{totalPriceWithoutDiscount.toFixed(2)}</td>
//                   {isPunjab ? <td colSpan={2}></td> : <td></td>}
//                 </tr>
//                 <tr>
//                   <td colSpan={5}>
//                     <strong>Logistic Charges</strong>
//                   </td>
//                   <td colSpan={3}>{logisticPrice.toFixed(2)}</td>
//                 </tr>
//                 {orderSummary?.isPaid && (
//                   <tr>
//                     <td colSpan={5}>
//                       <strong>Discount</strong>
//                     </td>
//                     <td colSpan={3}> ₹{discount.toFixed(2)}</td>
//                   </tr>
//                 )}
//                 <tr>
//                   <td colSpan={5}>
//                     <strong>Grand Total (Incl. GST & Logistic Charges)</strong>
//                   </td>
//                   <td colSpan={3}>{totalPrice.toFixed(2)}</td>
//                 </tr>
//               </tfoot>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaxInvoice;

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

//   // PDF configuration for full width
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

//         <div ref={targetRef} className="tax_invoice-content">
//           {/* Header Section */}
//           <div className="tax_invoice-header">
//             <div className="tax_invoice-company-info">
//               <h1 className="tax_invoice-company-name">Plaji Bakery</h1>
//               <p className="tax_invoice-company-address">
//                 4GV, Main Hambran Rd. Mayur Vihar, Dev Nagar, Ludhiana
//               </p>
//               <p className="tax_invoice-company-contact">
//                 Contact: +91-9876543210 | Email: paljibakery.shop@gmail.com
//               </p>
//               <p className="tax_invoice-company-gst">
//                 GSTIN: 07AAXCS0655F1ZV
//               </p>
//             </div>

//             <div className="tax_invoice-title">
//               <h2>TAX INVOICE</h2>
//               <div className="tax_invoice-title-border"></div>
//             </div>
//           </div>

//           {/* Invoice Details */}
//           <div className="tax_invoice-details-grid">
//             <div className="tax_invoice-details-left">
//               <div className="tax_invoice-detail-row">
//                 <span className="tax_invoice-detail-label">Invoice No:</span>
//                 <span className="tax_invoice-detail-value">{orderSummary?.invoiceId}</span>
//               </div>
//               <div className="tax_invoice-detail-row">
//                 <span className="tax_invoice-detail-label">Invoice Date:</span>
//                 <span className="tax_invoice-detail-value">{formatDate(orderSummary?.createdAt)}</span>
//               </div>
//               <div className="tax_invoice-detail-row">
//                 <span className="tax_invoice-detail-label">Order No:</span>
//                 <span className="tax_invoice-detail-value">{orderSummary?.orderId}</span>
//               </div>
//             </div>

//             <div className="tax_invoice-details-right">
//               <div className="tax_invoice-detail-row">
//                 <span className="tax_invoice-detail-label">Payment Method:</span>
//                 <span className="tax_invoice-detail-value">{orderSummary?.paymentMethod}</span>
//               </div>
//               <div className="tax_invoice-detail-row">
//                 <span className="tax_invoice-detail-label">Nature of Supply:</span>
//                 <span className="tax_invoice-detail-value">Goods</span>
//               </div>
//               <div className="tax_invoice-detail-row">
//                 <span className="tax_invoice-detail-label">Place of Supply:</span>
//                 <span className="tax_invoice-detail-value">{orderSummary?.shippingAddress?.state || "N/A"}</span>
//               </div>
//             </div>
//           </div>

//           {/* Customer Details */}
//           <div className="tax_invoice-customer-section">
//             <div className="tax_invoice-customer-billing">
//               <h3>Billed To:</h3>
//               <p className="tax_invoice-customer-name">
//                 {orderSummary?.userId?.firstName} {orderSummary?.userId?.lastName}
//               </p>
//               <p>{orderSummary?.userId?.email}</p>
//               <p>Phone: {orderSummary?.shippingAddress?.phonenumber || "N/A"}</p>
//             </div>

//             <div className="tax_invoice-customer-shipping">
//               <h3>Shipped To:</h3>
//               <p className="tax_invoice-customer-name">
//                 {orderSummary?.shippingAddress?.firstname} {orderSummary?.shippingAddress?.lastname}
//               </p>
//               <p>{orderSummary?.shippingAddress?.address}</p>
//               <p>
//                 {orderSummary?.shippingAddress?.city}, {orderSummary?.shippingAddress?.state}
//               </p>
//               <p>
//                 {orderSummary?.shippingAddress?.country} - {orderSummary?.shippingAddress?.pincode}
//               </p>
//             </div>
//           </div>

//           {/* Product Table */}
//           <div className="tax_invoice-table-container">
//             <table className="tax_invoice-table">
//               <thead>
//                 <tr>
//                   <th className="text-center">#</th>
//                   <th>Description</th>
//                   {/* <th className="text-center">HSN/SAC</th> */}
//                   <th className="text-center">Qty</th>
//                   <th className="text-right">Rate (₹)</th>
//                   <th className="text-right">Taxable Amt (₹)</th>
//                   {isPunjab ? (
//                     <>
//                       <th className="text-right">CGST (%)</th>
//                       <th className="text-right">CGST Amt (₹)</th>
//                       <th className="text-right">SGST (%)</th>
//                       <th className="text-right">SGST Amt (₹)</th>
//                     </>
//                   ) : (
//                     <>
//                       <th className="text-right">IGST (%)</th>
//                       <th className="text-right">IGST Amt (₹)</th>
//                     </>
//                   )}
//                   <th className="text-right">Total (₹)</th>
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
//                     <tr key={item?._id}>
//                       <td className="text-center">{index + 1}</td>
//                       <td>
//                         <strong>{item?.productId?.name || "N/A"}</strong>
//                         <div className="product-description">
//                           {item?.size?.size} {item?.size?.sizetype}
//                         </div>
//                       </td>
//                       {/* <td className="text-center">-</td> */}
//                       <td className="text-center">{item?.quantity || 0}</td>
//                       <td className="text-right">{item?.singleProductPrice?.toFixed(2) || "0.00"}</td>
//                       <td className="text-right">{(taxableAmount * item.quantity).toFixed(2)}</td>
//                       {isPunjab ? (
//                         <>
//                           <td className="text-right">{(taxRate / 2).toFixed(2)}%</td>
//                           <td className="text-right">{(halfGST * item.quantity).toFixed(2)}</td>
//                           <td className="text-right">{(taxRate / 2).toFixed(2)}%</td>
//                           <td className="text-right">{(halfGST * item.quantity).toFixed(2)}</td>
//                         </>
//                       ) : (
//                         <>
//                           <td className="text-right">{taxRate.toFixed(2)}%</td>
//                           <td className="text-right">{(gstAmount * item.quantity).toFixed(2)}</td>
//                         </>
//                       )}
//                       <td className="text-right">{total.toFixed(2)}</td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           {/* Summary Section */}
//           <div className="tax_invoice-summary-grid">
//             <div className="tax_invoice-notes">
//               <h4>Terms & Conditions:</h4>
//               <ul>
//                 <li>Goods once sold will not be taken back.</li>
//                 <li>Payment should be made in full before delivery.</li>
//                 <li>Subject to {orderSummary?.shippingAddress?.city || "Ludhiana"} jurisdiction.</li>
//               </ul>

//               <div className="tax_invoice-signature">
//                 <p>For Plaji Bakery</p>
//                 <div className="tax_invoice-signature-line"></div>
//                 <p>Authorized Signatory</p>
//               </div>
//             </div>

//             <div className="tax_invoice-totals">
//               <div className="tax_invoice-total-row">
//                 <span>Sub Total:</span>
//                 <span>{formatCurrency(totalPriceWithoutDiscount)}</span>
//               </div>
//               {/* <div className="tax_invoice-total-row">
//                 <span>Tax Amount:</span>
//                 <span>{formatCurrency(taxPrice)}</span>
//               </div> */}
//               <div className="tax_invoice-total-row">
//                 <span>Shipping Charges:</span>
//                 <span>{formatCurrency(logisticPrice)}</span>
//               </div>
//               {discount > 0 && (
//                 <div className="tax_invoice-total-row">
//                   <span>Discount:</span>
//                   <span>-{formatCurrency(discount)}</span>
//                 </div>
//               )}
//               <div className="tax_invoice-total-row grand-total">
//                 <span>Grand Total:</span>
//                 <span>{formatCurrency(totalPrice)}</span>
//               </div>

//               <div className="tax_invoice-amount-in-words">
//                 <p>Amount in words: {numberToWords(totalPrice)} Rupees Only</p>
//               </div>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="tax_invoice-footer">
//             <p>Thank you for your business!</p>
//             <p>This is a computer generated invoice and does not require signature.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Helper function to convert numbers to words
// function numberToWords(num) {
//   const single = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
//   const double = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
//     'Seventeen', 'Eighteen', 'Nineteen'];
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
// }

// export default TaxInvoice;
import React from "react";
import { usePDF } from "react-to-pdf";
import "./CSS/taxinvoice.css";

const TaxInvoice = ({ orderSummary, onClose }) => {
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

  const renderInvoiceContent = (isPDF = false) => {
    return (
      <div className={`tax_invoice-content ${isPDF ? 'pdf-version' : ''}`}>
        {/* Header Section */}
        <div className="tax_invoice-header">
          <div className="tax_invoice-company-info">
            <h1 className="tax_invoice-company-name">Plaji Bakery</h1>
            <p className="tax_invoice-company-address">
              4GV, Main Hambran Rd. Mayur Vihar, Dev Nagar, Ludhiana
            </p>
            <p className="tax_invoice-company-contact">
              Contact: +91-9876543210 | Email: paljibakery.shop@gmail.com
            </p>
            <p className="tax_invoice-company-gst">
              GSTIN: 07AAXCS0655F1ZV
            </p>
          </div>
          
          <div className="tax_invoice-title">
            <h2>TAX INVOICE</h2>
            <div className="tax_invoice-title-border"></div>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="tax_invoice-details-grid">
          <div className="tax_invoice-details-left">
            <div className="tax_invoice-detail-row">
              <span className="tax_invoice-detail-label">Invoice No:</span>
              <span className="tax_invoice-detail-value">{orderSummary?.invoiceId}</span>
            </div>
            <div className="tax_invoice-detail-row">
              <span className="tax_invoice-detail-label">Invoice Date:</span>
              <span className="tax_invoice-detail-value">{formatDate(orderSummary?.createdAt)}</span>
            </div>
            <div className="tax_invoice-detail-row">
              <span className="tax_invoice-detail-label">Order No:</span>
              <span className="tax_invoice-detail-value">{orderSummary?.orderId}</span>
            </div>
          </div>
          
          <div className="tax_invoice-details-right">
            <div className="tax_invoice-detail-row">
              <span className="tax_invoice-detail-label">Payment Method:</span>
              <span className="tax_invoice-detail-value">{orderSummary?.paymentMethod}</span>
            </div>
            <div className="tax_invoice-detail-row">
              <span className="tax_invoice-detail-label">Nature of Supply:</span>
              <span className="tax_invoice-detail-value">Goods</span>
            </div>
            <div className="tax_invoice-detail-row">
              <span className="tax_invoice-detail-label">Place of Supply:</span>
              <span className="tax_invoice-detail-value">{orderSummary?.shippingAddress?.state || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Customer Details */}
        <div className="tax_invoice-customer-section">
          <div className="tax_invoice-customer-billing">
            <h3>Billed To:</h3>
            <p className="tax_invoice-customer-name">
              {orderSummary?.userId?.firstName} {orderSummary?.userId?.lastName}
            </p>
            <p>{orderSummary?.userId?.email}</p>
            <p>Phone: {orderSummary?.shippingAddress?.phonenumber || "N/A"}</p>
          </div>
          
          <div className="tax_invoice-customer-shipping">
            <h3>Shipped To:</h3>
            <p className="tax_invoice-customer-name">
              {orderSummary?.shippingAddress?.firstname} {orderSummary?.shippingAddress?.lastname}
            </p>
            <p>{orderSummary?.shippingAddress?.address}</p>
            <p>
              {orderSummary?.shippingAddress?.city}, {orderSummary?.shippingAddress?.state}
            </p>
            <p>
              {orderSummary?.shippingAddress?.country} - {orderSummary?.shippingAddress?.pincode}
            </p>
          </div>
        </div>

        {/* Product Table */}
        <div className="tax_invoice-table-container">
          <table className="tax_invoice-table">
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th>Description</th>
                {/* <th className="text-center">HSN/SAC</th> */}
                <th className="text-center">Qty</th>
                <th className="text-right">Rate (₹)</th>
                <th className="text-right">Taxable Amt (₹)</th>
                {isPunjab ? (
                  <>
                    <th className="text-right">CGST (%)</th>
                    <th className="text-right">CGST Amt (₹)</th>
                    <th className="text-right">SGST (%)</th>
                    <th className="text-right">SGST Amt (₹)</th>
                  </>
                ) : (
                  <>
                    <th className="text-right">IGST (%)</th>
                    <th className="text-right">IGST Amt (₹)</th>
                  </>
                )}
                <th className="text-right">Total (₹)</th>
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
                  <tr key={item?._id}>
                    <td className="text-center">{index + 1}</td>
                    <td>
                      <strong>{item?.productId?.name || "N/A"}</strong>
                      <div className="product-description">
                        {item?.size?.size} {item?.size?.sizetype}
                      </div>
                    </td>
                    {/* <td className="text-center">-</td> */}
                    <td className="text-center">{item?.quantity || 0}</td>
                    <td className="text-right">{item?.singleProductPrice?.toFixed(2) || "0.00"}</td>
                    <td className="text-right">{(taxableAmount * item.quantity).toFixed(2)}</td>
                    {isPunjab ? (
                      <>
                        <td className="text-right">{(taxRate/2).toFixed(2)}%</td>
                        <td className="text-right">{(halfGST * item.quantity).toFixed(2)}</td>
                        <td className="text-right">{(taxRate/2).toFixed(2)}%</td>
                        <td className="text-right">{(halfGST * item.quantity).toFixed(2)}</td>
                      </>
                    ) : (
                      <>
                        <td className="text-right">{taxRate.toFixed(2)}%</td>
                        <td className="text-right">{(gstAmount * item.quantity).toFixed(2)}</td>
                      </>
                    )}
                    <td className="text-right">{total.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Summary Section */}
        <div className="tax_invoice-summary-grid">
          <div className="tax_invoice-notes">
            <h4>Terms & Conditions:</h4>
            <ul>
              <li>Goods once sold will not be taken back.</li>
              <li>Payment should be made in full before delivery.</li>
              <li>Subject to {orderSummary?.shippingAddress?.city || "Ludhiana"} jurisdiction.</li>
            </ul>
            
            <div className="tax_invoice-signature">
              <p>For Plaji Bakery</p>
              <div className="tax_invoice-signature-line"></div>
              <p>Authorized Signatory</p>
            </div>
          </div>
          
          <div className="tax_invoice-totals">
            <div className="tax_invoice-total-row">
              <span>Sub Total:</span>
              <span>{formatCurrency(totalPriceWithoutDiscount)}</span>
            </div>
            {/* <div className="tax_invoice-total-row">
              <span>Tax Amount:</span>
              <span>{formatCurrency(taxPrice)}</span>
            </div> */}
            <div className="tax_invoice-total-row">
              <span>Shipping Charges:</span>
              <span>{formatCurrency(logisticPrice)}</span>
            </div>
            {discount > 0 && (
              <div className="tax_invoice-total-row">
                <span>Discount:</span>
                <span>-{formatCurrency(discount)}</span>
              </div>
            )}
            <div className="tax_invoice-total-row grand-total">
              <span>Grand Total:</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
            
            <div className="tax_invoice-amount-in-words">
              <p>Amount in words: {numberToWords(totalPrice)} Rupees Only</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="tax_invoice-footer">
          <p>Thank you for your business!</p>
          <p>This is a computer generated invoice and does not require signature.</p>
        </div>
      </div>
    );
  };

  return (
    <div className="tax_invoice-overlay">
      <div className="tax_invoice-container">
        <div className="tax_invoice-actions">
          <button className="tax_invoice-close-button" onClick={onClose}>
            Close
          </button>
          <button
            className="tax_invoice-download-button"
            onClick={toPDF}
          >
            Download Invoice
          </button>
        </div>
        
        {/* Visible invoice (responsive) */}
        {renderInvoiceContent(false)}
        
        {/* Hidden div that only shows desktop version for PDF */}
        <div style={{ position: 'absolute', left: '-9999px', width: '900px' }}>
          <div ref={targetRef} className="tax_invoice-content pdf-version">
            {renderInvoiceContent(true)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxInvoice;