import React from "react";
import styled from "styled-components";
import { db } from "../config/firebase";

function Product({ id, product }) {
  const addToCart = () => {
    const cartItem = db.collection("cartItems").doc(id);
    cartItem.get().then((doc) => {
      console.log(doc);
      //if item already exists in cart then update quantity else add new item to cart
      if (doc.exists) {
        cartItem.update({
          quantity: doc.data().quantity + 1,
        });
      } else {
        db.collection("cartItems").doc(id).set({
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: 1,
        });
      }
    });
  };

  return (
    <Container>
      <Title>{product.name}</Title>
      <Price>${product.price}</Price>
      <Rating>
        {Array(product.rating)
          .fill()
          .map((rating) => (
            <p>⭐</p>
          ))}
      </Rating>
      <Image src={product.image} />

      <AddToCartContainer>
        <AddToCartButton onClick={addToCart}>Add To Cart</AddToCartButton>
      </AddToCartContainer>
    </Container>
  );
}

export default Product;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  flex-grow: 1;
  z-index: 100;
  padding: 20px;
  margin: 10px;
  max-height: 400px;
  width: 500px;

  :hover{

  }
`;
const Title = styled.span``;
const Price = styled.span`
  font-weight: 500;
`;
const Rating = styled.div`
  display: flex;
`;
const Image = styled.img`
  height: 200px;
  object-fit: contain;
`;

const AddToCartContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px 0;
`;
const AddToCartButton = styled.button`
  width: 100px;
  background: #f4d078;
  border: 1px solid black;
  cursor: pointer;
`;
