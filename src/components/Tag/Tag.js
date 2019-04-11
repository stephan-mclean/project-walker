import React from "react";
import PropTypes from "prop-types";
import styles from "./Tag.module.scss";
import { TAG_TYPES } from "../../constants/tag";

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
  tag: PropTypes.oneOf(TAG_TYPES).isRequired,
  children: PropTypes.any,
  className: PropTypes.string
};

export default Tag;
