import React from "react";
import { shallow } from "enzyme";

import RouteTile from "./RouteTile";

describe("Testing the RouteTile component", () => {
  it("Should render the title and description", () => {
    const tile = shallow(<RouteTile title="title" description="description" />);

    const card = tile.find("Card");

    expect(card.prop("title")).toEqual("title");
    expect(card.prop("description")).toEqual("description");
  });

  it("Should render the tags", () => {
    const testTags = [{ tag: "one", text: "one" }];
    const tile = shallow(<RouteTile tags={testTags} showTagText={true} />);

    const renderedTags = tile.find("InlineTagList");
    expect(renderedTags.prop("tags")).toEqual(testTags);
    expect(renderedTags.prop("showTagText")).toEqual(true);
  });

  it("Should render the map", () => {
    const tile = shallow(<RouteTile />);
    const map = tile.find("ReadonlyMap");
    expect(map.exists()).toEqual(true);
  });

  it("Should render the pace info", () => {
    const pace = { mins: 32, distance: 3.2, distanceMetric: "km" };
    const tile = shallow(<RouteTile pace={pace} />);

    const paceIndicator = tile.find("PaceIndicator");
    expect(paceIndicator.prop("mins")).toEqual(pace.mins);
    expect(paceIndicator.prop("distance")).toEqual(pace.distance);
    expect(paceIndicator.prop("distanceMetric")).toEqual(pace.distanceMetric);
  });

  it("Should respond to being clicked", () => {
    const onClick = jest.fn();
    const tile = shallow(<RouteTile onClick={onClick} />);

    tile.simulate("click");
    expect(onClick).toHaveBeenCalled();
  });

  it("Should allow using a custom class", () => {
    const customClass = "someclass";
    const tile = shallow(<RouteTile className={customClass} />);
    expect(tile.hasClass(customClass)).toEqual(true);
  });
});
