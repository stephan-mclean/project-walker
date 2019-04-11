import React from "react";
import { shallow } from "enzyme";

import InlineTag from "./InlineTag";

describe("Testing the InlingTag component", () => {
  it("Should render the correct content", () => {
    const tag = shallow(<InlineTag tag="one">One</InlineTag>);
    expect(tag).toMatchSnapshot();

    expect(tag.text()).toEqual("One");
  });

  it("Should render the correct color class", () => {
    const tagOne = shallow(<InlineTag tag="one" />);
    const tagTwo = shallow(<InlineTag tag="two" />);

    expect(tagOne).toMatchSnapshot();
    expect(tagTwo).toMatchSnapshot();

    expect(tagOne.hasClass("tag-one-coloring")).toEqual(true);
    expect(tagTwo.hasClass("tag-two-coloring")).toEqual(true);
  });

  it("Should allow passing a custom class", () => {
    const tag = shallow(<InlineTag tag="one" className="some-class" />);
    expect(tag).toMatchSnapshot();
    expect(tag.hasClass("some-class")).toEqual(true);
  });
});
