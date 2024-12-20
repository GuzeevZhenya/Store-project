import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../features/api/apiSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { Products } from "./Products";
import { Product } from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { getRelatedProducts } from "../../features/products/productsSlice";

export const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({
    id,
  });
  const { list, related } = useSelector(({ products }) => products);

  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      navigate(ROUTES.HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching, isSuccess]);

  useEffect(() => {
    if (!data || !list.length) return;

    dispatch(getRelatedProducts(data.category.id));
  }, [data, dispatch, list.length]);

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No product found.</div>; // Добавлено условие для отсутствия данных
  }

  return (
    <>
      <Product {...data} />
      <Products products={related} amount={5} title="Related Products" />
    </>
  );
};
