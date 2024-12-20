import React, { useState } from "react";
import styles from "../../styles/User.module.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/user/userSlice";
import { userFormChanger } from "../../features/user/userSlice";

export const UserLoginForm = ({ closeForm }) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
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
    const { email, password } = values;
    const newErrors = {};
    // const isEmpty = Object.values(values).every(val=>val);
    // if(isEmpty) return;
    // Проверка на заполненность всех полей
    if (!email) {
      newErrors.email = "Email обязателен.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Введите корректный email.";
    }

    if (!password) {
      newErrors.password = "Пароль обязателен.";
    } else if (password.length < 6) {
      newErrors.password = "Пароль должен содержать не менее 6 символов.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Устанавливаем ошибки в состояние
      return;
    }

    // Если все поля заполнены и корректны
    dispatch(loginUser(values));
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
        <div className={styles.link} onClick={() => changeUserForm("signup")}>
          Create an account
        </div>
        <button type="submit" className={styles.submit}>
          Login
        </button>
      </form>
    </div>
  );
};
