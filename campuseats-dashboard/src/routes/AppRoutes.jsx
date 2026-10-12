import { Routes, Route } from "react-router-dom";

import MenuPage from "../features/menu/pages/MenuPage";
import DishDetailPage from "../features/menu/pages/DishDetailPage";
import OrderPage from "../features/menu/pages/OrderPage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MenuPage />} />
      <Route path="/dish/:id" element={<DishDetailPage />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<h2>404 - Page Not Found</h2>} />
    </Routes>
  );
}

export default AppRoutes;