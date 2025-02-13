import Marquee from "react-fast-marquee";
import { assets } from "../../../assets/assets";
import styles from './Marquee.module.css'

const MarqueeComponent = () => {
  return (
    <Marquee>
      <div className={styles.marquee}>
        Freshness Baked Daily
        <img src={assets.dotPoint} alt="dotpoint" />  Flavor in Every Bite
        <img src={assets.dotPoint} alt="dotpoint" />  Crafted with Care
        <img src={assets.dotPoint} alt="dotpoint" />  Delight in Every Bite
        <img src={assets.dotPoint} alt="dotpoint" />  Freshness Baked Daily
        <img src={assets.dotPoint} alt="dotpoint" />  Flavor in Every Bite
        <img src={assets.dotPoint} alt="dotpoint" />  Crafted with Care
        <img src={assets.dotPoint} alt="dotpoint" />  Delight in Every Bite
        <img src={assets.dotPoint} alt="dotpoint" />  Flavor in Every Bite
        <img src={assets.dotPoint} alt="dotpoint" />  Crafted with Care
        <img src={assets.dotPoint} alt="dotpoint" />  Delight in Every Bite
      </div>
    </Marquee>
  )
}

export default MarqueeComponent
