import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../Home/Home";
import { CategoriesPage } from "../CategoriesPage/CategoriesBig";
import { ROUTES } from "../../utils/routes";
import { SingleProduct } from "../Products/SingleProduct";
import { Profile } from "../Profile/Profile";
import { SingelCategory } from "../Categories/SingelCategory";
import NotFound from "../Eror404/NotFoundPage"; // Импортируйте компонент NotFound
import { Cart } from "../Cart/Cart";

export const AppRoutes = () => (
  <Routes>
    <Route index element={<Home />} />
    <Route path={ROUTES.CATEGORYALL} element={<CategoriesPage />} />
    <Route path={ROUTES.PRODUCT} element={<SingleProduct />} />
    <Route path={ROUTES.PROFILE} element={<Profile />} />
    <Route path={ROUTES.CATEGORY} element={<SingelCategory />} />
    <Route path={ROUTES.NOTFOUNDPAGE} element={<NotFound />} />
    <Route path={ROUTES.CART} element={<Cart />} />

    <Route path="*" element={<NotFound />} />

    {/* Обработка несуществующих ссылок */}
  </Routes>
);
