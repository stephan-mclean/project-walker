import React from "react";
import { shallow } from "enzyme";

import InlineTagList from "./InlineTagList";

describe("Testing the InlineTagList component", () => {
  it("Should render the correct tags", () => {
    const tags = [
      { tag: "one", text: "one" },
      { tag: "one", text: "one" },
      { tag: "one", text: "one" }
    ];
    const list = shallow(<InlineTagList tags={tags} />);

    const renderedTags = list.find("InlineTag");
    expect(renderedTags).toHaveLength(3);

    const firstTag = renderedTags.first();
    expect(firstTag.prop("tag")).toEqual(tags[0].tag);
  });

  it("Should respond to a tag being clicked", () => {
    const tags = [{ tag: "one", text: "one" }];
    const onClick = jest.fn();
    const list = shallow(<InlineTagList tags={tags} onTagClick={onClick} />);

    const tag = list.find("InlineTag").first();
    tag.simulate("click");

    expect(onClick).toHaveBeenCalled();
  });

  it("Should allow rendering tags by a custom function", () => {
    const tags = [{ tag: "one", text: "one" }, { tag: "two", text: "two" }];

    const renderBy = jest.fn();

    shallow(<InlineTagList tags={tags} renderTagBy={renderBy} />);

    expect(renderBy).toHaveBeenCalledTimes(tags.length);
  });
});
