import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../features/api/apiSlice";
import styles from "../../styles/Category.module.css";
import { Products } from "../Products/Products";
import { useSelector } from "react-redux";

export const Category = () => {
  const { id } = useParams();
  const { list } = useSelector(({ categories }) => categories);

  const defaultValues = useMemo(
    () => ({
      title: "",
      price_min: "",
      price_max: "",
    }),
    []
  );
  const defaultParams = useMemo(
    () => ({
      categoryId: id,
      limit: 5,
      offset: 0,
      ...defaultValues,
    }),
    [id, defaultValues]
  );

  const [cat, setCat] = useState(null);
  const [isEnd, setEnd] = useState(false);
  const [items, setItems] = useState([]);
  const [localParams, setLocalParams] = useState(defaultValues);
  const [params, setParams] = useState(defaultParams);
  const [error, setError] = useState(null);

  console.log(params);

  const { data, isLoading, isSuccess } = useGetProductsQuery(params, {
    skip: !id,
    onError: (error) => {
      console.error("Error fetching products:", error); // Логирование ошибки
      setError(error); // Устанавливаем ошибку
    },
  });

  useEffect(() => {
    if (!id) return;

    setItems([]);
    setEnd(false);
    setParams({
      categoryId: id,
      limit: params.limit,
      offset: 0,
      ...defaultValues,
    });
    setLocalParams(defaultValues);
  }, [id, defaultValues]);

  useEffect(() => {
    if (!id || !list.length) return;

    const category = list.find((item) => item.id === Number(id));

    if (category) {
      setCat(category.name);
    }
  }, [list, id]);

  useEffect(() => {
    if (isLoading) return;
    if (!data || !data.length) return setEnd(true);

    setItems((_items) => [..._items, ...data]);
  }, [data, isLoading]);

  const handleApplyFilters = (e) => {
    e.preventDefault();
    setItems([]);
    setEnd(false);
    setParams({ ...params, ...localParams });
  };

  const handleResetFilters = () => {
    setLocalParams(defaultValues);
    setItems([]);
    setEnd(false);
    setParams({
      categoryId: id,
      limit: 5,
      offset: 0,
      ...defaultValues,
    });
  };

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{cat?.name}</h2>
      {error && (
        <div className={styles.error}>
          Произошла ошибка: {error.message || "Неизвестная ошибка"}
        </div>
      )}
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
          <span>Price from</span>
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
          <span>Price To</span>
        </div>
        <button type="submit">Apply Filters</button>
        <button type="button" onClick={handleResetFilters}>
          Reset
        </button>
      </form>
      {isLoading ? (
        <div className="preloader">Loading...</div>
      ) : !isSuccess || !items.length ? (
        <div className={styles.back}>
          <span>No results</span>
        </div>
      ) : (
        <Products
          title=""
          products={items}
          style={{ padding: 0 }}
          amount={items.length}
        />
      )}
      <div className={styles.more}>
        {!isEnd && (
          <button
            onClick={() =>
              setParams({ ...params, offset: params.offset + params.limit })
            }
          >
            See more
          </button>
        )}
      </div>
    </section>
  );
};
