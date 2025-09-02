import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import App from "./App";
import "./index.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
        <Provider store={store}>
            <CssBaseline />
            <BrowserRouter basename="/blog-testing">
                <App />
            </BrowserRouter>
        </Provider>
        </ThemeProvider>
    </React.StrictMode>
);

