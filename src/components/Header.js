import React from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { Link } from "react-router-dom";

function Header({ user, cartItems, signOut }) {
  //everytime the cartItems state changes this function gets called automatically
  const setCartCount = () => {
    let count = 0;

    cartItems.forEach((item) => {
      count += item.product.quantity;
    });

    return count;
  };

  return (
    <Container>
      <Link to="/">
        <HeaderLogo>
          <img src="./images/amazon-logo1.png" />
        </HeaderLogo>
      </Link>
      <HeaderOption>
        <HeaderLocationContainer>
          <LocationIconContainer>
            <LocationOnIcon />
          </LocationIconContainer>
          <HeaderOptionLines>
            <HeaderOptionLineOne>Hello</HeaderOptionLineOne>
            <HeaderOptionLineTwo>Select Your Address</HeaderOptionLineTwo>
          </HeaderOptionLines>
        </HeaderLocationContainer>
      </HeaderOption>

      <HeaderSearchContainer>
        <SearchInput type="text" />
        <SearchIconContainer>
          <SearchIcon />
        </SearchIconContainer>
      </HeaderSearchContainer>

      <HeaderOption onClick={signOut}>
        <HeaderOptionLineOne>Hello, {user.name.split(" ")[0]}</HeaderOptionLineOne>
        <HeaderOptionLineTwo>Account & Lists</HeaderOptionLineTwo>
      </HeaderOption>
      <HeaderOption>
        <HeaderOptionLineOne>Returns</HeaderOptionLineOne>
        <HeaderOptionLineTwo>& Orders</HeaderOptionLineTwo>
      </HeaderOption>

      <HeaderCartContainer>
        <Link to="/cart">
          <CartIconContainer>
            <ShoppingCartIcon />
          </CartIconContainer>
          <CartCount> {setCartCount()} </CartCount>
        </Link>
      </HeaderCartContainer>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  background: #131921;
  color: white;
  padding: 0 15px;
`;

const HeaderLogo = styled.div`
  img {
    width: 100px;
    object-fit: cover;
  }
`;

const HeaderOption = styled.div`
  padding: 10px 9px 9px 9px;
  font-size: 14px;
  cursor: pointer;
`;

const HeaderLocationContainer = styled.div`
  display: flex;
`;
const HeaderOptionLines = styled.div`
  padding-left: 3px;
`;
const HeaderOptionLineOne = styled.div``;

const HeaderOptionLineTwo = styled.div`
  font-weight: 700;
`;

const HeaderSearchContainer = styled.div`
  display: flex;
  flex-grow: 1;
  border-radius: 4px;
  height: 40px;
  overflow: hidden;

  :focus-within {
    box-shadow: 0 0 0 2px #f90;
  }
`;
const SearchInput = styled.input`
  width: 100%;
  border: 0;
  padding: 2px;
  :focus {
    outline: none;
  }
`;
const SearchIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #febd69;
  color: black;
  width: 45px;
`;

const HeaderCartContainer = styled.div`
  display: flex;
  a {
    color: white;
    display: flex;
    justify-content: center;
    // align-items: center;
    text-decoration: none;
  }
`;
const CartIconContainer = styled.div``;
const CartCount = styled.div``;
const LocationIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
