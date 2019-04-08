import React from "react";
import styles from "./Card.module.scss";

const Card = ({ children, title, description, fullscreen, centerTitle }) => {
  let className = `${styles.container} margin-bottom`;
  if (fullscreen) {
    className += ` ${styles.fullscreen}`;
  }

  let titleDescClassName = `${styles.titleDescContainer}`;
  if (centerTitle) {
    titleDescClassName += ` ${styles.centered}`;
  }

  return (
    <div className={className}>
      {(title || description) && (
        <div className={titleDescClassName}>
          {title && <h6>{title}</h6>}
          {description && <p>{description}</p>}
        </div>
      )}

      {children}
    </div>
  );
};

export default Card;
