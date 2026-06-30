import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import "./ProductList.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductList({ search }) {
  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {

    let query = supabase
      .from("products")
      .select("*");

    if (search) {
      query = query.ilike("name", `%${search}%`);
    }

    const { data, error } = await query;

console.log("DATA:", data);
console.log("ERROR:", error);

if (!error) {
  setProducts(data);
}
  }

  useEffect(() => {
    fetchProducts();
  }, [search]);

  return (

    <div className="products">

      {products.map((item) => (

        <div className="card" key={item.id}>

          <img src={item.image} alt={item.name} />

          <h3>{item.name}</h3>

          <p>{item.description}</p>

          <h2>₹{item.price}</h2>

          <button onClick={() => addToCart(item)}>
  Add To Cart
</button>

        </div>

      ))}

    </div>

  );

}

export default ProductList;