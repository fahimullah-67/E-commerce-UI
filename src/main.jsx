import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { CartContextProvider } from "./context/CartContext.jsx";
import { CheckoutContextProvider } from './context/CheckoutContext.jsx'

const API_BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/`
  : '/api/';

axios.defaults.baseURL = API_BASE_URL;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <CartContextProvider>
        <CheckoutContextProvider>
          <App />
        </CheckoutContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
