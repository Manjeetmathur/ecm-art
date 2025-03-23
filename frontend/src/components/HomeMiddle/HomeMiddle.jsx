import React from "react";
import { Link } from "react-router-dom";
import p4 from "../../assets/p4.png";
import p5 from "../../assets/p5.png";
import p6 from "../../assets/p6.png";

const HomeMiddle = () => {
       const featuredProducts = [
              { id: 1, image: p5, title: "Abstract Harmony", price: 79.99, link: "/" },
              { id: 2, image: p4, title: "Vibrant Landscape", price: 89.99, link: "/" },
              { id: 3, image: p6, title: "Modern Portrait", price: 69.99, link: "/" },
       ];

       return (
              <div className="py-6">
                     <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 m-5">
                            {featuredProducts.map((product) => (
                                   <div
                                          key={product.id}
                                          className="relative group w-[300px] sm:w-[350px] lg:w-[300px] rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 bg--50"
                                   >
                                          <Link to={product.link}>
                                                 <img
                                                        src={product.image}
                                                        alt={product.title}
                                                        className="w-full h-64 sm:h-72 object-cover rounded-lg"
                                                 />
                                          </Link>
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 rounded-lg">
                                                 <h3 className="text-white text-lg sm:text-xl font-semibold">
                                                        {product.title}
                                                 </h3>
                                                 
                                          </div>
                                   </div>
                            ))}
                     </div>
              </div>
       );
};

export default HomeMiddle;