import React from "react";
import styled from "styled-components";

import CartDrawer from "../CartDrawer";

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 64px;
  background-color: #008B8B;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-style: solid;
  border-bottom-color: #c0c0c0;
  border-bottom-width: 1px;
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 360px) {
    flex-direction: column;
    height: 86px;
  }
`;

const Logo = styled.a`
  width: auto;
  max-width: 190px;
  max-height: 70%;
  margin-right: auto;
  padding: 0px 12px 8px;
  

  @media (max-width: 360px) {
    width: 80%;
    max-height: auto;
    margin-left: auto;
  }
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;

`;

function Topbar({ cart, clearCart }) {
  return (
    <Wrapper>
      <Logo href="/">
        <LogoImage src="/img/logo.png" />
      </Logo>
      <CartDrawer cart={cart} clearCart={clearCart} />
    </Wrapper>
  );
}

export default Topbar;
