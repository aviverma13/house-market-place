import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Explore from "./Pages/Explore";
import Offer from "./Pages/Offer";
import Profile from "./Pages/Profile";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Forgotpassword from "./Pages/Forgotpassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar";
import PrivateRoute from "./Components/PrivateRoute";
import Category from "./Pages/Category";
import CreateListing from "./Pages/CreateListing";

import Listing from "./Pages/Listing";
import Contact from "./Pages/Contact";
import EditListing from "./Pages/EditListing";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offer" element={<Offer />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Forgotpassword" element={<Forgotpassword />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/edit-listing/:listingId" element={<EditListing />} />

          <Route
            path="/category/:categoryName/:listingId"
            element={<Listing />}
          />
          <Route path="/contact/:landlordId" element={<Contact />} />
        </Routes>

        <Navbar />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
