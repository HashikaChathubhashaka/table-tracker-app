import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router";
import ItemMenu from "./ItemMenu";
import Home from "./Home";
import Table from "./table";
import Login from "./login";
import PrivateRoute from "./privateRoute";

function App() {
  return (
    <div>
    <Router>
      <Routes>
        

        <Route path="/" element={<Login />} />


        <Route path="/home" element={
          <PrivateRoute>
          <Home />
          </PrivateRoute>
          } />
        <Route path="/menu/:tableNumber" element={
          
          <PrivateRoute>
          <ItemMenu />
          </PrivateRoute>
          
          } />
        <Route path="/table/:tableNumber" element={<Table />} />
      </Routes>
    </Router>



    <footer style={{
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      color: "#fff",
      textAlign: "center",
      padding: "0.5rem 0",
      position: "fixed", 
      left: 0,
      bottom: 0,
      width: "100%",
      fontSize: "0.7rem",
      letterSpacing: "0.5px",
      zIndex: 1000 // To set this as top
    }}>
      © {new Date().getFullYear()} Hashika Chathubhashaka. All rights reserved.
    </footer>



</div>



);
}

export default App;
