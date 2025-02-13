import styles from './PrivacyPolicy.module.css'

const PrivacyPolicy = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Privacy Policy</h1>
      <p className={styles.paragraph}>At Palji Bakery, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and protect the information you provide when using our e-commerce website.
      </p>
      <div className={styles.one}>
        <h2>1. Information We Collect
        </h2>
        <p>We collect the following types of information when you use our website:
        </p>
        <ul>
          <li><span>Personal Information:</span> This includes your name, email address, phone number, billing and shipping address, and payment information when you make a purchase.
          </li>
          <li>
            <span>Non-Personal Information:</span> We collect data related to your use of our website, such as browser type, IP address, and browsing behavior, to help improve our services.
          </li>
        </ul>
      </div>
      <div className={styles.two}>
        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect for the following purposes:</p>
        <ul>
          <li>To process and complete your orders, including delivery and payment.
          </li>
          <li>To communicate with you regarding your orders, promotions, or other inquiries.</li>
          <li>To improve our website functionality and enhance user experience.</li>
          <li>To send marketing and promotional emails, if you have opted in to receive them.</li>
          <li>To comply with legal obligations and protect the security of our website.</li>
        </ul>
      </div>
      <div className={styles.three}>
        <h2>3. Cookies</h2>
        <p>Our website uses cookies to enhance your browsing experience. Cookies are small data files stored on your device. These files help us remember your preferences and provide a personalized shopping experience.</p>
        <p>You can choose to disable cookies through your browser settings; however, doing so may limit the functionality of our website.
        </p>
      </div>
      <div className={styles.four}>
        <h2>4. Data Protection and Security</h2>
        <p>We take appropriate measures to safeguard your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
        <ul>
          <li>We use SSL encryption to secure your payment and personal information during transactions.</li>
          <li>Only authorized personnel have access to personal information for processing orders and customer service.</li>
        </ul>
      </div>
      <div className={styles.five}>
        <h2>5. Third-Party Services</h2>
        <p>We may share your information with trusted third-party service providers who assist us in operating our website, processing payments, and shipping products. These service providers are required to protect your information and use it only for the services they provide to us.</p>
        <p>We do not sell, trade, or rent your personal information to third parties for marketing purposes.</p>
      </div>
      <div className={styles.six}>
        <h2>6. Your Rights</h2>
        <p>You have the right to access, modify, or delete your personal information at any time. You may also withdraw consent to the use of your information for marketing purposes.</p>
        <p>To exercise your rights, please contact us at [customer support email] or [phone number].</p>
      </div>
      <div className={styles.seven}>
        <h2>7. Children's Privacy</h2>
        <p>Our website is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child under 18 has provided us with personal information, we will take steps to delete such information.</p>
      </div>
      <div>
        <h2>8. Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the revised policy will be effective immediately upon posting.</p>
        <p>We encourage you to review this policy periodically to stay informed about how we protect your information.</p>
      </div>
      <div>
        <h2>9. Contact Us</h2>
        <p>If you have any questions or concerns regarding this Privacy Policy, please contact us at [customer support email] or call us at [phone number].</p>
      </div>
    </div>
  )
}

export default PrivacyPolicy
