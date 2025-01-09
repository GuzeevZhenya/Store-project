import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Cart.module.css";
import { sumBy } from "../../utils/common";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../features/user/userSlice";

export const Cart = () => {
  const { cart } = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  // Подсчет общей стоимости
  const totalPrice = sumBy(cart.map((item) => item.price * item.quantity));

  //   const changeQuantity = (item, quantity) => {
  //     if (quantity <= 0) return; // Предотвращаем установку количества меньше 1
  //     dispatch(addItemToCart({ ...item, quantity }));
  //   };

  return (
    <section className={styles.cart}>
      <h2 className={styles.title}>Your cart</h2>

      {!cart.length ? (
        <div className={styles.empty}>Here is empty</div>
      ) : (
        <div className={styles.list}>
          {cart.map((item) => {
            const {
              title,
              category,
              images,
              price,
              id,
              quantity,
              selectedSize,
            } = item;

            return (
              <div className={styles.item} key={id}>
                <div
                  className={styles.image}
                  style={{ backgroundImage: `url(${images[0]})` }}
                />
                <div className={styles.info}>
                  <h3 className={styles.name}>{title}</h3>
                  <div className={styles.category}>{category.name}</div>
                  <span> sizes: {selectedSize}</span>
                </div>
                <div className={styles.price}>{price}$</div>
                <div className={styles.quantity}>
                  <div
                    className={styles.minus}
                    onClick={() => dispatch(removeItemFromCart(item))} // Уменьшение
                  >
                    <svg className="icon">
                      <use
                        xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`}
                      />
                    </svg>
                  </div>
                  <span>{quantity}</span>
                  <div
                    className={styles.plus}
                    onClick={() => dispatch(addItemToCart(item))} // Увеличение
                  >
                    <svg className="icon">
                      <use
                        xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`}
                      ></use>
                    </svg>
                  </div>
                </div>
                <div className={styles.total}>{price * quantity}$</div>
                <div className={styles.close}>
                  <svg className="icon">
                    <use
                      xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}
                    ></use>
                  </svg>
                </div>
              </div>
            );
          })}
          <div className={styles.actions}>
            <div className={styles.total}>
              Total Price: <span>{totalPrice}$</span> {/* Исправлено здесь */}
            </div>
            <button className={styles.proceed}>Proceed to checkout</button>
          </div>
        </div>
      )}
    </section>
  );
};
