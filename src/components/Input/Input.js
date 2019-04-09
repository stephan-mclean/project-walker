import React from "react";
import styles from "./Input.module.scss";

const Input = ({ label, input, className, ...otherProps }) => {
  const inputClass = `${styles.input} default-coloring radius ${className ||
    ""}`;
  return (
    <div>
      {label && <p>{label}</p>}
      <input className={inputClass} {...input} {...otherProps} />
    </div>
  );
};

export default Input;
