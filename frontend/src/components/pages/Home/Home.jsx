import React from "react";
import { IoCart } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import HomeMiddle from "../../HomeMiddle/HomeMiddle";
import HomeLower from "../../HomeMiddle/HomeLower";
import { useSelector } from "react-redux";
import p7 from '../../../assets/p7.jpeg';

const Home = () => {
  const { posts } = useSelector((st) => st.auth);

  return (
    <div className="min-h-screen bg-blue-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className=" ">
          <img
            src={p7}
            alt="Featured Artwork"
            className="w-full h-[45vh] sm:h-[55vh] md:h-[65vh] object-cover  shadow-2xl transform hover:rotate-1 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent "></div>
        </div>
        <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-wider uppercase drop-shadow-lg text-white">
            Art That Pops
          </h1>
          <p className="mt-1 text-sm sm:text-base md:text-lg font-light opacity-90 text-white">
            Bold designs by Manjeet
          </p>
          <Link to="/explore">
            <button className="mt-4 px-4 py-2 sm:px-6 sm:py-3 bg-yellow-400 text-black font-semibold rounded-full shadow-lg hover:bg-yellow-500 hover:scale-105 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base md:text-lg">
              Shop Now <FaLongArrowAltRight />
            </button>
          </Link>
        </div>
      </div>

      {/* Popular Products Section */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center uppercase text-gray-800 tracking-wide drop-shadow-md">
          Top Picks
        </h1>
        <Link to="/explore">
          <h2 className="text-center text-indigo-600 text-sm sm:text-base md:text-lg font-medium hover:text-indigo-500 transition-colors duration-300">
            See All Collections
          </h2>
        </Link>

        {/* Middle Section - Featured Products */}
        <div className=" flex flex-col md:flex-row justify-center gap-6 bg--50 p- rounded-xl shadow-xl">
          <HomeMiddle />
        </div>

        {/* Lower Section - Product Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map((item, idx) => (
            <HomeLower key={idx} post={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;