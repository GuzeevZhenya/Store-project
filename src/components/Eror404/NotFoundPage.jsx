// NotFound.js
import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/NotFound.module.css"; // Импортируйте стили

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h1>404 - Page Not Found</h1>
      <p>Извините, такая страница не существует.</p>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
};

export default NotFound;
