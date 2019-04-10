import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";

import PaceIndicator from "./PaceIndicator";

storiesOf("Components", module).add("PaceIndicator", () => {
  return (
    <Fragment>
      <PaceIndicator
        mins={32}
        distance={3.2}
        distanceMetric="km"
        className="margin-bottom"
      />

      <PaceIndicator
        hours={1}
        mins={32}
        distance={3.2}
        distanceMetric="km"
        className="high-contrast-coloring margin-bottom"
      />
    </Fragment>
  );
});
