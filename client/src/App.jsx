import { Route, Routes, useNavigate } from "react-router";
import Dashboard from "./pages/Dashboard";
// import Home from "./pages/Home";
import MockTypes from "./pages/MockTypes";
import Header from "./components/Header";
import Feedback from "./pages/Feedback";
import Schedule from "./pages/Schedule";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
<<<<<<< Updated upstream
  RedirectToSignIn,
=======
>>>>>>> Stashed changes
  SignIn,
  SignUp,
  UserButton,
} from "@clerk/clerk-react";

function App() {
  const navigate = useNavigate();

  const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;
  console.log(clerkPubKey);
  if (!clerkPubKey) {
    throw new Error("Missing Publishable Key");
  }

  const navigte = useNavigate();
  return (
    <>
      <ClerkProvider
        publishableKey={clerkPubKey}
        navigate={(to) => navigte(to)}
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
<<<<<<< Updated upstream
            element={<SignUp routing="path" path="/sign-up" />}
=======
            element={
              <center>
                <SignUp routing="path" path="/sign-up" />
              </center>
            }
>>>>>>> Stashed changes
          />
          <Route
            path="/"
            element={
              <>
                {/* <SignedIn> */}
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
          <Route path="/feedbacks" element={<Feedback />}></Route>
        </Routes>
      </ClerkProvider>
    </>
  );
}

export default App;
