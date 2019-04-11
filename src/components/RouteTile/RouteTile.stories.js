import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";

import RouteTile from "./RouteTile";

storiesOf("Components", module).add("RouteTile", () => {
  const testTags = [
    { tag: "one", text: "one" },
    { tag: "two", text: "two" },
    { tag: "three", text: "three" },
    { tag: "four", text: "four" },
    { tag: "five", text: "five" },
    { tag: "six", text: "six" },
    { tag: "seven", text: "seven" },
    { tag: "eight", text: "eight" }
  ];
  const testPace = {
    mins: 32,
    distance: 3.2,
    distanceMetric: "km"
  };
  return (
    <Fragment>
      <RouteTile title="My Route" className="margin-top margin-bottom" />
      <RouteTile
        title="My Second Route"
        tags={testTags}
        className="margin-bottom"
      />

      <RouteTile
        title="My Third Route"
        description="Third route description"
        tags={testTags}
        pace={testPace}
        showTagText={true}
        className="margin-bottom"
      />
    </Fragment>
  );
});
