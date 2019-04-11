import React from "react";
import PropTypes from "prop-types";
import styles from "./InlineTag.module.scss";

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
  tag: PropTypes.oneOf([
    // TODO: Move this duplicated code
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight"
  ]).isRequired,
  className: PropTypes.string,
  children: PropTypes.any
};

export default InlineTag;
