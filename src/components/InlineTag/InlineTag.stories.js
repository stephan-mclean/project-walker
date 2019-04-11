import React from "react";
import { storiesOf } from "@storybook/react";

import InlineTag from "./InlineTag";

storiesOf("Components", module).add("InlineTag", () => {
  return (
    <div className="flex">
      <InlineTag tag="one" className="radius-bottom-left" />
      <InlineTag tag="two" className="radius-top-right">
        Some text
      </InlineTag>
    </div>
  );
});
