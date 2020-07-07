import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Product from "../Product";
import SearchBar from "../SearchBar";

const Wrapper = styled.div`
  width: 100%;
  max-width: 960px;
  display: flex;
  flex-direction: column;
  flex: 1;
  
`;

const ProductsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  max-width: 240px;
  display: flex;
  justify-content: space-between;
  margin: 12px auto;
  
`;

const NavigationButton = styled.button`
  outline: none;
  border: none;
  background-color: #3b6bb8;
  color: #fff;
  border-radius: 8px;
  padding: 12px 6px;
  margin: 2px;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background-color: #2e519a;
  }

  &:disabled {
    background: #b4b4b4;
    cursor: not-allowed;
  }
`;

function ProductsView({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [pageNavigation, setPageNavigation] = useState({});
  const [apiUrl, setApiUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
  );

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProducts(
          data.results.map((product) => {
            const url = product.url.replace(/\/$/, "");
            const id = url.substr(url.lastIndexOf("/") + 1);
            return {
              id,
              ...product,
              price: "R$ 120,00",
              image: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`,
            };
          })
        );

        setPageNavigation({ next: data.next, previous: data.previous });
      });
  }, [apiUrl]);

  const resetProducts = () => {
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProducts(
          data.results.map((product) => {
            const url = product.url.replace(/\/$/, "");
            const id = url.substr(url.lastIndexOf("/") + 1);
            return {
              id,
              ...product,
              price: "R$ 330,00",
              image: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`,
            };
          })
        );

        setPageNavigation({ next: data.next, previous: data.previous });
      });
  }

  const handleNextPage = () => {
    setApiUrl(pageNavigation.next);
  };

  const handlePreviousPage = () => {
    setApiUrl(pageNavigation.previous);
  };

  return (
    <Wrapper>
      <SearchBar
        setProducts={setProducts}
        setPageNavigation={setPageNavigation}
        resetProducts={resetProducts}
      />
      <ProductsWrapper>
        {products.map((product) => (
          <Product
            key={product.id}
            data={product}
            addToCart={addToCart}
          ></Product>
        ))}
      </ProductsWrapper>
      <ButtonsWrapper>
        <NavigationButton
          onClick={handlePreviousPage}
          disabled={pageNavigation.previous === null}
        >
          {"<"} Previous
        </NavigationButton>
        <NavigationButton
          onClick={handleNextPage}
          disabled={pageNavigation.next === null}
        >
          Next {">"}
        </NavigationButton>
      </ButtonsWrapper>
    </Wrapper>
  );
}

export default ProductsView;
