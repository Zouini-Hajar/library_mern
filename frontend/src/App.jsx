import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import { Route, Routes, useLocation } from "react-router-dom";
import { ConfigProvider } from "antd";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "./features/user/userSlice";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(fetchUser());
    }
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#86469C",
        },
      }}
    >
      {location.pathname != "/auth/signup" &&
        location.pathname != "/auth/signin" && <Header />}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth/:type" element={<Auth />} />
        </Routes>
      </div>
    </ConfigProvider>
  );
}

export default App;
