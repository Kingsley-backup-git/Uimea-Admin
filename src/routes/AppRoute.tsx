import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import NewsPage from "../pages/news";
import NewsListingPage from "../pages/allNews";
import PrivateRoute from "../components/Routes/privateRoute";
import AdminLayout from "../components/layout/AdminLayout";
import DashboardPage from "../pages/dashboard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/add-news" element={<NewsPage />} />
            <Route path="/all-news" element={<NewsListingPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
