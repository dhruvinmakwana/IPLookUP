import { Route, Routes as BaseRoutes } from "react-router-dom";
import Home from "./pages/Home/Home";

export default function Routes() {
  return (
    <BaseRoutes>
      <Route path="/" element={<Home />} />
    </BaseRoutes>
  );
}
