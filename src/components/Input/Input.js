import React from "react";
import styles from "./Input.module.scss";

const Input = ({ label, input, meta, className, ...otherProps }) => {
  let inputClass = `${styles.input} default-coloring radius ${className || ""}`;

  const { touched, error } = meta;

  if (touched && error) {
    inputClass += ` ${styles["with-error"]}`;
  }
  return (
    <div className="margin-bottom">
      {label && <p>{label}</p>}
      <input className={inputClass} {...input} {...otherProps} />
      {touched && error && (
        <small className="margin-left text--color-danger-default">
          {error}
        </small>
      )}
    </div>
  );
};

export default Input;
