import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";

import Tag from "./Tag";

storiesOf("Components", module).add("Tag", () => {
  return (
    <Fragment>
      <Tag tag="one">one</Tag>
      <Tag tag="two">two</Tag>
      <Tag tag="three">three</Tag>
      <Tag tag="four">four</Tag>
      <Tag tag="five">five</Tag>
      <Tag tag="six">six</Tag>
      <Tag tag="seven">seven</Tag>
      <Tag tag="eight">eight</Tag>

      <Tag tag="one" className="transparent-high-contrast-coloring">
        transparent
      </Tag>
    </Fragment>
  );
});
