import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MakeTopic from "./pages/MakeTopic";
import ThreadDetail from "./pages/ThreadDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/make_topic" element={<MakeTopic />} />
        <Route path="threads/:id" element={<ThreadDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
