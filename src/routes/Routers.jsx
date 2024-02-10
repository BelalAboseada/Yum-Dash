import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import AllFoods from "../pages/AllFood";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import FoodDetails from "../pages/FoodDetails";
import Dashpord from"../pages/Dashpord";
import Forgetpass from "../pages/forgetPass";
import PageNotFound from "../pages/PageNotFound"


const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/foods" element={<AllFoods />} />
      <Route path="/foods/:id" element={<FoodDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/Dashpord" element={<Dashpord />} />
      <Route path="/ForotPassword" element={<Forgetpass />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Routers;