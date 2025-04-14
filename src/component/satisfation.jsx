// // import React from 'react'
// // import "../styles/homenew/satisfation.css";
// // import firstimage from "../assets/h-1.png"
// // import secondimage from "../assets/h-2.png"
// // import thirdimage from "../assets/h-3.png"
// // import fourthimage from "../assets/h-4.png"
// // import fifthimage from "../assets/h-5.png"
// // import {motion} from "framer-motion"

// // function Satisfation() {
// //     return (
// //         <>
// //             <div className='main_satisfaction_top_div' >
// //                 <div className="background_shapes">
// //                     <div className="background_shapes_1_outer">
// //                         <div className="background_shapes_1"></div>
// //                     </div>

// //                     <div className="background_shapes_2_outer">
// //                         <div className="background_shapes_2"></div>
// //                     </div>

// //                     <div className="background_shapes_3_outer">
// //                         <div className="background_shapes_3"></div>
// //                     </div>

// //                 </div>
// //                 {/* image */}
// //                 <div className='satisfaction_image_main_div' >
// //                     {/* left */}
// //                     <div className='satisfaction_image_left_div' >
// //                         <div className='satisfaction_image_left_div1'>
// //                             <img src={firstimage} alt="" className='satisfaction_image' />
// //                         </div>
// //                         <div className='satisfaction_image_left_div1'>
// //                             <img src={secondimage} alt="" className='satisfaction_image' />
// //                         </div>
// //                     </div>
// //                     <div>
// //                         <div className='satisfaction_image_center_div'>
// //                             <img src={thirdimage} alt="" className='satisfaction_image' />
// //                         </div>
// //                     </div>
// //                     <div className='satisfaction_image_left_div' >
// //                         <div className='satisfaction_image_left_div1'>
// //                             <img src={fourthimage} alt="" className='satisfaction_image' />
// //                         </div>
// //                         <div className='satisfaction_image_left_div1'>
// //                             <img src={fifthimage} alt="" className='satisfaction_image' />
// //                         </div>

// //                     </div>
// //                 </div>

// //             </div>

// //         </>
// //     )
// // }

// // export default Satisfation

// import React from 'react'
// import "../styles/homenew/satisfation.css";
// import firstimage from "../assets/h-1.png"
// import secondimage from "../assets/h-2.png"
// import thirdimage from "../assets/h-3.png"
// import fourthimage from "../assets/h-4.png"
// import fifthimage from "../assets/h-5.png"
// // c:\Users\sumit\Downloads\h-6.png c:\Users\sumit\Downloads\h-7.png c:\Users\sumit\Downloads\h-8.png
// import sixthimage from "../assets/h-6.png"
// import seventhimage from "../assets/h-7.png"
// import eighthimage from "../assets/h-8.png"
// import { motion } from "framer-motion"

// function Satisfation() {
//     // Animation variants
//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.2
//             }
//         }
//     };

//     const itemVariants = {
//         hidden: { y: 20, opacity: 0 },
//         visible: {
//             y: 0,
//             opacity: 1,
//             transition: {
//                 duration: 0.5,
//                 ease: "easeOut"
//             }
//         }
//     };

//     const shapeVariants = {
//         hidden: { scale: 0.8, opacity: 0 },
//         visible: {
//             scale: 1,
//             opacity: 1,
//             transition: {
//                 duration: 0.8,
//                 ease: "backOut"
//             }
//         }
//     };

//     const centerImageVariants = {
//         hidden: { scale: 0.9, opacity: 0 },
//         visible: {
//             scale: 1,
//             opacity: 1,
//             transition: {
//                 duration: 0.6,
//                 ease: "easeOut"
//             }
//         }
//     };

//     return (
//         <>
//             <motion.div
//                 className='main_satisfaction_top_div'
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, margin: "-100px" }}
//                 variants={containerVariants}
//             >
//                 <div className="background_shapes">
//                     <motion.div className="background_shapes_1_outer" variants={shapeVariants}>
//                         <div className="background_shapes_1"></div>
//                     </motion.div>

//                     <motion.div className="background_shapes_2_outer" variants={shapeVariants}>
//                         <div className="background_shapes_2"></div>
//                     </motion.div>

//                     <motion.div className="background_shapes_3_outer" variants={shapeVariants}>
//                         <div className="background_shapes_3"></div>
//                     </motion.div>
//                 </div>

//                 {/* image */}
//                 <div className='satisfaction_image_main_div'>
//                     {/* left */}
//                     <div className='satisfaction_image_left_div'>
//                         <motion.div className='satisfaction_image_left_div1' variants={itemVariants}>
//                             <motion.img
//                                 src={firstimage}
//                                 alt=""
//                                 className='satisfaction_image'
//                                 whileHover={{ scale: 1.05 }}
//                                 transition={{ duration: 0.3 }}
//                             />
//                         </motion.div>
//                         <motion.div className='satisfaction_image_left_div1' variants={itemVariants}>
//                             <motion.img
//                                 src={secondimage}
//                                 alt=""
//                                 className='satisfaction_image'
//                                 whileHover={{ scale: 1.05 }}
//                                 transition={{ duration: 0.3 }}
//                             />
//                         </motion.div>
//                     </div>

//                     <div>
//                         <motion.div className='satisfaction_image_center_div' variants={centerImageVariants}>
//                             <motion.img
//                                 src={thirdimage}
//                                 alt=""
//                                 className='satisfaction_image'
//                                 whileHover={{ scale: 1.05 }}
//                                 transition={{ duration: 0.3 }}
//                             />
//                         </motion.div>
//                     </div>

//                     <div className='satisfaction_image_left_div'>
//                         <motion.div className='satisfaction_image_left_div1' variants={itemVariants}>
//                             <motion.img
//                                 src={fourthimage}
//                                 alt=""
//                                 className='satisfaction_image'
//                                 whileHover={{ scale: 1.05 }}
//                                 transition={{ duration: 0.3 }}
//                             />
//                         </motion.div>
//                         <motion.div className='satisfaction_image_left_div1' variants={itemVariants}>
//                             <motion.img
//                                 src={fifthimage}
//                                 alt=""
//                                 className='satisfaction_image'
//                                 whileHover={{ scale: 1.05 }}
//                                 transition={{ duration: 0.3 }}
//                             />
//                         </motion.div>
//                     </div>
//                 </div>
//             </motion.div>


//             <div className='main_satisfaction_top_div_for_mobile' >
//                 <div className="background_shapes">
//                     <motion.div className="background_shapes_1_outer" variants={shapeVariants}>
//                         <div className="background_shapes_1"></div>
//                     </motion.div>

//                     <motion.div className="background_shapes_2_outer" variants={shapeVariants}>
//                         <div className="background_shapes_2"></div>
//                     </motion.div>

//                     <motion.div className="background_shapes_3_outer" variants={shapeVariants}>
//                         <div className="background_shapes_3"></div>
//                     </motion.div>
//                 </div>

//                 <div className='satisfaction_image_main_div_for_mobile' >
//                     <div className='satisfaction_image_for_mobile_main'>
//                     <div className='satisfaction_image_parent_left_div_for_mobile' >
//                         <div className='satisfaction_image_left_div_for_mobile' >
//                             <img src={firstimage} alt="" className="satisfaction_image" />
//                         </div>
//                         <div className='satisfaction_image_left_div_for_mobile'>
//                             <img src={secondimage} alt="" className="satisfaction_image" />
//                         </div>
//                     </div>
//                     <div className='satisfaction_image_parent_right_div_for_mobile' >
//                         <div className='satisfaction_image_right_div_for_mobile' >
//                             <img src={sixthimage} alt="" className="satisfaction_image_for_mobile_center_image" />
//                         </div>
//                         <div className='satisfaction_image_right_div_for_mobile'>
//                             <img src={seventhimage} alt="" className="satisfaction_image_for_mobile_right" />
//                         </div>
//                         <div className='satisfaction_image_right_div_for_mobile'>
//                             <img src={eighthimage} alt="" className="satisfaction_image_for_mobile_right" />
//                         </div>
//                     </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Satisfation


import React from 'react'
import "../styles/homenew/satisfation.css";
import firstimage from "../assets/h-1.png"
import secondimage from "../assets/h-2.png"
import thirdimage from "../assets/h-9.png"
import fourthimage from "../assets/h-4.png"
import fifthimage from "../assets/h-5.png"
import sixthimage from "../assets/h-6.png"
import seventhimage from "../assets/h-7.png"
import eighthimage from "../assets/h-8.png"
import ninthimage from "../assets/h-10.png"
import newvideo from "../assets/homevideo.mp4"
import newvideomobile from "../assets/homevideomobile.mp4"
import { motion } from "framer-motion"

function Satisfation() {
    // Animation variants 
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const shapeVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "backOut"
            }
        }
    };

    const centerImageVariants = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    // Mobile specific animations
    const mobileContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    };

    const mobileLeftItemVariants = {
        hidden: { x: -50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const mobileRightItemVariants = {
        hidden: { x: 50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const mobileCenterItemVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.7,
                ease: "backOut"
            }
        }
    };

    return (
        <>

            <div  >
                <div className="satisfaction_video_main_div">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        id="myVideo"
                        className="satisfaction_video"
                    >
                        <source src={newvideo} type="video/mp4" />
                    </video>
                </div>


            </div>
        </>
    )
}

export default Satisfation