//firebase login
//firebase init
//use spacebar to select hosting and press enter
//DONT FORGET -> What do you want to use as your public directory? build

import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import styled from "styled-components";
import Home from "./components/Home";
import Cart from "./components/Cart";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { db, auth } from "./config/firebase";
import Login from "./components/Login";

function App() {
  //retrieve the user from local storage of browser
  //things in local storage stay there forever until you clear out cookies from browser
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [cartItems, setCartItems] = useState([]);

  const getCartItems = () => {
    db.collection("cartItems").onSnapshot((snapshot) => {
      let tempItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        product: doc.data(),
      }));

      setCartItems(tempItems);
    });
  };

  const signOut = () => {
    auth.signOut().then(() => {
      setUser(null);
      localStorage.removeItem("user");
    });
  };

  useEffect(() => {
    getCartItems();
  }, []);

  console.log(user);

  return (
    <Router>
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <Container>
          <Header user={user} signOut={signOut} cartItems={cartItems} />
          <Switch>
            <Route path="/cart">
              <Cart cartItems={cartItems} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Container>
      )}
    </Router>
  );
}

export default App;

const Container = styled.div``;
