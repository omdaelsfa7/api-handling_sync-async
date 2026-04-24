import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import GetStatus from "./apiHandling/GetStatus.tsx";
import GetBooks from "./apiHandling/GetBooks.tsx";
import GetBookById from "./apiHandling/GetBookById.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GetStatus />
    <GetBooks />
    <GetBookById />
  </StrictMode>,
);
