import React, { useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";

// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
//contexts
import { ProductContext, CartContext } from "./contexts";

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState([]);

  //localstorage
  function cartLocalStorageYaz(cartParam) {
    localStorage.setItem("cart", JSON.stringify(cartParam));
  }

  function cartLocalStorageOku(key){
   return JSON.parse(localStorage.getItem(key));
  }

  function initialStateOku(key){
    const initialCart = cartLocalStorageOku(key);
    if(initialCart) {
      return initialCart;
    }else {
      return [];
    }
  }

  const addItem = (item) => {
    // verilen itemi sepete ekleyelim
    setCart([...cart, item]);
    cartLocalStorageYaz(cart);
  };

  const removeItem = (id) => {
    // verilen itemi sepetetemn çıkartma
    const newCart = ([...cart.filter((c) => c.id !== id)]);
    setCart(newCart);
    cartLocalStorageYaz(newCart);
  };



  return (
    <div className="App">
      <ProductContext.Provider value= {{ products, addItem }}>
      <CartContext.Provider value = {{ cart, removeItem }}>
      <Navigation />

      {/* Routelar */}
      <main className="content">
        <Route exact path="/">
          <Products />
        </Route>

        <Route path="/cart">
          <ShoppingCart />
        </Route>
      </main>
      </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
