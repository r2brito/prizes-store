import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import AppRoutes from "./routes";

import "./styles/app.scss";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <AppRoutes />
          <ToastContainer autoClose={3000} />
        </Suspense>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
