import React from "react";
import styled from "styled-components";
import NumberFormat from "react-number-format";
import { useHistory } from "react-router-dom";

function CartTotal({ getCount, getTotalPrice }) {
  const history = useHistory();
  return (
    <Container>
      <Subtotal>
        <h2>
          Subtotal ({getCount()} items) :
          <NumberFormat
            value={getTotalPrice()}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </h2>
      </Subtotal>
      <CheckoutButton onClick={(e) => history.push("/payment")}>
        Proceed to Checkout
      </CheckoutButton>
    </Container>
  );
}

export default CartTotal;

const Container = styled.div`
  //   height: 200px;
  background: white;
  flex: 0.3;
  padding: 20px;
`;
const Subtotal = styled.div`
  margin-bottom: 16px;
`;
const CheckoutButton = styled.button`
  background-color: #f0c14b;
  width: 100%;
  padding: 4px 8px;
  border: 2px solid #a88734;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  :hover {
    background: #ddb347;
  }
`;
