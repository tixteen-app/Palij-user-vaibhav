import styles from './SweetPraise.module.css'
import Marquee from "react-fast-marquee";
import { motion } from 'framer-motion'

const reviews = [
  {
    name: "Ananya K.",
    desctiption: "A treat in every bite. Our family’s favorite bakery!"
  },
  {
    name: "Rohit M.",
    desctiption: "Amazing quality and taste! Perfect for every celebration."
  },
  {
    name: "Priya S.",
    desctiption: "Loved the freshness and packaging. Truly delightful!"
  }, {
    name: "Swati B",
    desctiption: "Perfect gift option! Everyone loved it.",
  }
]

const SweetPraise = () => {
  return (
    <div className={styles.container}>
      <motion.h2
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className={styles.title}
      >SWEET PRAISE</motion.h2>
      <Marquee pauseOnHover speed={40}>
        <div className={styles.reviews}>
          {reviews.map(item => (
            <div key={item.content} className={styles.content}>
              <p>{item.desctiption}</p>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  )
}

export default SweetPraise
