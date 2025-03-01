import { Banner } from "@/components/banner/Banner";
import FeaturedProducts from "@/components/featuredProducts/FeaturedProducts";
import { Footer } from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { NewArrivals } from "@/components/newArrivals/NewArrivals";
import { ProductCategories } from "@/components/productCategories/ProductCategories";
import { ThermalRibbons } from "@/components/thermalRibbons/ThermalRibbons";
import { TopSelling } from "@/components/topSelling/TopSelling";
import React from "react";

const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <ProductCategories />
      <TopSelling />
      <NewArrivals />
      <FeaturedProducts />
      <ThermalRibbons />
      <Footer />
    </>
  );
};

export default Home;
