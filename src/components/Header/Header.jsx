import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Header.module.css";

import LOGO from "../../images/logo.svg";
import AVATAR from "../../images/avatar.jpg";
import { isInitialisiatUser, toggleForm } from "../../features/user/userSlice";
import { useGetProductsQuery } from "../../features/api/apiSlice";
import { logOutUser } from "../../features/user/userSlice";

export const Header = () => {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const { cart, favoutrite, currentUser } = useSelector((state) => state.user);


  const [values, setValues] = useState({ name: "Guest", avatar: AVATAR });
  const { data, isloading } = useGetProductsQuery({ title: searchValue });

  const navigate = useNavigate();

  const handleClick = () => {
    if (!currentUser) dispatch(toggleForm(true));
    else navigate(ROUTES.PROFILE);
  };

  const logOutHandler = () => {
    dispatch(logOutUser());
  };

  const handleSearch = ({ target: { value } }) => {
    setSearchValue(value);
  };

  useEffect(() => {
    if (currentUser) {
      setValues(currentUser);
    } else {
      setValues({ name: "Guest", avatar: AVATAR }); // Установите значения по умолчанию
    }
  }, [currentUser]);

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt="stuff" />
        </Link>
      </div>
      <div className={styles.info}>
        <div className={styles.user} onClick={handleClick}>
          <div
            className={styles.avatar}
            style={{ backgroundImage: `url(${values.avatar})` }}
          />
          <div className={styles.username}>{values.name}</div>
        </div>
        <form className={styles.form}>
          <div className={styles.icon}>
            <svg className="icon">
              <use
                xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`}
              ></use>
            </svg>
          </div>
          <div className={styles.input}>
            <input
              type="search"
              name="search"
              placeholder="Search for anything..."
              autoComplete="off"
              onChange={handleSearch}
              value={searchValue}
            />
          </div>
          {searchValue && (
            <div className={styles.box}>
              {isloading
                ? "Loading..."
                : !data.length
                ? "No results"
                : data.map(({ title, images, id }) => {
                    return (
                      <Link
                        key={id}
                        onClick={() => setSearchValue("")}
                        to={`/products/${id}`}
                        className={styles.item}
                      >
                        <div
                          className={styles.image}
                          style={{ backgroundImage: `url(${images[0]})` }}
                        />
                        <div className={styles.title}>{title}</div>
                      </Link>
                    );
                  })}
            </div>
          )}
        </form>
        <div className={styles.account}>
          <Link to={ROUTES.HOME} className={styles.favourites}>
            <svg className={styles["icon-fav"]}>
              <use
                xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`}
              ></use>
            </svg>
            <span className={styles.count}>{favoutrite.length}</span>
          </Link>
          <Link to={ROUTES.CART} className={styles.cart}>
            <svg className={styles["icon-cart"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`}></use>
            </svg>
            <span className={styles.count}>{cart.length}</span>
          </Link>
          {currentUser && <button onClick={logOutHandler}>Exit</button>}
        </div>
      </div>
    </div>
  );
};
