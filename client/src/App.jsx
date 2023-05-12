import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import MockTypes from "./pages/MockTypes";
import Header from "./components/Header";
import Feedback from "./pages/Feedback";
import Schedule from "./pages/Schedule";
import Resources from "./pages/resources/Resources";
import Resource from "./pages/resources/Resource";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/mock-types" element={<MockTypes />}></Route>
        <Route path="/schedule/:mockId" element={<Schedule />}></Route>
        <Route path="/feedbacks" element={<Feedback />}></Route>
        <Route path="/resources" element={<Resources />}></Route>
        <Route path="/resource/:name" element={<Resource />}></Route>
      </Routes>
    </>
  );
}

export default App;
