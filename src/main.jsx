import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { FavoritesProvider } from "./components/FavoritesContext";
import { PaginationProvider } from "./components/PaginationContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <PaginationProvider>
          <App />
        </PaginationProvider>
      </FavoritesProvider>
    </BrowserRouter>
  </StrictMode>
);
