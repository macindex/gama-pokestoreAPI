import React, { useState } from "react";
import styled from "styled-components";

import { Topbar, ProductsView, Footer } from "./components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const handleAddToCart = (data) => {
    const newCart = JSON.parse(localStorage.getItem("cart")) || [];
    newCart.push({
      id: data.id,
      name: data.name,
      image: data.image,
      price: data.price,
    });
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleClearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <MainContainer className="App" style={{ minHeight: "100vh" }}>
      <Topbar cart={cart} clearCart={handleClearCart} />
      <ProductsView addToCart={handleAddToCart} />
      <Footer />
    </MainContainer>
  );
}

export default App;
