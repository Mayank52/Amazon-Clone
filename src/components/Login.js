import React from "react";
import styled from "styled-components";
import { auth, provider } from "../config/firebase";

function Login({ setUser }) {
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        let user = result.user;
        console.log(user);
        let newUser = {
          name: user.displayName,
          photo: user.photoURL,
          email: user.email,
        };
        //so that it remains signed in after refresh, as the state will get cleared out upon refresh
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Container>
      <Content>
        <AmazonLogo src="./images/amazon-logo.png" />
        <h1>Sign in to amazon</h1>
        <LoginButton onClick={signIn}>Sign in with Google</LoginButton>
      </Content>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f8f8f8;
  display: grid;
  place-items: center;
`;
const Content = styled.div`
  padding: 100px;
  background: white;
  border-radius: 5px;
  box-shadow: 0px 1px 3px gray;
  text-align: center;
`;
const AmazonLogo = styled.img`
  height: 100px;
  margin-bottom: 40px;
`;
const LoginButton = styled.button`
  margin-top: 50px;
  background-color: #f0c14b;
  height: 40px;
  border: 2px solid #a88734;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
`;
