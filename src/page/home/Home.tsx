import { Banner } from "@/componets/banner/Banner";
import FeaturedProducts from "@/componets/featuredProducts/FeaturedProducts";
import { Footer } from "@/componets/footer/Footer";
import { Header } from "@/componets/header/Header";
import { NewArrivals } from "@/componets/newArrivals/NewArrivals";
import { ProductCategories } from "@/componets/productCategories/ProductCategories";
import { ThermalRibbons } from "@/componets/thermalRibbons/ThermalRibbons";
import { TopSelling } from "@/componets/topSelling/TopSelling";
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
