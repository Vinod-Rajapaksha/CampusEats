import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

function DishDetailPage() {
  const { id } = useParams();
  const API_BASE = import.meta.env.VITE_API_URL;
  const endpoint = `${API_BASE}/api/menu/${id}`;
  const { data: dish, isLoading, error } = useFetch(endpoint || "");

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px" }}>
      <h2>Dish Details</h2>

      {isLoading && endpoint && <p>Loading dish details...</p>}
      {error && endpoint && <p>Could not load dish details from server.</p>}

      {dish ? (
        <div
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "16px",
            margin: "16px 0",
          }}
        >
          <h3>{dish.name}</h3>
          <p>
            <strong>Price:</strong> Rs. {dish.price?.toFixed(2)}
          </p>
          <p>
            <strong>Category:</strong> {dish.category}
          </p>
          <p>
            <strong>Status:</strong> {dish.available ? "Available" : "Sold Out"}
          </p>
        </div>
      ) : (
        <p>Showing details for dish #{id}</p>
      )}

      <br />
      <Link to="/">← Back to Menu</Link>
    </div>
  );
}

export default DishDetailPage;
