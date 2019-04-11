import React from "react";
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
      {pace && <PaceIndicator {...pace} />}
    </Card>
  );
};

export default RouteTile;
