import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import CssBaseline from "@mui/material/CssBaseline";
import {
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
