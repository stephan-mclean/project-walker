import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";

import Card from "./Card";

storiesOf("Components", module).add("Card", () => {
  return (
    <Fragment>
      <Card>Base</Card>

      <Card title="title">With title</Card>

      <Card title="title" centerTitle>
        With center title
      </Card>

      <Card title="title" description="description">
        With title and description
      </Card>

      <Card fullscreen>fullscreen</Card>

      <Card className="primary-coloring">With custom class</Card>
    </Fragment>
  );
});
