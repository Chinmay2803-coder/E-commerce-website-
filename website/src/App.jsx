import { useState } from "react";
import "./App.css";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { useEffect } from "react";
import { supabase } from "./supabase";

function App() {

  const [search, setSearch] = useState("");
  const [openCart, setOpenCart] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
  supabase.auth.getUser().then(({ data }) => {
    setUser(data.user);
  });

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);
  });

  return () => subscription.unsubscribe();
}, []);

  return (
    <Routes>

<Route
path="/"
element={

<>
<Navbar
  openCart={() => setOpenCart(true)}
  user={user}
/>
<Hero/>

<SearchBar onSearch={setSearch}/>

<ProductList search={search}/>

<Cart
isOpen={openCart}
onClose={() => setOpenCart(false)}
/>

<Footer/>

</>

}
/>

<Route
path="/login"
element={<Login/>}
/>

</Routes>
  );
}

export default App;