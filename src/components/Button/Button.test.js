import React from "react";
import { shallow } from "enzyme";
import Button from "./Button";

describe("Testing Button component", () => {
  it("Should match the snapshot", () => {
    const button = shallow(
      <Button className="btn btn--primary">Button</Button>
    );

    expect(button).toMatchSnapshot();
  });

  it("Should render the correct text", () => {
    const button = shallow(
      <Button className="btn btn--primary">My Button</Button>
    );

    expect(button.text()).toEqual("My Button");
  });

  it("Should respond to the users click", () => {
    const onClick = jest.fn();
    const button = shallow(
      <Button className="btn btn--primary" onClick={onClick}>
        My Button
      </Button>
    );

    button.simulate("click");

    expect(onClick).toHaveBeenCalled();
  });
});
