"use client"

import { useRef, useState, useEffect } from "react"
import { makeApi } from "../api/callApi"
import "../styles/Home/instalivefeed.css"
import {motion } from "framer-motion"
const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)


// Custom hook for detecting mobile devices
function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Clean up
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [breakpoint])

  return isMobile
}

// Instagram post component
function InstagramPost({ mediaUrl, alt, permalink }) {
  return (
    <motion.a 
      href={permalink} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="palji_instagram_post"

      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}

    >
      <img src={mediaUrl} alt={alt} className="palji_post_image" loading="lazy" />
    </motion.a>
  )
}

// Main Instagram feed component
export default function InstagramFeed() {
  const scrollContainerRef = useRef(null)
  const isMobile = useMobile()
  const [scrollPosition, setScrollPosition] = useState(0)
  const [instagramPosts, setInstagramPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchInstagramFeed = async () => {
    try {
      const response = await makeApi(`/api/instagram-feed`, "GET")
      const filteredPosts = response.data.data
        .filter(item => item.media_type === "IMAGE") // Only include IMAGE type posts
        .slice(0, 10) // Only show 10 most recent posts
      setInstagramPosts(filteredPosts)
    } catch (error) {
      console.error("Error fetching Instagram feed:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInstagramFeed()
  }, [])

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft)
    }
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      })
    }
  }

  if (loading) {
    return (
      <section className="palji_instagram_section">
        <div className="palji_header">
          <h2 className="palji_title">
            Follow Us on <span className="palji_highlight">Instagram</span>
          </h2>
          <p className="palji_subtitle">Loading our latest posts...</p>
        </div>
        <div className="palji_loading_spinner"></div>
      </section>
    )
  }

  if (!loading && instagramPosts.length === 0) {
    return (
      <section className="palji_instagram_section">
        <div className="palji_header">
          <h2 className="palji_title">
            Follow Us on <span className="palji_highlight">Instagram</span>
          </h2>
          <p className="palji_subtitle">No posts available at the moment.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="palji_instagram_section">
      {/* Decorative elements */}
      <div className="palji_decorative_circle_left"></div>
      <div className="palji_decorative_circle_right"></div>
      <div className="palji_decorative_dots"></div>

      <div className="palji_container">
        <motion.div
          initial={{ opacity: 0 , y: 100}}
        whileInView={{ opacity: 1 , y: 0}}
        transition={{ duration: 0.9 }}
        className="palji_header">
          <h2 className="palji_title">
            Follow Us on <span className="palji_highlight">Instagram</span>
          </h2>
          <p className="palji_subtitle">Join our Instagram community for updates, special deals, and more!</p>
        </motion.div>

        <div className="palji_feed_container">
          {/* Instagram posts container */}
          <div ref={scrollContainerRef} className="palji_posts_container" onScroll={handleScroll}>
            {instagramPosts.map((post) => (
              <InstagramPost
                key={post.id}
                mediaUrl={post.media_url}
                alt={post.caption || "Instagram post"}
                permalink={post.permalink}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 , y: 100}}
        whileInView={{ opacity: 1 , y: 0}}
        transition={{ duration: 0.9 }}
        className="palji_footer">
          
          <a 
            href="https://www.instagram.com/paljibakeryldh/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="palji_follow_button"
          >
            <InstagramIcon className="palji_follow_icon" />
            <span>Follow on Instagram</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}