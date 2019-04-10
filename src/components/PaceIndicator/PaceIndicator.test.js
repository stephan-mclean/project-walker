import React from "react";
import { shallow } from "enzyme";

import PaceIndicator from "./PaceIndicator";

describe("Testing the PaceIndicator component", () => {
  it("Should render the time", () => {
    const indicator = shallow(<PaceIndicator hours={1} mins={32} />);

    expect(indicator).toMatchSnapshot();

    const timeContainer = indicator.find('div[data-testid="timeContainer"]');
    expect(timeContainer.exists()).toBeTruthy();

    expect(
      timeContainer
        .find("span")
        .first()
        .text()
    ).toEqual("1h");

    expect(
      timeContainer
        .find("span")
        .at(3)
        .text()
    ).toEqual("32m");
  });

  it("Should render the correct time icon", () => {
    const indicator = shallow(<PaceIndicator mins={32} timeIcon="someicon" />);

    expect(indicator).toMatchSnapshot();

    const timeContainer = indicator.find('div[data-testid="timeContainer"]');

    const icon = timeContainer.find("FontAwesomeIcon");
    expect(icon.prop("icon")).toEqual("someicon");
  });

  it("Should render the distance", () => {
    const indicator = shallow(
      <PaceIndicator distance={3.2} distanceMetric="km" />
    );

    expect(indicator).toMatchSnapshot();

    const distanceContainer = indicator.find(
      'div[data-testid="distanceContainer"]'
    );

    expect(
      distanceContainer
        .find("span")
        .first()
        .text()
    ).toEqual("3.2km");

    expect(distanceContainer.exists()).toBeTruthy();
  });

  it("Should render the correct distance icon", () => {
    const indicator = shallow(
      <PaceIndicator distance={3.2} distanceIcon="someicon" />
    );

    expect(indicator).toMatchSnapshot();

    const distanceContainer = indicator.find(
      'div[data-testid="distanceContainer"]'
    );

    const icon = distanceContainer.find("FontAwesomeIcon");
    expect(icon.prop("icon")).toEqual("someicon");
  });

  it("Should allow passing a custom class", () => {
    const indicator = shallow(
      <PaceIndicator mins={32} className="high-contrast-coloring" />
    );

    expect(indicator).toMatchSnapshot();

    expect(indicator.hasClass("high-contrast-coloring")).toBeTruthy();
  });
});
