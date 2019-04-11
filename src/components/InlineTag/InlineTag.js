import React from "react";
import PropTypes from "prop-types";
import styles from "./InlineTag.module.scss";
import { TAG_TYPES } from "../../constants/tag";

const InlineTag = ({ tag, className, children, ...otherProps }) => {
  const tagClass = `${
    styles.container
  } animate--width flex flex--center tag-${tag}-coloring ${className}`;

  return (
    <div className={tagClass} {...otherProps}>
      <small>{children}</small>
    </div>
  );
};

InlineTag.propTypes = {
  tag: PropTypes.oneOf(TAG_TYPES).isRequired,
  className: PropTypes.string,
  children: PropTypes.any
};

export default InlineTag;
