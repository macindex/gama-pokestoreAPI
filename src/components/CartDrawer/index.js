import React from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { CartView } from "..";

const CartLink = styled.a`
  text-decoration: none;
  color: #000;
  font-size: 1.1em;
  padding-right: 8px;
  font-weight: bold;
`;

const ItemsCount = styled.span`
  color: red;
`;

export default function CartDrawer({ cart, clearCart }) {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event) {
      event.preventDefault();
    }

    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <React.Fragment>
      <CartLink href="/" className="cart" onClick={toggleDrawer("right", true)}>
        <span>
          <ItemsCount className="cart__indicator">{cart.length}</ItemsCount>
          <FontAwesomeIcon icon={faShoppingCart} className="cart__icon" />
          Carrinho
        </span>
      </CartLink>
      <SwipeableDrawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        <CartView cart={cart} clearCart={clearCart} />
      </SwipeableDrawer>
    </React.Fragment>
  );
}
