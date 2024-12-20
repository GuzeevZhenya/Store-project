import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Profile.module.css";
import { updateUser } from "../../features/user/userSlice";

export const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(({ user }) => user);
  const [values, setValues] = useState({
    email: "",
    name: "",
    password: "",
    avatar: "",
  });
  const [errors, setErrors] = useState({}); // Состояние для ошибок

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Сбрасываем ошибку при изменении
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Простая проверка на формат email
    return re.test(String(email).toLowerCase());
  };

  useEffect(() => {
    if (!currentUser) return;
    setValues(currentUser);
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, name, password, avatar } = values;
    const newErrors = {};
    // const isEmpty = Object.values(values).every(val=>val);
    // if(isEmpty) return;
    // Проверка на заполненность всех полей
    if (!email) {
      newErrors.email = "Email обязателен.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Введите корректный email.";
    }

    if (!name) {
      newErrors.name = "Имя обязательно для заполнения.";
    }

    if (!password) {
      newErrors.password = "Пароль обязателен.";
    } else if (password.length < 6) {
      newErrors.password = "Пароль должен содержать не менее 6 символов.";
    }

    if (!avatar) {
      newErrors.avatar = "Ссылка на аватар обязательна.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Устанавливаем ошибки в состояние
      return;
    }

    // Если все поля заполнены и корректны
    dispatch(updateUser(values));
  };
  return (
    <section className={styles.profile}>
      {!currentUser ? (
        <span>You need to log in</span>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.group}>
            <input
              type="email"
              placeholder="Your email"
              name="email"
              value={values.email}
              autoComplete="off"
              onChange={handleChange}
              required
              className={errors.email ? styles.error : ""}
            />
          </div>
          <div className={styles.group}>
            <input
              type="text"
              placeholder="Your name"
              name="name"
              value={values.name}
              autoComplete="off"
              onChange={handleChange}
              required
              className={errors.name ? styles.error : ""}
            />
            {errors.name && <p className={styles.errorText}>{errors.name}</p>}
          </div>
          <div className={styles.group}>
            <input
              type="password"
              placeholder="Your password"
              name="password"
              value={values.password}
              autoComplete="off"
              onChange={handleChange}
              required
              className={errors.password ? styles.error : ""}
            />
            {errors.password && (
              <p className={styles.errorText}>{errors.password}</p>
            )}
          </div>
          <div className={styles.group}>
            <input
              type="text"
              placeholder="Your avatar"
              name="avatar"
              value={values.avatar}
              autoComplete="off"
              onChange={handleChange}
              required
              className={errors.avatar ? styles.error : ""}
            />
            {errors.avatar && (
              <p className={styles.errorText}>{errors.avatar}</p>
            )}
          </div>

          <button type="submit" className={styles.submit}>
            Update
          </button>
        </form>
      )}
    </section>
  );
};
