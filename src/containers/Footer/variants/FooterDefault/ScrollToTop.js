import React, { useEffect, useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isBrowser = () => typeof window !== "undefined"
  const scrollToTop = () => {
    if(isBrowser) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    isVisible &&
      <button onClick={scrollToTop} className="footerDefault__scroll-top" title="Scroll back to top" aria-label="Scroll back to top">
        <IoIosArrowUp />
      </button>
  )
}

export default ScrollToTop
