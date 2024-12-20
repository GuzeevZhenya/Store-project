import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../Home/Home";
import { CategoriesPage } from "../CategoriesPage/CategoriesBig";
import { ROUTES } from "../../utils/routes";
import { SingleProduct } from "../Products/SingleProduct";
import { Profile } from "../Profile/Profile";
import { SingelCategory } from "../Categories/SingelCategory";

export const AppRoutes = () => (
  <Routes>
    <Route index element={<Home />} />
    <Route path={ROUTES.CATEGORYALL} element={<CategoriesPage />} />
    <Route path={ROUTES.PRODUCT} element={<SingleProduct />} />
    <Route path={ROUTES.PROFILE} element={<Profile />} />
    <Route path={ROUTES.CATEGORY} element={<SingelCategory />} />
  </Routes>
);
