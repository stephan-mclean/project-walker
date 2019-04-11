import React from "react";
import { container } from "./ReadonlyMap.module.scss";

/**
 * This is a placeholder component which will be replaced
 * when the map implementation has been completed.
 */
const ReadonlyMap = ({ className, ...otherProps }) => (
  <div className={`${container} ${className}`} {...otherProps} />
);

export default ReadonlyMap;
