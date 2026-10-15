"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductCatalog from "@/components/ProductCatalog";
import RequestForm from "@/components/RequestForm";
import Footer from "@/components/Footer";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState("");

  const handleRequestItem = (label: string) => {
    setSelectedProduct(label);
    document.getElementById("request")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProductCatalog onRequestItem={handleRequestItem} />
        <RequestForm selectedProduct={selectedProduct} />
      </main>
      <Footer />
    </>
  );
}
