// src/pages/HomePage.jsx

import React, { useState, useEffect, Activity } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import {
  ArrowRightIcon,
  CurrencyDollarIcon,
  CubeTransparentIcon,
  GlobeAltIcon,
  TagIcon,
} from "@heroicons/react/24/solid";
import { publicRequest } from "../utils/api";

const MOCK_CATEGORIES = [
  {
    name: "Men's Apparel",
    imageUrl:
      "https://via.placeholder.com/400x300/374151/ffffff?text=Mens+Apparel",
  },
  {
    name: "Women's Wear",
    imageUrl:
      "https://via.placeholder.com/400x300/ef4444/ffffff?text=Womens+Wear",
  },
  {
    name: "Accessories",
    imageUrl:
      "https://via.placeholder.com/400x300/3b82f6/ffffff?text=Accessories",
  },
  {
    name: "Footwear",
    imageUrl: "https://via.placeholder.com/400x300/a855f7/ffffff?text=Footwear",
  },
];
const MOCK_BRANDS = [
  {
    name: "BrandA",
    logoUrl:
      "https://i.pinimg.com/1200x/a8/58/33/a8583379aca11f2e0108c688c6122a79.jpg",
  },
  {
    name: "BrandB",
    logoUrl:
      "https://i.pinimg.com/1200x/9a/a5/b8/9aa5b892dc9c5d66b00fac905c98411c.jpg",
  },
  {
    name: "BrandC",
    logoUrl:
      "https://wowodi.com/cdn/shop/products/c6d4b13089aed956fc0eec2b5dc1b379.jpg?v=1691234843&width=823",
  },
  {
    name: "BrandD",
    logoUrl:
      "https://i.pinimg.com/1200x/7a/8a/5d/7a8a5df631540e31b968e5116fb78a8f.jpg",
  },
  {
    name: "BrandE",
    logoUrl:
      "https://i.pinimg.com/1200x/9a/a5/b8/9aa5b892dc9c5d66b00fac905c98411c.jpg",
  },
];

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await publicRequest.get("/products");
        const products = Array.isArray(res.data) ? res.data : [];

        setFeaturedProducts(products.slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch products for Home Page:", err);
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <section className="bg-gradient-to- from-purple-100 to-indigo-100 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-row lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
                Discover Your{" "}
                <span className="text-indigo-600">Perfect Style</span>
              </h1>
              <Link
                to="/products"
                className="inline-flex items-center bg-gray-900 text-white text-xl font-semibold px-10 py-4 rounded-full hover:bg-gray-700 transition duration-300 shadow-xl"
              >
                SHOP NOW <ArrowRightIcon className="w-6 h-6 ml-3" />
              </Link>
            </div>
            <div className="lg:w-1/2 flex justify-end">
              <img
                src="https://i.pinimg.com/1200x/ab/1a/88/ab1a88a0df893524caa263929ce6cb3d.jpg"
                alt="Stylish Fashion Collection"
                className="rounded-3xl shadow-2xl object-cover w-full max-w-lg"
              />
            </div>
          </div>
        </section>

        <section className="bg-gray-900 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
              {MOCK_BRANDS.map((brand, index) => (
                <img
                  key={index}
                  src={brand.logoUrl}
                  alt={brand.name}
                  className="h-40 opacity-70 hover:opacity-100 transition duration-300 filter grayscale hover:grayscale-0 animate-brandSlide"
                  style={{
                    animation: "10s linear 1s infinite alternate slide-in",
                  }}
                />
              ))}
            </div>
            <style>{`
              @keyframes slide-in {
                from {
                  transform: translateX(100vh);
                  opacity: 0.5;
                }
                to {
                  transform: translateX(-100vh);
                  opacity: 1;
                }
              }
              .animate-brandSlide {
                animation: slide-in 3s linear 1s infinite alternate;
              }
            `}</style>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
              Featured Products
            </h2>

            {loading && (
              <div className="text-center text-lg text-indigo-600">
                <Activity className="animate-spin h-8 w-8 mx-auto mb-4" />
                Loading products...
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {!loading &&
                featuredProducts.map((product, index) => (
                  <div
                    key={product._id}
                    className="animate-slideInRight"
                    style={{
                      animationDelay: `${index * 0.15}s`,
                      animationDuration: "1s",
                      animationFillMode: "both",
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
            </div>
            <style>{`
              @keyframes slideInRight {
                from {
                  opacity: 0;
                  transform: translateX(100px);
                }
                to {
                  opacity: 1;
                  transform: translateX(0);
                }
              }
              .animate-slideInRight {
                animation: slideInRight ease-out forwards;
              }
            `}</style>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-indigo-600 text-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-extrabold text-center mb-12">
              Why Shop With Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="inline-block p-4 bg-indigo-400 rounded-full mb-4">
                  <CurrencyDollarIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Best Prices</h3>
                <p>
                  Competitive pricing with frequent discounts and deals on all
                  products.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-block p-4 bg-indigo-400 rounded-full mb-4">
                  <CubeTransparentIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quality Products</h3>
                <p>
                  Premium selection of authentic brands and verified sellers.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-block p-4 bg-indigo-400 rounded-full mb-4">
                  <GlobeAltIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
                <p>
                  Quick delivery worldwide with real-time tracking on all
                  orders.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-block p-4 bg-indigo-400 rounded-full mb-4">
                  <TagIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Best Deals</h3>
                <p>
                  Exclusive offers and loyalty rewards for our valued customers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* === 5. Shop By Category === */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
              Explore Categories
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {MOCK_CATEGORIES.map((category, index) => (
                <Link
                  key={index}
                  to={`/products?category=${category.name}`}
                  className="block group relative overflow-hidden rounded-xl shadow-lg transition duration-300 hover:shadow-2xl"
                >
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-64 object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white tracking-wider">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;