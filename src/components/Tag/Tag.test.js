import React from "react";
import { shallow } from "enzyme";
import Tag from "./Tag";

describe("Testing Tag component", () => {
  it("Should render the correct content", () => {
    const tag = shallow(<Tag tag="one">one</Tag>);
    expect(tag).toMatchSnapshot();
    expect(tag.text()).toEqual("one");

    const tagWithChild = shallow(
      <Tag tag="two">
        <div>Child</div>
      </Tag>
    );
    expect(tagWithChild).toMatchSnapshot();
    expect(tagWithChild.contains(<div>Child</div>)).toBeTruthy();
  });

  it("Should respond to the users click", () => {
    const onClick = jest.fn();
    const tag = shallow(
      <Tag tag="one" onClick={onClick}>
        one
      </Tag>
    );

    tag.simulate("click");

    expect(onClick).toHaveBeenCalled();
  });

  it("Should allow using a custom class", () => {
    const tag = shallow(
      <Tag tag="one" className="primary-coloring">
        Tag
      </Tag>
    );
    expect(tag.hasClass("primary-coloring")).toEqual(true);
  });

  it("Should render the correct tag square color", () => {
    const tag = shallow(<Tag tag="one">Tag</Tag>);
    expect(tag.find(".tag-one-coloring").exists()).toBeTruthy();
  });
});
