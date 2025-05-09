import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeSection01 from "../Components/Home/HomeSection01";
import HomeSection02 from "../Components/Home/HomeSection02";
import HomeSection03 from "../Components/Home/HomeSection03";
import Footer from "./Footer";
import Logo from "../Shared/Logo";
import { motion } from "framer-motion";
import ScrollToTopButton from "../Shared/ScrollToTopButton";

function Home() {
  return (
    <div className="">
      <ScrollToTopButton />
      <Navbar />
      <div className="">
        <HomeSection01 />
        <HomeSection02 />
        <HomeSection03 />
      </div>

      <Footer />
    </div>
  );
}

export default Home;

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY <= 0) {
      setShowNavbar(true); // Always show at the top
    } else if (currentScrollY > lastScrollY) {
      setShowNavbar(false); // Scrolling down
    } else {
      setShowNavbar(true); // Scrolling up
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-100 py-4 px-6 md:px-20 flex justify-between items-center shadow-sm"
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <Logo />

      <nav className="space-x-6 text-gray-700 font-medium text-base">
        <Link
          to="/contact"
          className="hover:text-blue-600 transition-colors duration-200"
        >
          Contact Us
        </Link>
        <Link
          to="/auth"
          className="hover:text-blue-600 transition-colors duration-200"
        >
          Log In
        </Link>
      </nav>
    </motion.header>
  );
}
