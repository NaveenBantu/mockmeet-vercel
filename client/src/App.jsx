import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import MockTypes from "./pages/MockTypes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/mock-types" element={<MockTypes />}></Route>
      </Routes>
    </>
  );
}

export default App;
