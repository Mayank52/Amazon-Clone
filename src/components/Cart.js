import React from "react";
import styled from "styled-components";
import CartItems from "./CartItems";
import CartTotal from "../components/CartTotal";

function Cart({ cartItems, getTotalPrice }) {
  const getCount = () => {
    let count = 0;
    cartItems.forEach((item) => {
      count += item.product.quantity;
    });
    return count;
  };

  // const getTotalPrice = () => {
  //   let total = 0;
  //   cartItems.forEach((item) => {
  //     total += item.product.quantity * item.product.price;
  //   });
  //   return total;
  // };

  return (
    <Container>
      <CartItems cartItems={cartItems} />
      <CartTotal getCount={getCount} getTotalPrice={getTotalPrice} />
    </Container>
  );
}

export default Cart;

const Container = styled.div`
  display: flex;
  padding: 14px 18px 0px 18px;
  align-items: flex-start;
`;
