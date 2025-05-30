import Homepage from "./components/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login"
import Newadvertisement from "./components/newadvertisement";

function App() {
  return (
    <Router>
      <Routes>

      <Route path="/" element={<Homepage/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/newadvertisement" element={<Newadvertisement/>} />

      </Routes>
    </Router>
  );
}

export default App;
