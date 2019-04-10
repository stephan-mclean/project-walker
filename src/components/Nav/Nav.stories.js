import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";

import Nav from "./Nav";

storiesOf("Components", module).add("Nav", () => {
  return (
    <Fragment>
      <Nav className="margin-top margin-bottom" />
      <Nav mainBtnIcon="plus-square" />
    </Fragment>
  );
});
