import React, { useState } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Form = styled.form`
  width: 100%;
  padding: 16px;
  display: flex;
  box-sizing: border-box;
`;

const SearchInput = styled.input`
  flex: 1;
  width: inherit;
  border-radius: 8px 0px 0px 8px;
  border: none;
  background-color: #f2f2f2;
  outline: none;
  font-weight: bold;
  padding: 8px;
  text-align: center;
`;

const SubmitButton = styled.button`
  color: #fff;
  background-color: #3b6bb8;
  border: none;
  outline: none;
  border-radius: 0px 8px 8px 0px;
  padding: 8px;
  cursor: pointer;
`;

function SearchBar({ setProducts, setPageNavigation, resetProducts }) {
  const [searchText, setSearchText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(` https://pokeapi.co/api/v2/pokemon/${searchText.toLowerCase()}`)
      .then((response) => {
        if (response.status !== 404) {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          if (!data.count) {
            setProducts([
              {
                id: data.id,
                name: data.name,
                price: "R$ 40,00",
                image: `https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`,
              },
            ]);

            setPageNavigation({ next: null, previous: null });
          } else {
            resetProducts();
          }
        }
      });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search pokemon"
        />
        <SubmitButton type="submit">
          <FontAwesomeIcon icon={faSearch} className="cart__icon" />
        </SubmitButton>
      </Form>
    </div>
  );
}

export default SearchBar;
