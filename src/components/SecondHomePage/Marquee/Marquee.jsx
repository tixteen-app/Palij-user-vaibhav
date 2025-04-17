import Marquee from "react-fast-marquee";
import { assets } from "../../../assets/assets";
import styles from './Marquee.module.css'

const MarqueeComponent = () => {
  return (
    <Marquee>
      <div className={styles.marquee}>
        <img src={assets.dotPoint} alt="dotpoint" />  <span className="text-black"> free shipping</span><span>on order above ₹750 </span>
        <img src={assets.dotPoint} alt="dotpoint" />  <span className="text-black"> free shipping</span><span>on order above ₹750 </span>
      </div>

      <div className={styles.marquee}>
        <img src={assets.dotPoint} alt="dotpoint" />  
        <span className="text-black"> fresh cake only </span>
        <span>in Ludhiana </span>

        
      </div>
    </Marquee>
  )
}

export default MarqueeComponent
