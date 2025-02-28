import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MakeTopic from "./components/makeTopic/MakeTopic";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/make_topic" element ={<MakeTopic/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
