import React from 'react';

function Cancellation() {

  const data = [
    {
      title: 'Cancellation and Refund',
      points: [
        'PALJI BAKERY believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:',
        'Cancellations will be considered only if the request is made within 2-3 days of placing the order.',
        'However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.',
        'PALJI BAKERY does not accept cancellation requests for perishable items like flowers, eatables, etc.',
        'However, refund/replacement can be made if the customer establishes that the quality of the product delivered is not good.',
        'In case of receipt of damaged or defective items, please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end.',
        'This should be reported within 2-3 days of receipt of the products.',
        'In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 2-3 days of receiving the product.',
        'The Customer Service Team after looking into your complaint will take an appropriate decision.',
        'In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.',
        'In case of any Refunds approved by the PALJI BAKERY, it’ll take 3-4 days for the refund to be processed to the end customer.',
      ]
    }
  ];

  return (
    <>
      <div className="main_term_and_condition_div">
        <div className="top_term_and_condition_div">
          <div className="term_and_condition_div">CANCELLATION & <br /> REFUND</div>
        </div>
        <div className="bottom_term_and_condition_div">
          {data.map((section, index) => (
            <div key={index} className="term_and_condition_div_bottom_data">
              <h2>{section.title}</h2>
              <ul>
                {section.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Cancellation;
