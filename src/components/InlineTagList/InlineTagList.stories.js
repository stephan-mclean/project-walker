import React from "react";
import { storiesOf } from "@storybook/react";
import { State, Store } from "@sambego/storybook-state";

import InlineTagList from "./InlineTagList";

const store = new Store({
  tags: [
    { tag: "one", text: "one" },
    { tag: "two", text: "two" },
    { tag: "three", text: "three" },
    { tag: "four", text: "four" },
    { tag: "five", text: "five" },
    { tag: "six", text: "six" },
    { tag: "seven", text: "seven" },
    { tag: "eight", text: "eight" }
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
