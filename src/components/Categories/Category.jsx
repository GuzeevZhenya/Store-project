import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../features/api/apiSlice";
import styles from "../../styles/Category.module.css";
import { Products } from "../Products/Products";

export const Category = () => {
  const { id } = useParams();

  const defaultValues = useMemo(
    () => ({
      title: "",
      price_min: "",
      price_max: "",
    }),
    []
  );

  const [localParams, setLocalParams] = useState(defaultValues);
  const [params, setParams] = useState({ categoryId: id, ...defaultValues });
  const { data, isLoading, isSuccess } = useGetProductsQuery(params);

  console.log(data);

  useEffect(() => {
    if (id) {
      setParams((prev) => ({ ...prev, categoryId: id }));
      setLocalParams(defaultValues); // Сброс локальных параметров при смене категории
    }
  }, [id, defaultValues]);

  const handleApplyFilters = (e) => {
    e.preventDefault();
    setParams((prev) => ({ ...prev, ...localParams })); // Применяем фильтры
  };

  const handleResetFilters = () => {
    setLocalParams(defaultValues); // Сбрасываем локальные параметры
    setParams((prev) => ({ categoryId: id, ...defaultValues })); // Сбрасываем параметры запроса
  };

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Shoes</h2>
      <form className={styles.filters} onSubmit={handleApplyFilters}>
        <div className={styles.filter}>
          <input
            type="text"
            name="title"
            placeholder="Product name"
            onChange={(e) =>
              setLocalParams((prev) => ({ ...prev, title: e.target.value }))
            }
            value={localParams.title}
          />
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_min"
            placeholder="0"
            onChange={(e) =>
              setLocalParams((prev) => ({
                ...prev,
                price_min: e.target.value,
              }))
            }
            value={localParams.price_min}
          />
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_max"
            placeholder="100000"
            onChange={(e) =>
              setLocalParams((prev) => ({
                ...prev,
                price_max: e.target.value,
              }))
            }
            value={localParams.price_max}
          />
        </div>
        <button type="submit">Apply Filters</button>
      </form>
      {isLoading ? (
        <div className="preloader">Loading...</div>
      ) : !isSuccess || !data.length ? (
        <div className={styles.back}>
          <span>No results</span>
          <button onClick={handleResetFilters}>Reset</button>
        </div>
      ) : (
        <Products
          title=""
          products={data}
          style={{ padding: 0 }}
          amount={data.length}
        />
      )}
    </section>
  );
};
