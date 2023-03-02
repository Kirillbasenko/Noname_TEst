import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import Auth from "./pages/Auth";
import MainPage from "./pages/MainPage";
import PersonalPage from "./pages/PersonalPage";
import ProductsPage from "./pages/ProductsPage";
import SingleProductPage from "./pages/SingleProductPage";

const App = () => {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="auth" element={<Auth/>}/>
        <Route path="products" element={<ProductsPage/>}/>
        <Route path="products/:productId" element={<SingleProductPage/>}/>
        <Route path="personal" element={<PersonalPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
