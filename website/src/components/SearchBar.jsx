import { useState } from "react";
import { supabase } from "../supabase";
import "./SearchBar.css";

function SearchBar({ onSearch }) {

  const [search, setSearch] = useState("");
  const [lastSearch, setLastSearch] = useState("");

  async function handleSearch(e) {

    const value = e.target.value;

    setSearch(value);

    onSearch(value);

    if (
      value.trim() !== "" &&
      value !== lastSearch
    ) {

      await supabase
        .from("search_history")
        .insert([
          {
            search: value
          }
        ]);

      setLastSearch(value);

    }

  }

  return (

    <div className="search-box">

      <input
        type="text"
        placeholder="Search Products..."
        value={search}
        onChange={handleSearch}
      />

      <button>
        Search
      </button>

    </div>

  );

}

export default SearchBar;