import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import * as mockfirebase from "./firebase/__mocks__";

jest.mock("./firebase", () => {
  return mockfirebase;
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App getCurrentUser={() => {}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
