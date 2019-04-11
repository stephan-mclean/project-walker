import React from "react";
import { shallow } from "enzyme";

import ReadonlyMap from "./ReadonlyMap";

describe("Testing the ReadonlyMap component", () => {
  it("Should render", () => {
    const map = shallow(<ReadonlyMap />);
    expect(map.exists()).toEqual(true);
  });
});
