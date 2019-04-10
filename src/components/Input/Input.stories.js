import React from "react";
import { storiesOf } from "@storybook/react";
import { State, Store } from "@sambego/storybook-state";

import Input from "./Input";

const store = new Store({
  inputVal: "",
  inputTwoVal: "",
  inputThreeVal: ""
});

storiesOf("Components", module).add("Input", () => {
  return (
    <State store={store}>
      {state => [
        <Input
          type="text"
          placeholder="Default"
          input={{
            value: state.inputVal,
            onChange: e => store.set({ inputVal: e.target.value })
          }}
          meta={{}}
        />,
        <Input
          type="text"
          placeholder="Standalone"
          className="shadow-fg-tertiary-1-bottom-right-25 high-contrast-coloring"
          input={{
            value: state.inputTwoVal,
            onChange: e => store.set({ inputTwoVal: e.target.value })
          }}
          meta={{}}
        />,
        <Input
          type="text"
          placeholder="Transparent Standalone"
          className="shadow-fg-tertiary-1-bottom-right-25 transparent-high-contrast-coloring"
          input={{
            value: state.inputThreeVal,
            onChange: e => store.set({ inputThreeVal: e.target.value })
          }}
          meta={{}}
        />,
        <Input
          type="text"
          placeholder="With Error"
          className="shadow-fg-tertiary-1-bottom-right-25 high-contrast-coloring"
          input={{
            value: state.inputThreeVal,
            onChange: e => store.set({ inputThreeVal: e.target.value })
          }}
          meta={{
            touched: true,
            error: "This is a required field."
          }}
        />
      ]}
    </State>
  );
});
