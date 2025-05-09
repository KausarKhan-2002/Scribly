import React, { useState, useEffect } from "react";
import { GoArrowUp } from "react-icons/go"; // You can use any other icon or custom design
import { motion } from "framer-motion";

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Check scroll position and show the arrow when scrolling down
  const checkScrollPosition = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Listen to scroll events
  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition);
    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  // Scroll smoothly to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.a
      href="#"
      className="fixed bottom-8 right-8 p-2 bg-slate-600 text-white rounded-full shadow-xl cursor-pointer z-999"
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0.9 }} // Initial state (hidden and small)
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }} // Animate based on visibility
      transition={{
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      }}
    >
      <GoArrowUp className="text-l" />
    </motion.a>
  );
}

export default ScrollToTopButton;
