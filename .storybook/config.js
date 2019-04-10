import { configure } from "@storybook/react";
import "../src/index.scss";
import "../src/fontawesome/initFaIcons";

configure(() => {
  const req = require.context("../src/components", true, /.stories.js$/);
  req.keys().forEach(filename => req(filename));
}, module);
