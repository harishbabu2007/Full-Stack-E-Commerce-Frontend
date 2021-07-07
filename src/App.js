import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Homepage from "./Components/Homepage";
import Viewproduct from "./Components/Viewproduct";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/products/view/:slug">
            <Viewproduct />
          </Route>
          <Route path="/view/action/cart">
            <Cart />
          </Route>
          <Route path="/view/action/checkout">
            <Checkout />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
