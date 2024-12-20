import React, { useState } from "react";
import styles from "../../styles/User.module.css";
import { useDispatch } from "react-redux";
import { createUser } from "../../features/user/userSlice";
import { userFormChanger } from "../../features/user/userSlice";

export const UserSignupForm = ({ closeForm }) => {
  const dispatch = useDispatch();
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
    dispatch(createUser(values));
    closeForm();
  };

  const changeUserForm = (param) => {
    dispatch(userFormChanger(param));
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>
      <div className={styles.title}>Sign Up</div>
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
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}

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
          {errors.avatar && <p className={styles.errorText}>{errors.avatar}</p>}
        </div>
        <div className={styles.link} onClick={() => changeUserForm("login")}>
          I already have an account
        </div>
        <button type="submit" className={styles.submit}>
          Create an account
        </button>
      </form>
    </div>
  );
};
