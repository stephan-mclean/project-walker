import React from "react";
import styles from "./Card.module.scss";

const Card = ({
  children,
  title,
  description,
  fullscreen,
  centerTitle,
  className
}) => {
  let cardClassName = `${
    styles.container
  } high-contrast-coloring margin-bottom ${className}`;
  if (fullscreen) {
    cardClassName += ` radius-bottom`;
  } else {
    cardClassName += " radius";
  }

  let titleDescClassName = `flex flex--column`;
  if (centerTitle) {
    titleDescClassName += ` flex--center-y`;
  }

  return (
    <div className={cardClassName}>
      {(title || description) && (
        <div className={titleDescClassName}>
          {title && <h6>{title}</h6>}
          {description && <p className="s2">{description}</p>}
        </div>
      )}

      {children}
    </div>
  );
};

export default Card;
