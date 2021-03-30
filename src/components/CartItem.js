import React from "react";
import styled from "styled-components";
import { db } from "../config/firebase";

function CartItem({ id, cartItem }) {

  let options = [];
  for (let i = 1; i < Math.max(cartItem.quantity + 1, 25); i++) {
    options.push(<option value={i}> Qty: {i} </option>);
  }

  const changeQuantity = (value) => {
    console.log(value);
    db.collection("cartItems").doc(id).update({
      quantity: parseInt(value)
    })
  }

  const deleteItem = (e) => {
    e.preventDefault();
    db.collection("cartItems").doc(id).delete();
  };

  return (
    <Container>
      <ImageContainer>
        <img src={cartItem.image} />
      </ImageContainer>

      <CartItemInfo>
        <CartItemInfoTop>{cartItem.name}</CartItemInfoTop>
        <CartItemInfoBottom>
          <CartItemQuantity>
            <select value={cartItem.quantity} onChange = {(e) => {changeQuantity(e.target.value)}}>{options}</select>
          </CartItemQuantity>
          <CartItemDelete onClick={(e)=>{deleteItem(e)}}>Delete</CartItemDelete>
        </CartItemInfoBottom>
      </CartItemInfo>

      <CartItemPrice>${cartItem.price}</CartItemPrice>
    </Container>
  );
}

export default CartItem;

const Container = styled.div`
  display: flex;
  border-bottom: 1px solid #DDD;
`;
const ImageContainer = styled.div`
  width: 180px;
  flex-shrink: 0;
  flex-grow: 0;

  img {
    object-fit: contain;
    height: 100%;
    width: 100%;
  }
`;
const CartItemInfo = styled.div`
  padding: 0 15px;
  flex-grow: 1;
`;
const CartItemInfoTop = styled.div`
  font-weight: 600;
  color: #007185;
  margin: 10px 0;
`;
const CartItemQuantity = styled.div`
  select {
    border-radius: 5px;
    background-color: #f0f2f2;
    padding: 8px;

    :focus{
      outline: none;
    }
  }
`;
const CartItemDelete = styled.div`
  color: #007185;
  margin-left: 16px;
  cursor: pointer;
`;
const CartItemInfoBottom = styled.div`
  display: flex;
  align-items: center;
`;
const CartItemPrice = styled.div`
  font-size: 18px;
  font-weight: 700;
`;
