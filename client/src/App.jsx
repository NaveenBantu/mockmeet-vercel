import { Route, Routes, useNavigate } from "react-router";
import Dashboard from "./pages/Dashboard";
// import Home from "./pages/Home";
import MockTypes from "./pages/MockTypes";
import UpcomingInterviews from "./pages/UpcomingInterviews";
import Header from "./components/Header";
import Feedback from "./pages/Feedback";
import Schedule from "./pages/Schedule";
import Resources from "./pages/resources/Resources";
import Resource from "./pages/resources/Resource";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import Availability from "./pages/Availability";

function App() {
  const navigate = useNavigate();

  const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;
  if (!clerkPubKey) {
    throw new Error("Missing Publishable Key");
  }

  return (
    <>
      <ClerkProvider
        publishableKey={clerkPubKey}
        navigate={(to) => navigate(to)}
      >
        <Header user={<UserButton />} />
        <Routes>
          {/* Initial home path will be Dashboard */}
          {/* <Route path="/" element={<Home />}></Route> */}
          <Route
            path="/sign-in/*"
            element={
              <>
                <center>
                  <SignIn routing="path" path="/sign-in" />
                </center>
              </>
            }
          />
          <Route
            path="/sign-up/*"
            element={
              <center>
                <SignUp routing="path" path="/sign-up" />
              </center>
            }
          />
          <Route
            path="/"
            element={
              <>
                {/* <SignedIn> */}
                {}
                <Dashboard />
                {/* </SignedIn> */}
                {/* <SignedOut>
                  <RedirectToSignIn redirectUrl={window.location.href} />
                </SignedOut> */}
              </>
            }
          ></Route>
          <Route path="/mock-types" element={<MockTypes />}></Route>
          <Route path="/schedule/:mockId" element={<Schedule />}></Route>
          <Route
            path="/upcoming-interviews"
            element={<UpcomingInterviews />}
          ></Route>
          <Route path="/feedbacks" element={<Feedback />}></Route>
          <Route path="/resources" element={<Resources />}></Route>
          <Route path="/resource/:name" element={<Resource />}></Route>
          {/* <Route path="/admin" element={<AdminDashboard />}></Route> */}
          <Route path="/availability" element={<Availability />}></Route>
        </Routes>
      </ClerkProvider>
    </>
  );
}

export default App;
