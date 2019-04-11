import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const getTextPair = (content, indicator) => {
  return (
    <span>
      <span className="text--color-secondary">{content}</span>
      <span className="text--color-tertiary">{indicator}</span>
    </span>
  );
};

const PaceIndicator = ({
  hours,
  mins,
  timeIcon,
  distance,
  distanceMetric,
  distanceIcon,
  className
}) => {
  const paceClass = `high-contrast-coloring  ${className || ""}`;

  return (
    <div className={paceClass}>
      {(hours || mins) && (
        <div
          className="margin-right--xs display--inline-block"
          data-testid="timeContainer"
        >
          <FontAwesomeIcon icon={timeIcon} /> {hours && getTextPair(hours, "h")}
          {mins && getTextPair(mins, "m")}
        </div>
      )}

      {distance && (
        <div className="display--inline-block" data-testid="distanceContainer">
          <FontAwesomeIcon icon={distanceIcon} />{" "}
          {getTextPair(distance, distanceMetric)}
        </div>
      )}
    </div>
  );
};

PaceIndicator.propTypes = {
  hours: PropTypes.number,
  mins: PropTypes.number,
  timeIcon: PropTypes.string,
  distance: PropTypes.number,
  distanceMetric: PropTypes.string,
  className: PropTypes.string
};

PaceIndicator.defaultProps = {
  timeIcon: "stopwatch",
  distanceIcon: "map-marker"
};

export default PaceIndicator;
