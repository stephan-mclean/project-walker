import React from "react";
import PropTypes from "prop-types";
import styles from "./RouteTile.module.scss";
import Card from "../Card/Card";
import InlineTagList from "../InlineTagList/InlineTagList";
import ReadonlyMap from "../ReadonlyMap/ReadonlyMap";
import PaceIndicator from "../PaceIndicator/PaceIndicator";

const RouteTile = ({
  title,
  description,
  tags,
  showTagText,
  pace,
  className,
  ...otherProps
}) => {
  return (
    <Card
      title={title}
      description={description}
      className={className}
      {...otherProps}
    >
      <InlineTagList
        className={`${styles.tags}`}
        tags={tags}
        showTagText={showTagText}
      />
      <ReadonlyMap className="margin-bottom" />
      <PaceIndicator {...pace} />
    </Card>
  );
};

RouteTile.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.array,
  showTagText: PropTypes.bool,
  pace: PropTypes.object,
  className: PropTypes.string
};

export default RouteTile;
