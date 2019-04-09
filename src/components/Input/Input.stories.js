import React from "react";
import { storiesOf } from "@storybook/react";
import { State, Store } from "@sambego/storybook-state";

import Input from "./Input";

const store = new Store({
  inputVal: ""
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
        />
      ]}
    </State>
  );
});
