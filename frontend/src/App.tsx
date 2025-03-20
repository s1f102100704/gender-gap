import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MakeTopic from "./pages/MakeTopic";
import ThreadPage from "./pages/ThreadPage";
import Login from "./pages/admin/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/make_topic" element={<MakeTopic />} />
        <Route path="threads/:id" element={<ThreadPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
