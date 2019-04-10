import React from "react";
import { shallow } from "enzyme";
import Card from "./Card";

describe("Testing the Card component", () => {
  it("Should match the snapshot", () => {
    const card = shallow(<Card>Card</Card>);
    expect(card).toMatchSnapshot();
  });

  it("Should render the correct content", () => {
    const card = shallow(<Card>With text</Card>);
    expect(card.text()).toEqual("With text");

    const cardWithChildren = shallow(
      <Card>
        <div>Child</div>
      </Card>
    );
    expect(cardWithChildren).toMatchSnapshot();
    expect(cardWithChildren.contains(<div>Child</div>)).toEqual(true);
  });

  it("Should render the title", () => {
    const card = shallow(<Card title="title" />);
    expect(card).toMatchSnapshot();
    expect(card.text()).toEqual("title");
  });

  it("Should render the description", () => {
    const card = shallow(<Card description="description" />);
    expect(card).toMatchSnapshot();
    expect(card.text()).toEqual("description");
  });

  it("Should allow using custom classes", () => {
    const card = shallow(<Card className="primary-coloring" />);
    expect(card).toMatchSnapshot();
    expect(card.hasClass("primary-coloring")).toEqual(true);
  });

  it("Should center the title", () => {
    const card = shallow(<Card title="Centered" centerTitle />);

    expect(
      card
        .find('div[data-testid="titleDescContainer"]')
        .hasClass("flex--center-y")
    ).toBeTruthy();
  });
});
