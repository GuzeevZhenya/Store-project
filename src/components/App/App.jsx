import React, { useEffect } from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { AppRoutes } from "../Routes/Routes";
import { SideBar } from "../SideBar/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../features/categories/categoriesSlice";
import { getProducts } from "../../features/products/productsSlice";
import { UserForm } from "../User/UserForm";
import { loginUser } from "../../features/user/userSlice";
import { isInitialisiatUser } from "../../features/user/userSlice";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isInitialisiatUser());
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <UserForm />
      <div className="container">
        <SideBar />
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
};
