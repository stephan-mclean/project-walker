import React from "react";
import { shallow } from "enzyme";

import Nav from "./Nav";

describe("Testing the Nav component", () => {
  it("Should render the default icons", () => {
    const nav = shallow(<Nav />);

    expect(nav).toMatchSnapshot();
    expect(nav.find('FontAwesomeIcon[icon="home"]').exists()).toBeTruthy();
    expect(nav.find('FontAwesomeIcon[icon="cog"]').exists()).toBeTruthy();
  });

  it("Should respond to the users clicks", () => {
    const onHomeClick = jest.fn();
    const onSettingsClick = jest.fn();

    const nav = shallow(
      <Nav onHomeClick={onHomeClick} onSettingsClick={onSettingsClick} />
    );

    const homeBtn = nav.find('FontAwesomeIcon[icon="home"]');
    homeBtn.simulate("click");
    expect(onHomeClick).toHaveBeenCalled();

    const settingsBtn = nav.find('FontAwesomeIcon[icon="cog"]');
    settingsBtn.simulate("click");
    expect(onSettingsClick).toHaveBeenCalled();
  });

  it("Should render the main button", () => {
    const nav = shallow(<Nav mainBtnIcon="someicon" />);
    expect(nav).toMatchSnapshot();
    expect(nav.find('FontAwesomeIcon[icon="someicon"]').exists()).toBeTruthy();
  });

  it("Should respond to the main button being clicked", () => {
    const onMainBtnClick = jest.fn();
    const nav = shallow(
      <Nav mainBtnIcon="someicon" onMainBtnClick={onMainBtnClick} />
    );
    const mainBtn = nav.find('FontAwesomeIcon[icon="someicon"]');

    mainBtn.simulate("click");
    expect(onMainBtnClick).toHaveBeenCalled();
  });

  it("Should allow passing a custom class", () => {
    const nav = shallow(<Nav className="some-custom-class" />);
    expect(nav).toMatchSnapshot();
    expect(nav.hasClass("some-custom-class")).toBeTruthy();
  });
});
