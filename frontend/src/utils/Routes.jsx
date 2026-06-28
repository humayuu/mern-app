import { Route, Routes } from "react-router-dom";
import Create from "../Create.jsx";
import App from "../App.jsx";
import Edit from "../Edit.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:id" element={<Edit />} />
    </Routes>
  );
};

export default AppRoutes;
