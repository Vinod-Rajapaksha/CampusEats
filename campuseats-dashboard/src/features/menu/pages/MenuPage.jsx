import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import MenuList from "../components/MenuList";

function MenuPage() {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 300);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5134";
  const menuEndpoint = `${API_BASE}/api/menu`;

  const { data: dishes, isLoading, error } = useFetch(menuEndpoint);

  const filtered = (dishes || []).filter((dish) =>
    dish.name?.toLowerCase().includes((debounced || "").toLowerCase())
  );

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h2>Campus Dining Menu</h2>
        <p>Fresh meals served daily at your campus cafeterias</p>
      </div>

      <div className="search-bar-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search dishes (e.g., Kottu, Rice)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {isLoading && <p className="loading-state">Loading menu items...</p>}
      {error && (
        <div className="auth-alert error">
          Could not load menu: {error}
        </div>
      )}

      {!isLoading && !error && <MenuList dishes={filtered} />}
    </div>
  );
}

export default MenuPage;
