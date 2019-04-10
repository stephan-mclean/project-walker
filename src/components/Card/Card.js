import React from "react";
import PropTypes from "prop-types";
import styles from "./Card.module.scss";

const Card = ({ children, title, description, centerTitle, className }) => {
  const cardClassName = `${
    styles.container
  } high-contrast-coloring margin-bottom radius ${className || ""}`;

  let titleDescClassName = `flex flex--column`;
  if (centerTitle) {
    titleDescClassName += ` flex--center-y`;
  }

  return (
    <div className={cardClassName}>
      {(title || description) && (
        <div className={titleDescClassName} data-testid="titleDescContainer">
          {title && <h6>{title}</h6>}
          {description && <p className="s2">{description}</p>}
        </div>
      )}

      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  description: PropTypes.string,
  centerTitle: PropTypes.bool,
  className: PropTypes.string
};

export default Card;
