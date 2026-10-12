import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { useFetch } from "../hooks/useFetch";

function OrderPage() {
  const { user } = useAuth();
  const API_BASE = import.meta.env.VITE_API_URL;
  const { data: dishes } = useFetch(`${API_BASE}/api/menu`);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    dishId: "",
    qty: 1,
  });

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: prev.name || user.name || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user]);

  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  function validate(values) {
    const e = {};

    if (!values.name.trim() || values.name.trim().length < 2) {
      e.name = "Please enter your name (at least 2 characters).";
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) {
      e.email = "Please enter a valid email address.";
    }

    if (Number(values.qty) < 1) {
      e.qty = "Quantity must be at least 1.";
    }

    return e;
  }

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const foundErrors = validate(form);
    setErrors(foundErrors);

    if (Object.keys(foundErrors).length === 0) {
      setDone(true);
    }
  }

  const selectedDish = dishes?.find(
    (d) => String(d.id) === String(form.dishId),
  );

  if (done) {
    return (
      <div
        className="auth-card"
        style={{ maxWidth: "520px", textAlign: "center" }}
      >
        <div className="auth-alert success" style={{ marginBottom: "20px" }}>
          Order Confirmed!
        </div>
        <div className="auth-header">
          <h2>Thank You, {form.name}!</h2>
          <p>Your order has been sent to the campus kitchen.</p>
        </div>

        <div
          style={{
            background: "var(--code-bg)",
            padding: "16px",
            borderRadius: "10px",
            margin: "20px 0",
            textAlign: "left",
          }}
        >
          {selectedDish && (
            <p>
              <strong>Item:</strong> {selectedDish.name} (Rs.{" "}
              {selectedDish.price.toFixed(2)})
            </p>
          )}
          <p>
            <strong>Quantity:</strong> {form.qty}
          </p>
          <p>
            <strong>Confirmation Email:</strong> {form.email}
          </p>
          {selectedDish && (
            <p
              style={{
                marginTop: "8px",
                fontWeight: "700",
                color: "var(--accent)",
              }}
            >
              Total: Rs. {(selectedDish.price * form.qty).toFixed(2)}
            </p>
          )}
        </div>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <button
            onClick={() => {
              setDone(false);
              setForm({
                name: user?.name || "",
                email: user?.email || "",
                dishId: "",
                qty: 1,
              });
            }}
            className="auth-btn"
            style={{ width: "auto", padding: "10px 20px" }}
          >
            Order Again
          </button>
          <Link to="/" className="login-link" style={{ alignSelf: "center" }}>
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-card" style={{ maxWidth: "500px" }}>
      <div className="auth-header">
        <h2>Place Campus Order</h2>
        <p>Order fresh meal portions directly for pickup</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="order-dish">Select Dish</label>
          <select
            id="order-dish"
            name="dishId"
            value={form.dishId}
            onChange={handleChange}
            className="search-input"
            style={{ width: "100%", padding: "11px 14px", borderRadius: "8px" }}
          >
            <option value="">-- Choose a dish (Optional) --</option>
            {dishes?.map((dish) => (
              <option key={dish.id} value={dish.id}>
                {dish.name} - Rs. {dish.price.toFixed(2)} ({dish.category})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="order-name">Your Name</label>
          <input
            id="order-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Perera"
            required
          />
          {errors.name && (
            <span style={{ color: "#dc2626", fontSize: "13px" }}>
              {errors.name}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="order-email">Campus Email</label>
          <input
            id="order-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="student@sliit.lk"
            required
          />
          {errors.email && (
            <span style={{ color: "#dc2626", fontSize: "13px" }}>
              {errors.email}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="order-qty">Quantity</label>
          <input
            id="order-qty"
            type="number"
            min="1"
            max="20"
            name="qty"
            value={form.qty}
            onChange={handleChange}
            required
          />
          {errors.qty && (
            <span style={{ color: "#dc2626", fontSize: "13px" }}>
              {errors.qty}
            </span>
          )}
        </div>

        <button type="submit" className="auth-btn">
          Confirm & Place Order
        </button>
      </form>
    </div>
  );
}

export default OrderPage;
