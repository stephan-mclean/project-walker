import React from "react";
import { shallow } from "enzyme";

import Input from "./Input";

describe("Testing the Input component", () => {
  it("Should render the correct input props", () => {
    const input = shallow(
      <Input meta={{}} type="text" label="Input" placeholder="Placeholder" />
    );

    expect(input.find("input").prop("placeholder")).toEqual("Placeholder");
    expect(input.find("input").prop("type")).toEqual("text");
  });

  it("Should render the correct error message", () => {
    const input = shallow(
      <Input
        meta={{ touched: true, error: "Error msg" }}
        label="With error"
        placeholder="With error"
      />
    );

    const errorText = input.find("small");
    expect(errorText.exists()).toBeTruthy();
    expect(errorText.text()).toEqual("Error msg");
  });

  it("Should respond to user input", () => {
    const onChange = jest.fn();
    const input = shallow(<Input meta={{}} input={{ onChange }} />);

    input.find("input").simulate("change", {
      target: {
        value: "some text"
      }
    });

    expect(onChange).toHaveBeenCalled();
  });
});
