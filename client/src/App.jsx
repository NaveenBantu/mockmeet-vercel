import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import MockTypes from "./pages/MockTypes";
import Feedback from "./pages/Feedback";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/mock-types" element={<MockTypes />}></Route>
        <Route path="/feedbacks" element={<Feedback />}></Route>
      </Routes>
    </>
  );
}

export default App;
