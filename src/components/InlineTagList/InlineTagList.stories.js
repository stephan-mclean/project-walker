import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";
import { State, Store } from "@sambego/storybook-state";

import InlineTagList from "./InlineTagList";

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
  ],
  shouldShowText: false
});

storiesOf("Components", module).add("InlineTagList", () => {
  return (
    <State store={store}>
      {state => [
        <InlineTagList
          tags={state.tags}
          showTagText={state.shouldShowText}
          onTagClick={() =>
            store.set({ shouldShowText: !state.shouldShowText })
          }
        />
      ]}
    </State>
  );
});
