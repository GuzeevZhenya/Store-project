import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../../styles/CategoryPage.module.css";

export const CategoriesPage = () => {
  const { list } = useSelector((state) => state.categories);

  return (
    <section className={styles.categoriesPage}>
      <h2 className={styles.title}>Все категории</h2>
      <ul className={styles.menu}>
        {list.map(({ id, name }) => (
          <li key={id}>
            <NavLink
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
              to={`/categories/${id}`}
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </section>
  );
};
