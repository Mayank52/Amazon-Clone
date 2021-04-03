import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CartItem from "./CartItem";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import NumberFormat from "react-number-format";
import axios from "axios";
import { useHistory } from "react-router";

function Payment({ user, cartItems, getTotalPrice }) {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        //stripe expects amount in subcurrency -> like for Dollars you have to pass it in cents
        const res = await axios.post(
          `http://localhost:3000/payments/create?total=${getTotalPrice() * 100}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log("Axios Post Error:", err);
      }
    };

    console.log(clientSecret);
    getClientSecret();
  }, [cartItems]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          type: 'card',
          card: elements.getElement(CardElement),
        }
      }).then(({ paymentIntent }) => {
        //paymentIntent = payment confirmation

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        //empty the cart -> TODO

        history.replace("/orders");
      })
      .catch((err) => {
        console.log("Payment Error:", err);
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <Container>
      <PaymentDetailsContainer>
        <PaymentHeading>Delivery Address</PaymentHeading>
        <PaymentAddress>
          <AddressLine>Name: {user.name}</AddressLine>
          <AddressLine>
            Address Line 1:
            <input type="text" />
          </AddressLine>
          <AddressLine>
            Address Line 2:
            <input type="text" />
          </AddressLine>
        </PaymentAddress>
      </PaymentDetailsContainer>
      <hr />
      <PaymentDetailsContainer>
        <PaymentHeading>Review Items and Delivery</PaymentHeading>
        <PaymentItems>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              cartItem={item.product}
              isPayment={true}
            />
          ))}
        </PaymentItems>
      </PaymentDetailsContainer>
      <PaymentDetailsContainer>
        <hr />
        <PaymentHeading>Payment Method</PaymentHeading>
        <PaymentForm onSubmit={handleSubmit}>
          <CardElement onChange={handleChange} />

          <Price>
            Order Total:{" "}
            <NumberFormat
              value={getTotalPrice()}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
          </Price>

          <PaymentButton disabled={processing || disabled || succeeded}>
            <PaymentButtonText>
              {processing ? <p>Processing</p> : <p>Buy Now</p>}
            </PaymentButtonText>
          </PaymentButton>

          {error ? <Error>{error}</Error> : <Error></Error>}
        </PaymentForm>
      </PaymentDetailsContainer>
    </Container>
  );
}

export default Payment;

const Container = styled.div`
  background: white;
  width: 85%;
  margin: 10px auto;
  padding: 10px;
`;
const PaymentDetailsContainer = styled.div``;
const PaymentHeading = styled.h3`
  margin: 5px 0;
`;
const PaymentAddress = styled.div`
  margin: 10px 0;
`;
const PaymentItems = styled.div``;
const AddressLine = styled.div`
  margin: 5px 0;
  input {
    margin: 0 10px;
    width: 400px;
  }
`;

const PaymentForm = styled.form``;
const PaymentButton = styled.button``;
const Price = styled.div`
  font-weight: 700;
`;
const PaymentButtonText = styled.span``;
const Error = styled.div``;
