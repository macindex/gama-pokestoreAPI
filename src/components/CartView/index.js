import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    maxWidth: "60%",
    backgroundColor: theme.palette.background.paper,
    color: "#333",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  closeButton: {
    backgroundColor: "#7FF4A8",
    color: "#333",
    outline: "none",
    border: "none",
    padding: "8px",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#7FCD9B",
    },
  },
}));

const Wrapper = styled.div`
  min-width: 280px;
  max-width: 80%;
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

const CartWrapper = styled.div`
  width: 100%;
`;

const Title = styled.h2`
  padding: 0px 12px;
`;

const CartProduct = styled.div`
  height: 72px;
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProductImage = styled.img`
  height: 100%;
`;

const ProductName = styled.p`
  display: block;
  margin-block-start: 0.1em;
  margin-block-end: 0.1em;
  margin: auto 12px;
  font-size: 1rem;
  text-transform: capitalize;
  font-weight: bold;
`;

const ProductPrice = styled.p`
  display: block;
  margin-block-start: 0.1em;
  margin-block-end: 0.1em;
  font-size: 1rem;
  color: #3b6bb8;
  margin-left: auto;
`;

const TotalPrice = styled.p`
  display: block;
  margin-block-start: 0.1em;
  margin-block-end: 0.1em;
  margin: auto 12px;
  font-size: 1rem;
  margin-left: auto;
`;

const CenterText = styled.p`
  text-align: center;
`;

const PurchaseButton = styled.button`
  width: 100%;
  background-color: #3b6bb8;
  color: #fff;
  outline: none;
  border: none;
  border-radius: 8px;
  font-size: 1.2em;
  margin: 4px 0px;
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #2e519a;
  }

  &:disabled {
    background: #b4b4b4;
    cursor: not-allowed;
  }
`;

function CartView({ cart, clearCart }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Compra realizada!</h2>
      <p id="simple-modal-description">Agradecemos pela sua compra.</p>
      <button onClick={() => setOpen(false)} className={classes.closeButton}>
        Fechar
      </button>
    </div>
  );

  const finishPurchase = () => {
    handleOpen();
    clearCart();
  };
  return (
    <Wrapper>
      <Title>Carrinho</Title>
      <CartWrapper>
        {cart.length > 0 ? (
          cart.map((product) => (
            <CartProduct key={product.id}>
              <ProductImage src={product.image} alt={product.image} />
              <ProductName>{product.name}</ProductName>
              <ProductPrice>{product.price}</ProductPrice>
            </CartProduct>
          ))
        ) : (
          <CenterText>Seu carrinho está vazio</CenterText>
        )}
      </CartWrapper>
      <TotalPrice>
        <b>TOTAL: </b>
        {cart.length > 0 &&
          "R$ " +
            cart
              .map((product) =>
                parseFloat(product.price.split(" ")[1].replace(",", "."))
              )
              .reduce((a, b) => a + b, 0)}
      </TotalPrice>
      <PurchaseButton onClick={finishPurchase} disabled={cart.length <= 0}>
        Finalizar compra
      </PurchaseButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </Wrapper>
  );
}

export default CartView;
