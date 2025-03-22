// import React, { useRef } from "react";
// import "./CSS/taxinvoice.css";
// import { usePDF } from "react-to-pdf";

// const TaxInvoice = ({ orderSummary, onClose }) => {
//   // Create a reference to the invoice container
//   const invoiceRef = useRef();

//   // Use the usePDF hook to generate the PDF
//   const { toPDF, targetRef } = usePDF({ filename: `invoice_${orderSummary._id}.pdf` });

//   return (
//     <div className="tax_invoice-overlay">
//       <div className="tax_invoice-container" ref={targetRef}>
//         {/* Close Button */}
//         <button className="tax_invoice-close-button" onClick={onClose}>
//           Close
//         </button>

//         {/* Download PDF Button */}
//         <button
//           className="tax_invoice-download-button"
//           onClick={() => toPDF()}
//           style={{
//             position: "absolute",
//             top: "10px",
//             left: "10px",
//             backgroundColor: "#4CAF50",
//             color: "white",
//             border: "none",
//             padding: "8px 12px",
//             cursor: "pointer",
//             borderRadius: "4px",
//             fontSize: "14px",
//           }}
//         >
//           Download
//         </button>

//         {/* Company Header */}
//         <div className="tax_invoice-company-header">
//           <h1 className="tax_invoice-company-name">Plaji Bakery</h1>
//           <p className="tax_invoice-company-address">4GV, Main Hambran Rd. Mayur Vihar, Dev Nagar, Ludhiana</p>
//           <p className="tax_invoice-company-contact">
//             Contact: +91-9876543210 | Email: support@maalana.com | GSTIN: 07AAXCS0655F1ZV
//           </p>
//         </div>

//         {/* Invoice Title */}
//         <div className="tax_invoice-title">
//           <h2>TAX INVOICE</h2>
//         </div>

//         {/* Invoice Details */}
//         <div className="tax_invoice-details">
//           <div>
//             <p className="tax_invoice-detail-item">
//               <span className="tax_invoice-detail-label">Invoice No:</span> {orderSummary._id}
//             </p>
//             <p className="tax_invoice-detail-item">
//               <span className="tax_invoice-detail-label">Invoice Date:</span>{" "}
//               {new Date(orderSummary.createdAt).toLocaleDateString()}
//             </p>
//             <p className="tax_invoice-detail-item">
//               <span className="tax_invoice-detail-label">Order No:</span> {orderSummary._id}
//             </p>
//             <p className="tax_invoice-detail-item">
//               <span className="tax_invoice-detail-label">Order Date:</span>{" "}
//               {new Date(orderSummary.createdAt).toLocaleDateString()}
//             </p>
//             <p className="tax_invoice-detail-item">
//               <span className="tax_invoice-detail-label">Nature of Transaction:</span> Inter-State
//             </p>
//             <p className="tax_invoice-detail-item">
//               <span className="tax_invoice-detail-label">Nature of Supply:</span> Goods
//             </p>
//             <p className="tax_invoice-detail-item">
//               <span className="tax_invoice-detail-label">Place of Supply:</span>{" "}
//               {orderSummary.shippingAddress.state}
//             </p>
//           </div>
//         </div>

//         {/* Bill To / Ship To */}
//         <div className="tax_invoice-address-section">
//           <div>
//             <h3 className="tax_invoice-section-title">Bill To / Ship To:</h3>
//             <p className="tax_invoice-detail-item">
//               <span className="tax_invoice-detail-label">Customer Name:</span>{" "}
//               {orderSummary.userId.firstName} {orderSummary.userId.lastName}
//             </p>
//             <p className="tax_invoice-detail-item">
//               <span className="tax_invoice-detail-label">Company Name:</span> N/A
//             </p>
//             <p className="tax_invoice-detail-item">
//               <span className="tax_invoice-detail-label">Billing Address:</span>{" "}
//               {orderSummary.shippingAddress.address}, {orderSummary.shippingAddress.city},{" "}
//               {orderSummary.shippingAddress.state} - {orderSummary.shippingAddress.pincode}
//             </p>
//             <p className="tax_invoice-detail-item">
//               <span className="tax_invoice-detail-label">Customer Type:</span> Unregistered
//             </p>
//           </div>
//           <div>
//             <h3 className="tax_invoice-section-title">Bill From / Ship From:</h3>
//             <p className="tax_invoice-detail-item"> Palji Bakery </p>
//             <p className="tax_invoice-detail-item">
//               5A, Sat Paul Mittal Rd, A - Block, Sarabha Nagar, Ludhiana, Punjab 141001
//             </p>
//             <p className="tax_invoice-detail-item">
//               <span className="tax_invoice-detail-label">GSTIN:</span> 07AAXCS0655F1ZV
//             </p>
//           </div>
//         </div>

//         {/* Invoice Table */}
//         <div className="tax_invoice-table-container">
//           <table className="tax_invoice-table">
//             <thead>
//               <tr>
//                 <th>S.No</th>
//                 <th>Description of Goods</th>
//                 <th>HSN Code</th>
//                 <th>Qty</th>
//                 <th>Rate (INR)</th>
//                 <th>Taxable Amt (INR)</th>
//                 <th>CGST (INR)</th>
//                 <th>SGST (INR)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orderSummary.CartId.orderItems.map((item, index) => (
//                 <tr key={item._id}>
//                   <td>{index + 1}</td>
//                   <td>{item.productId.name}</td>
//                   <td>N/A</td>
//                   <td>{item.quantity}</td>
//                   <td>{item.singleProductPrice}</td>
//                   <td>{item.totalPrice}</td>
//                   <td>N/A</td>
//                   <td>N/A</td>
//                 </tr>
//               ))}
//             </tbody>
//             <tfoot>
//               <tr>
//                 <td colSpan={5} className="tax_invoice-table-footer-label">
//                   Total Taxable Amount
//                 </td>
//                 <td>{orderSummary.CartId.totalPriceWithoutDiscount}</td>
//                 <td colSpan={2}></td>
//               </tr>
//               <tr>
//                 <td colSpan={5} className="tax_invoice-table-footer-label">
//                   Total CGST
//                 </td>
//                 <td colSpan={3}>N/A</td>
//               </tr>
//               <tr>
//                 <td colSpan={5} className="tax_invoice-table-footer-label">
//                   Total SGST
//                 </td>
//                 <td colSpan={3}>N/A</td>
//               </tr>
//               <tr>
//                 <td colSpan={5} className="tax_invoice-table-footer-label">
//                   Grand Total (Incl. GST)
//                 </td>
//                 <td colSpan={3} className="tax_invoice-grand-total">
//                   {orderSummary.CartId.totalPrice}
//                 </td>
//               </tr>
//             </tfoot>
//           </table>
//         </div>

//         {/* Payment Details */}
//         <div className="tax_invoice-payment-details">
//           <h3 className="tax_invoice-section-title">Payment Details:</h3>
//           {orderSummary.paymentId && (
//             <p className="tax_invoice-detail-item">
//               <span className="tax_invoice-detail-label">Payment Id:</span> {orderSummary.paymentId}
//             </p>
//           )}
//           <p className="tax_invoice-detail-item">
//             <span className="tax_invoice-detail-label">Payment Mode:</span>{" "}
//             {orderSummary.paymentMethod}
//           </p>
//         </div>

//         {/* Signature */}
//         <div className="tax_invoice-signature">
//           <h3 className="tax_invoice-section-title">Authorized Signature:</h3>
//           <p>Palji Bakery</p>
//           <p>(Company Stamp & Signature)</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaxInvoice;



// import React from "react";
// import "./CSS/taxinvoice.css"; 
// import { usePDF } from "react-to-pdf";

// const TaxInvoice = ({ orderSummary, onClose }) => {
// console.log(orderSummary)

//   return (
//     <div className="tax_invoice-overlay">
//       <div className="tax_invoice-container">
//         {/* Close Button */}
//         <button className="tax_invoice-close-button" onClick={onClose}>
//           Close
//         </button>

//         {/* Company Header */}
//         <div className="tax_invoice-company-header">
//           <h1 className="tax_invoice-company-name">Plaji Bakery</h1>
//           <p className="tax_invoice-company-address">4GV, Main Hambran Rd. Mayur Vihar, Dev Nagar, Ludhiana</p>
//           <p className="tax_invoice-company-contact">
//             Contact: +91-9876543210 | Email: paljibakery.shop@gmail.com | GSTIN: 07AAXCS0655F1ZV
//           </p>
//         </div>

//         {/* Invoice Title */}
//         <div className="tax_invoice-title">
//           <h2>TAX INVOICE</h2>
//         </div>

//         {/* Invoice Details */}
//         <div className="tax_invoice-details">
//           <div>
//             <p className="tax_invoice-detail-item">
//               <span className="tax_invoice-detail-label">Invoice No:</span> {orderSummary._id}
//             </p>
//             <p className="tax_invoice-detail-item">
//               <span className="tax_invoice-detail-label">Invoice Date:</span>{" "}
//               {new Date(orderSummary.createdAt).toLocaleDateString()}
//             </p>
//             <p className="tax_invoice-detail-item">
//               <span className="tax_invoice-detail-label">Order No:</span> {orderSummary._id}
//             </p>
//             <p className="tax_invoice-detail-item">
//               <span className="tax_invoice-detail-label">Order Date:</span>{" "}
//               {new Date(orderSummary.createdAt).toLocaleDateString()}
//             </p>
//             {/* <p className="tax_invoice-detail-item">
//               <span className="tax_invoice-detail-label">Nature of Transaction:</span> Inter-State
//             </p> */}
//             <p className="tax_invoice-detail-item">
//               <span className="tax_invoice-detail-label">Nature of Supply:</span> Goods
//             </p>
//             <p className="tax_invoice-detail-item">
//               <span className="tax_invoice-detail-label">Place of Supply:</span>{" "}
//               {orderSummary.shippingAddress.state}
//             </p>
//           </div>
//         </div>

//         {/* Bill To / Ship To */}
//         <div className="tax_invoice-address-section">
//           <div>
//             <h3 className="tax_invoice-section-title">Bill To / Ship To:</h3>
//             <p className="tax_invoice-detail-item">
//               <span className="tax_invoice-detail-label">Customer Name:</span>{" "}
//               {orderSummary.userId.firstName} {orderSummary.userId.lastName}
//             </p>
//             {/* <p className="tax_invoice-detail-item">
//               <span className="tax_invoice-detail-label">Company Name:</span> N/A
//             </p> */}
//             <p className="tax_invoice-detail-item">
//               <span className="tax_invoice-detail-label">Billing Address:</span>{" "}
//               {orderSummary.shippingAddress.address}, {orderSummary.shippingAddress.city},{" "}
//               {orderSummary.shippingAddress.state} - {orderSummary.shippingAddress.pincode}
//             </p>
//             {/* <p className="tax_invoice-detail-item">
//               <span className="tax_invoice-detail-label">Customer Type:</span> Unregistered
//             </p> */}
//           </div>
//           <div>
//             <h3 className="tax_invoice-section-title">Bill From / Ship From:</h3>
//             <p className="tax_invoice-detail-item"> Palji Bakery </p>
//             <p className="tax_invoice-detail-item">
//             5A, Sat Paul Mittal Rd, A - Block, Sarabha Nagar, Ludhiana, Punjab 141001

//             </p>
//             <p className="tax_invoice-detail-item">
//               <span className="tax_invoice-detail-label">GSTIN:</span> 07AAXCS0655F1ZV
//             </p>
//           </div>
//         </div>

//         {/* Invoice Table */}
//         <div className="tax_invoice-table-container">
//           <table className="tax_invoice-table">
//             <thead>
//               <tr>
//                 <th>S.No</th>
//                 <th>Description of Goods</th>
//                 <th>HSN Code</th>
//                 <th>Qty</th>
//                 <th>Rate (INR)</th>
//                 <th>Taxable Amt (INR)</th>
//                 <th>CGST (INR)</th>
//                 <th>SGST (INR)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orderSummary.CartId.orderItems.map((item, index) => (
//                 <tr key={item._id}>
//                   <td>{index + 1}</td>
//                   <td>{item.productId.name}</td>
//                   <td>N/A</td>
//                   <td>{item.quantity}</td>
//                   <td>{item.singleProductPrice}</td>
//                   <td>{item.totalPrice}</td>
//                   <td>N/A</td>
//                   <td>N/A</td>
//                 </tr>
//               ))}
//             </tbody>
//             <tfoot>
//               <tr>
//                 <td colSpan={5} className="tax_invoice-table-footer-label">
//                   Total Taxable Amount
//                 </td>
//                 <td>{orderSummary.CartId.totalPriceWithoutDiscount}</td>
//                 <td colSpan={2}></td>
//               </tr>
//               <tr>
//                 <td colSpan={5} className="tax_invoice-table-footer-label">
//                   Total CGST
//                 </td>
//                 <td colSpan={3}>N/A</td>
//               </tr>
//               <tr>
//                 <td colSpan={5} className="tax_invoice-table-footer-label">
//                   Total SGST
//                 </td>
//                 <td colSpan={3}>N/A</td>
//               </tr>
//               <tr>
//                 <td colSpan={5} className="tax_invoice-table-footer-label">
//                   Grand Total (Incl. GST)
//                 </td>
//                 <td colSpan={3} className="tax_invoice-grand-total">
//                   {orderSummary.CartId.totalPrice}
//                 </td>
//               </tr>
//             </tfoot>
//           </table>
//         </div>

//         {/* Payment Details */}
//         <div className="tax_invoice-payment-details">
//           <h3 className="tax_invoice-section-title">Payment Details:</h3>
//           {orderSummary.paymentId &&
//           <p className="tax_invoice-detail-item">
//             <span className="tax_invoice-detail-label">Payment Id:</span> {orderSummary.paymentId}
//           </p>
//         }
//           <p className="tax_invoice-detail-item">
//             <span className="tax_invoice-detail-label">Payment Mode:</span>{" "}
//             {orderSummary.paymentMethod}
//           </p>
//         </div>

//         {/* Signature */}
//         <div className="tax_invoice-signature">
//           <h3 className="tax_invoice-section-title">Authorized Signature:</h3>
//           <p>Palji Bakery</p>
//           <p>(Company Stamp & Signature)</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaxInvoice;

// import React from "react";
// import "./CSS/taxinvoice.css";

// const TaxInvoice = ({ orderSummary, onClose }) => {
//   const isPunjab = orderSummary?.shippingAddress?.state === "Punjab";
//   const taxPrice = Number(orderSummary?.taxprice) || 0;

//   return (
//     <div className="tax_invoice-overlay">
//       <div className="tax_invoice-container">
//         <button className="tax_invoice-close-button" onClick={onClose}>Close</button>

//         <div className="tax_invoice-company-header">
//           <h1 className="tax_invoice-company-name">Plaji Bakery</h1>
//           <p className="tax_invoice-company-address">4GV, Main Hambran Rd. Mayur Vihar, Dev Nagar, Ludhiana</p>
//           <p className="tax_invoice-company-contact">Contact: +91-9876543210 | Email: paljibakery.shop@gmail.com | GSTIN: 07AAXCS0655F1ZV</p>
//         </div>

//         <div className="tax_invoice-title">
//           <h2>TAX INVOICE</h2>
//         </div>

//         <div className="tax_invoice-details">
//           <div>
//             <p><strong>Invoice No:</strong> {orderSummary?._id}</p>
//             <p><strong>Invoice Date:</strong> {new Date(orderSummary?.createdAt).toLocaleDateString()}</p>
//             <p><strong>Order No:</strong> {orderSummary?._id}</p>
//             <p><strong>Order Date:</strong> {new Date(orderSummary?.createdAt).toLocaleDateString()}</p>
//             <p><strong>Nature of Supply:</strong> Goods</p>
//             <p><strong>Place of Supply:</strong> {orderSummary?.shippingAddress?.state}</p>
//           </div>
//         </div>

//         <div className="tax_invoice-table-container">
//           <table className="tax_invoice-table">
//             <thead>
//               <tr>
//                 <th>S.No</th>
//                 <th>Description of Goods</th>
//                 <th>HSN Code</th>
//                 <th>Qty</th>
//                 <th>Rate (INR)</th>
//                 <th>Taxable Amt (INR)</th>
//                 {isPunjab ? (
//                   <>
//                     <th>CGST (INR)</th>
//                     <th>SGST (INR)</th>
//                   </>
//                 ) : (
//                   <th>IGST (INR)</th>
//                 )}
//               </tr>
//             </thead>
//             <tbody>
//               {orderSummary?.CartId?.orderItems?.map((item, index) => {
//                 const taxRate = item?.productId?.category?.tax || 0;
//                 const taxableAmount = item?.singleProductPrice ? item.singleProductPrice / (1 + taxRate / 100) : 0;
//                 const gstAmount = item?.singleProductPrice ? item.singleProductPrice - taxableAmount : 0;
//                 const halfGST = gstAmount / 2;

//                 return (
//                   <tr key={item?._id}>
//                     <td>{index + 1}</td>
//                     <td>{item?.productId?.name || "N/A"}</td>
//                     <td>N/A</td>
//                     <td>{item?.quantity || 0}</td>
//                     <td>{item?.singleProductPrice?.toFixed(2) || "0.00"}</td>
//                     <td>{taxableAmount.toFixed(2)}</td>
//                     {isPunjab ? (
//                       <>
//                         <td>{halfGST.toFixed(2)}</td>
//                         <td>{halfGST.toFixed(2)}</td>
//                       </>
//                     ) : (
//                       <td>{gstAmount.toFixed(2)}</td>
//                     )}
//                   </tr>
//                 );
//               })}
//             </tbody>
//             <tfoot>
//               <tr>
//                 <td colSpan={5}><strong>Total Taxable Amount</strong></td>
//                 <td>{orderSummary?.CartId?.totalPriceWithoutDiscount?.toFixed(2) || "0.00"}</td>
//                 {isPunjab ? <td colSpan={2}></td> : <td></td>}
//               </tr>
//               {isPunjab ? (
//                 <>
//                   <tr>
//                     <td colSpan={5}><strong>Total CGST</strong></td>
//                     <td colSpan={3}>{(taxPrice / 2).toFixed(2)}</td>
//                   </tr>
//                   <tr>
//                     <td colSpan={5}><strong>Total SGST</strong></td>
//                     <td colSpan={3}>{(taxPrice / 2).toFixed(2)}</td>
//                   </tr>
//                 </>
//               ) : (
//                 <tr>
//                   <td colSpan={5}><strong>Total IGST</strong></td>
//                   <td colSpan={3}>{taxPrice.toFixed(2)}</td>
//                 </tr>
//               )}
//               <tr>
//                 <td colSpan={5}><strong>Grand Total (Incl. GST)</strong></td>
//                 <td colSpan={3}>{orderSummary?.CartId?.totalPrice?.toFixed(2) || "0.00"}</td>
//               </tr>
//             </tfoot>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaxInvoice;

import React from "react";
import { usePDF } from "react-to-pdf"; // Import the usePDF hook
import "./CSS/taxinvoice.css";

const TaxInvoice = ({ orderSummary, onClose }) => {
  console.log("orderSummary",orderSummary.isPaid)
  const isPunjab = orderSummary?.shippingAddress?.state === "Punjab";
  const taxPrice = Number(orderSummary?.taxprice) || 0;
  const logisticPrice = orderSummary?.CartId?.deliveryCharges;
  // Use the usePDF hook to generate and download the PDF
  const { toPDF, targetRef } = usePDF({ filename: `TaxInvoice_${orderSummary?._id}.pdf` });

  return (
    <div className="tax_invoice-overlay">
      <div className="tax_invoice-container" >
        {/* Close Button */}
        <button className="tax_invoice-close-button" onClick={onClose}>
          Close
        </button>
        {/* Download Bill Button */}
        <button
          className="tax_invoice-download-button"
          onClick={toPDF} // Trigger PDF generation
          style={{ marginLeft: "10px", backgroundColor: "#4CAF50", color: "white" }}
        >
          Download Bill
        </button>
        <div ref={targetRef} className="p-3" >

          {/* Company Header */}
          <div className="tax_invoice-company-header">
            <h1 className="tax_invoice-company-name">Plaji Bakery</h1>
            <p className="tax_invoice-company-address">4GV, Main Hambran Rd. Mayur Vihar, Dev Nagar, Ludhiana</p>
            <p className="tax_invoice-company-contact">
              Contact: +91-9876543210 | Email: paljibakery.shop@gmail.com | GSTIN: 07AAXCS0655F1ZV
            </p>
          </div>

          {/* Invoice Title */}
          <div className="tax_invoice-title">
            <h2>TAX INVOICE</h2>
          </div>

          {/* Invoice Details */}
          <div className="tax_invoice-details">
            <div>
              <p>
                <strong>Invoice No:</strong> {orderSummary?._id}
              </p>
              <p>
                <strong>Invoice Date:</strong> {new Date(orderSummary?.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Order No:</strong> {orderSummary?.orderId}
              </p>
              <p>
                <strong>Order Date:</strong> {new Date(orderSummary?.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Nature of Supply:</strong> Goods
              </p>
              <p>
                <strong>Place of Supply:</strong> {orderSummary?.shippingAddress?.state}
              </p>
            </div>
          </div>

          {/* Invoice Table */}
          <div className="tax_invoice-table-container">
            <table className="tax_invoice-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Description of Goods</th>
                  {/* <th>HSN Code</th> */}
                  <th>Qty</th>
                  <th>Rate (INR)</th>
                  <th>Taxable Amt (INR)</th>
                  {isPunjab ? (
                    <>
                      <th>CGST (INR)</th>
                      <th>SGST (INR)</th>
                    </>
                  ) : (
                    <th>IGST (INR)</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {orderSummary?.CartId?.orderItems?.map((item, index) => {
                  const taxRate = item?.productId?.category?.tax || 0;
                  const taxableAmount = item?.singleProductPrice ? item.singleProductPrice / (1 + taxRate / 100) : 0;
                  const gstAmount = item?.singleProductPrice ? item.singleProductPrice - taxableAmount : 0;
                  const halfGST = gstAmount / 2;

                  return (
                    <tr key={item?._id}>
                      <td>{index + 1}</td>
                      <td>{item?.productId?.name || "N/A"}</td>
                      {/* <td>N/A</td> */}
                      <td>{item?.quantity || 0}</td>
                      <td>{item?.singleProductPrice?.toFixed(2) || "0.00"}</td>
                      <td>{taxableAmount.toFixed(2)}</td>
                      {isPunjab ? (
                        <>
                          <td>{halfGST.toFixed(2)}</td>
                          <td>{halfGST.toFixed(2)}</td>
                        </>
                      ) : (
                        <td>{gstAmount.toFixed(2)}</td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={5}>
                    <strong>Total Taxable Amount</strong>
                  </td>
                  <td>{orderSummary?.CartId?.totalPriceWithoutDiscount?.toFixed(2) || "0.00"}</td>
                  {isPunjab ? <td colSpan={2}></td> : <td></td>}
                </tr>
                {isPunjab ? (
                  <>
                    <tr>
                      <td colSpan={5}>
                        <strong>Total CGST</strong>
                      </td>
                      <td colSpan={3}>{(taxPrice / 2).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan={5}>
                        <strong>Total SGST</strong>
                      </td>
                      <td colSpan={3}>{(taxPrice / 2).toFixed(2)}</td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <strong>Total IGST</strong>
                    </td>
                    <td colSpan={3}>{taxPrice.toFixed(2)}</td>
                  </tr>
                )}
                <tr>
                  <td colSpan={5}>
                    <strong>Logistic Charges</strong>
                  </td>
                  <td colSpan={3}>{logisticPrice.toFixed(2)}</td>
                </tr>
                {orderSummary.isPaid &&
                <tr>
                  <td colSpan={5}>
                    <strong>Pre paid discount</strong>
                  </td>
                  <td colSpan={3}>- 25</td>
                </tr>
                }

                
                <tr>
                  <td colSpan={5}>
                    <strong>Grand Total (Incl. GST & Logistic Charges)</strong>
                  </td>
                  <td colSpan={3}>{(orderSummary?.CartId?.totalPrice).toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxInvoice;
