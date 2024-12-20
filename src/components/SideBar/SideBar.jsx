import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "../../styles/Sidebar.module.css";
import { useNavigate } from "react-router-dom";

export const SideBar = () => {
  const [displayedItems, setDisplayedItems] = useState(7);
  const { list } = useSelector((state) => state.categories);
  const navigate = useNavigate();

  // const loadMore = () => {
  //   setDisplayedItems((prev) => Math.min(prev + 5, list.length));
  // };

  const handleViewAll = () => {
    navigate("/categories/all"); // Переход на страницу со всеми категориями
  };

  return (
    <section className={styles.sidebar}>
      <h2 className={styles.title}>Categories</h2>
      <nav>
        <ul className={styles.menu}>
          {list.slice(0, displayedItems).map(({ id, name }) => (
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
          {/* {displayedItems < list.length && (
            <li>
              <button onClick={loadMore} className={styles.loadMoreButton}>
                Загрузить больше
              </button>
            </li>
          )} */}
        </ul>
      </nav>
      <button onClick={handleViewAll} className={styles.viewAllButton}>
        Показать все категории
      </button>
      <div className={styles.footer}>
        <a
          href="/help"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Help
        </a>
        <a
          href="/terms"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          style={{ textDecoration: "underline" }}
        >
          Terms & Conditions
        </a>
      </div>
    </section>
  );
};
