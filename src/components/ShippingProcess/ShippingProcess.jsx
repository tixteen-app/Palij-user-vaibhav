const ShippingProcess = () => {

  const data = [
    {
      title: 'Shipping and Delivery',
      points: [
        'For International buyers, orders are shipped and delivered through registered international courier companies and/or International speed post only.',
        'For domestic buyers, orders are shipped through registered domestic courier companies and/or speed post only.',
        'Orders are shipped within 0-7 days or as per the delivery date agreed at the time of order confirmation and delivery of the shipment is subject to Courier Company/postal norms.',
        'PALJI BAKERY is not liable for any delay in delivery by the courier company or postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within 0-7 days from the date of the order and payment or as per the delivery date agreed at the time of order confirmation.',
        'Delivery of all orders will be to the address provided by the buyer.',
        'Delivery of our services will be confirmed on your mail ID as specified during registration.',
        'For any issues in utilizing our services, you may contact our helpdesk at 7901706000 or paljibakery.shop@gmail.com.',
      ]
    }
  ];

  return (
    <>
      <div className="main_term_and_condition_div">
        <div className="top_term_and_condition_div">
          <div className="term_and_condition_div">SHIPPING & <br /> DELIVERY</div>
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

export default ShippingProcess;
