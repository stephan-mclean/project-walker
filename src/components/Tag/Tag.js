import React from "react";
import PropTypes from "prop-types";
import styles from "./Tag.module.scss";

const Tag = ({ tag, children, className, ...otherProps }) => {
  const tagSquareClass = `${styles.tag} tag-${tag}-coloring margin-right`;
  return (
    <div
      className={`${
        styles.container
      } flex flex--center-y high-contrast-coloring ${className}`}
      {...otherProps}
    >
      <div className={tagSquareClass} />
      {children}
    </div>
  );
};

Tag.propTypes = {
  tag: PropTypes.oneOf([
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight"
  ]).isRequired,
  children: PropTypes.any,
  className: PropTypes.string
};

export default Tag;
