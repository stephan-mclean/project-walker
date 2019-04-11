import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";

import ReadonlyMap from "./ReadonlyMap";

storiesOf("Components", module).add("ReadonlyMap", () => {
  return (
    <Fragment>
      <ReadonlyMap />
    </Fragment>
  );
});
