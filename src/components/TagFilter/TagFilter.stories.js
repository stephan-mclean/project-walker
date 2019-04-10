import React from "react";
import { storiesOf } from "@storybook/react";
import { State, Store } from "@sambego/storybook-state";

import TagFilter from "./TagFilter";

const store = new Store({
  tags: [
    { tag: "one", text: "one", selected: false },
    { tag: "two", text: "two", selected: false },
    { tag: "three", text: "three", selected: false },
    { tag: "four", text: "four", selected: false },
    { tag: "five", text: "five", selected: false },
    { tag: "six", text: "six", selected: false },
    { tag: "seven", text: "seven", selected: false },
    { tag: "eight", text: "eight", selected: false }
  ]
});

storiesOf("Components", module).add("TagFilter", () => {
  return (
    <State store={store}>
      {state => [
        <TagFilter
          tags={state.tags}
          onSelectionChange={newTags => store.set({ tags: newTags })}
        />
      ]}
    </State>
  );
});
