// import React from "react";
// import { usePDF } from "react-to-pdf"; // Import the usePDF hook
// import "./CSS/taxinvoice.css";

// const TaxInvoice = ({ orderSummary, onClose }) => {
//   const isPunjab = orderSummary?.shippingAddress?.state === "Punjab";
//   const taxPrice = Number(orderSummary?.taxprice) || 0;
//   const logisticPrice = orderSummary?.CartId?.deliveryCharges;
//   // Use the usePDF hook to generate and download the PDF
//   const { toPDF, targetRef } = usePDF({ filename: `TaxInvoice_${orderSummary?._id}.pdf` });

//   return (
//     <div className="tax_invoice-overlay">
//       <div className="tax_invoice-container" >
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
//           Download Bill
//         </button>
//         <div ref={targetRef} className="p-3" >

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
//             <div>
//               <p>
//                 <strong>Invoice No:</strong> {orderSummary?._id}
//               </p>
//               <p>
//                 <strong>Invoice Date:</strong> {new Date(orderSummary?.createdAt).toLocaleDateString()}
//               </p>
//               <p>
//                 <strong>Order No:</strong> {orderSummary?.orderId}
//               </p>
//               <p>
//                 <strong>Order Date:</strong> {new Date(orderSummary?.createdAt).toLocaleDateString()}
//               </p>
//               <p>
//                 <strong>Nature of Supply:</strong> Goods
//               </p>
//               <p>
//                 <strong>Place of Supply:</strong> {orderSummary?.shippingAddress?.state}
//               </p>
//             </div>
//           </div>

//           {/* Invoice Table */}
//           <div className="tax_invoice-table-container">
//             <table className="tax_invoice-table">
//               <thead>
//                 <tr>
//                   <th>S.No</th>
//                   <th>Description of Goods</th>
//                   {/* <th>HSN Code</th> */}
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
//                       {/* <td>N/A</td> */}
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
//                   <td>{orderSummary?.CartId?.totalPriceWithoutDiscount?.toFixed(2) || "0.00"}</td>
//                   {isPunjab ? <td colSpan={2}></td> : <td></td>}
//                 </tr>
//                 {/* {isPunjab ? (
//                   <>
//                     <tr>
//                       <td colSpan={5}>
//                         <strong>Total CGST</strong>
//                       </td>
//                       <td colSpan={3}>{(taxPrice / 2).toFixed(2)}</td>
//                     </tr>
//                     <tr>
//                       <td colSpan={5}>
//                         <strong>Total SGST</strong>
//                       </td>
//                       <td colSpan={3}>{(taxPrice / 2).toFixed(2)}</td>
//                     </tr>
//                   </>
//                 ) : (
//                   <tr>
//                     <td colSpan={5}>
//                       <strong>Total IGST</strong>
//                     </td>
//                     <td colSpan={3}>{taxPrice.toFixed(2)}</td>
//                   </tr>
//                 )} */}
//                 <tr>
//                   <td colSpan={5}>
//                     <strong>Logistic Charges</strong>
//                   </td>
//                   <td colSpan={3}>{logisticPrice.toFixed(2)}</td>
//                 </tr>
//                 {orderSummary.isPaid &&
//                 <tr>
//                   <td colSpan={5}>
//                     <strong>discount</strong>
//                   </td>
//                   <td colSpan={3}>- ₹{ orderSummary?.CartId.totalPrice - orderSummary?.CartId.totalPriceWithoutDiscount }</td>
//                 </tr>
//                 }

                
//                 <tr>
//                   <td colSpan={5}>
//                     <strong>Grand Total (Incl. GST & Logistic Charges)</strong>
//                   </td>
//                   <td colSpan={3}>{(orderSummary?.CartId?.totalPrice).toFixed(2)}</td>
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


import React from "react";
import { usePDF } from "react-to-pdf"; // Import the usePDF hook
import "./CSS/taxinvoice.css";

const TaxInvoice = ({ orderSummary, onClose }) => {
  const isPunjab = orderSummary?.shippingAddress?.state === "Punjab";
  const taxPrice = Number(orderSummary?.taxprice) || 0;
  const logisticPrice = orderSummary?.CartId?.deliveryCharges || 0;
  const totalPriceWithoutDiscount = orderSummary?.CartId?.totalPriceWithoutDiscount || 0;
  const totalPrice = orderSummary?.CartId?.totalPrice || 0;
  const discount = totalPriceWithoutDiscount - totalPrice;

  // Use the usePDF hook to generate and download the PDF
  const { toPDF, targetRef } = usePDF({ filename: `TaxInvoice_${orderSummary?._id}.pdf` });

  return (
    <div className="tax_invoice-overlay">
      <div className="tax_invoice-container">
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
        <div ref={targetRef} className="p-3">
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
            <h2>Retail Invoice</h2>
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
                  <td>{totalPriceWithoutDiscount.toFixed(2)}</td>
                  {isPunjab ? <td colSpan={2}></td> : <td></td>}
                </tr>
                <tr>
                  <td colSpan={5}>
                    <strong>Logistic Charges</strong>
                  </td>
                  <td colSpan={3}>{logisticPrice.toFixed(2)}</td>
                </tr>
                {orderSummary?.isPaid && (
                  <tr>
                    <td colSpan={5}>
                      <strong>Discount</strong>
                    </td>
                    <td colSpan={3}> ₹{discount.toFixed(2)}</td>
                  </tr>
                )}
                <tr>
                  <td colSpan={5}>
                    <strong>Grand Total (Incl. GST & Logistic Charges)</strong>
                  </td>
                  <td colSpan={3}>{totalPrice.toFixed(2)}</td>
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