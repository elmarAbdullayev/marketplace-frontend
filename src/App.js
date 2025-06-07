import Homepage from "./components/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login"
import Newadvertisement from "./components/newadvertisement";
import Item from "./components/Item";
import Footer from "./components/Footer";
import Adminpanel from "./components/Adminpanel";


function App() {


  return (
    <Router>

      <Routes>
      <Route path="/" element={<Homepage/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/newadvertisement" element={<Newadvertisement/>} />
      <Route path="/item" element={<Item/>} />
      <Route path="/adminpanel" element={<Adminpanel/>} />

      </Routes>
       <Footer/>
    </Router>
  );
}

export default App;
