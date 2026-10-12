import { Link } from "react-router-dom";

function DishCard({ dish }) {
  return (
    <div className="dish-card">
      <h3>
        <Link to={`/dish/${dish.id}`}
          style={{ textDecoration: "none" }}
        >
          {dish.name}
        </Link>
      </h3>

      <p>Rs. {dish.price.toFixed(2)}</p>

      <small>{dish.category}</small>

      {!dish.available && <span> — Sold out</span>}
    </div>
  );
}

export default DishCard;