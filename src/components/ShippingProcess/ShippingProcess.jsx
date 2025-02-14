import styles from './ShippingProcess.module.css'

const ShippingProcess = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Shipping Process</h1>
      <p className={styles.paragraph}>At Palji Bakery, we ensure that our delicious confectionery products, GIFT HAMPERS,        SAVORY and PREMIUM COOKIES, are delivered to you in the best possible condition. Below are the details of our shipping process:
      </p>
      <div>
        <h2>1. Order Processing</h2>
        <ul>
          <li>
            Orders are processed within 1-2 business days after payment confirmation.</li>
          <li>You will receive an order confirmation email with your order details and an estimated delivery date.</li>
          <li>Orders placed on weekends or public holidays will be processed on the next working day.</li>
        </ul>
      </div>
      <div>
        <h2>2. Shipping Methods</h2>
        <ul>
          <li>We use trusted courier services to deliver our products.</li>
          <li>Delivery options include standard and expedited shipping, which can be selected during the checkout process.</li>
          <li>Shipping charges will be displayed at checkout based on your location and selected delivery method.</li>
        </ul>
      </div>
      <div>
        <h2>3. Delivery Timeframe</h2>
        <ul>
          <li>Standard shipping typically takes 3-7 business days, depending on your location.</li>
          <li>Expedited shipping is available for faster delivery and typically takes 1-3 business days.</li>
          <li>Delivery timeframes are estimates and may vary due to unforeseen circumstances such as weather, courier delays, or other external factors.</li>
        </ul>
      </div>
      <div>
        <h2>4. Shipping Charges</h2>
        <ul>
          <li>Shipping charges are calculated based on the destination and the weight of the package.</li>
          <li>Free shipping is available for orders exceeding a certain value, which will be indicated during checkout.</li>
          <li>International shipping charges may vary based on destination country.</li>
        </ul>
      </div>
      <div>
        <h2>5. Tracking Your Order</h2>
        <ul>
          <li>Once your order has been shipped, you will receive a shipping confirmation email with a tracking number.</li>
          <li>You can track your order on our website or the courier's website using the provided tracking number.</li>
        </ul>
      </div>
      <div>
        <h2>6. Delivery Issues</h2>
        <ul>
          <li>If your order does not arrive within the estimated delivery time, please contact our customer support.</li>
          <li>In case of damaged or missing items, notify us within 48 hours of delivery for prompt assistance.</li>
        </ul>
      </div>
      <div>
        <h2>7. Return Shipping</h2>
        <ul>
          <li>
            In the event of a product return due to damage or defect, we will arrange for return shipping at no additional cost to you.
          </li>
          <li>Refunds will be processed after the returned item has been inspected and approved by our team.</li>
        </ul>
      </div>
      <div>
        <h2>8. International Shipping</h2>
        <ul>
          <li>
            We currently offer international shipping to select countries.
          </li>
          <li>Customs fees, duties, and taxes for international shipments are the responsibility of the customer.</li>
          <li>
            Delivery times for international orders vary depending on the destination country.
          </li>
        </ul>
      </div>
      <p>We aim to ensure a seamless shipping experience for all our customers. Should you have any questions regarding shipping, please feel free to contact us.</p>
      <p>Thank you for choosing Palji Bakery. We look forward to delivering sweetness to your doorstep!</p>
    </div>
  )
}

export default ShippingProcess
