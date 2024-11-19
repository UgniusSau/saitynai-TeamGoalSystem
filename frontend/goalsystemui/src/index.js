import React from "react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthenticationProvider from "./services/authProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TOAST_STYLES from "./constants/toastStyle";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const queryClient = new QueryClient();
const theme = createTheme();

root.render(
  <>
    <ToastContainer {...TOAST_STYLES} />
    <AuthenticationProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Header />
            <App />
            <Footer />
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthenticationProvider>
  </>
);
