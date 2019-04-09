import React from "react";
import { mount } from "enzyme";
import TagFilter from "./TagFilter";

const emptyFn = jest.fn();

describe("Testing the TagFilter component", () => {
  it("Should render the correct buttons", () => {
    const testTags = [{ tag: "one", text: "one", selected: false }];

    const filter = mount(
      <TagFilter tags={testTags} onSelectionChange={emptyFn} />
    );

    expect(filter).toMatchSnapshot();

    const allBtn = filter.find('button[data-testid="allBtn"]');
    expect(allBtn.exists()).toBeTruthy();
    expect(allBtn.text()).toEqual("All");

    const tagBtn = filter.find('button[data-testid="tag-btn-one"]');
    expect(tagBtn.exists()).toBeTruthy();
    expect(tagBtn.text()).toEqual("one");
  });

  it("Should toggle all selection values", () => {
    const unselectedTags = [
      { tag: "one", text: "one", selected: false },
      { tag: "two", text: "two", selected: false }
    ];
    const selectedTags = [
      { tag: "one", text: "one", selected: true },
      { tag: "two", text: "two", selected: true }
    ];

    const filter = mount(
      <TagFilter tags={unselectedTags} onSelectionChange={emptyFn} />
    );

    expect(filter).toMatchSnapshot();

    const allBtn = filter.find('button[data-testid="allBtn"]');
    allBtn.simulate("click");
    expect(emptyFn).toHaveBeenCalledWith(selectedTags);
    expect(filter).toMatchSnapshot();

    allBtn.simulate("click");
    expect(emptyFn).toHaveBeenCalledWith(unselectedTags);
  });

  it("Should toggle individual selection values", () => {
    const unselectedTags = [
      { tag: "one", text: "one", selected: false },
      { tag: "two", text: "two", selected: false }
    ];

    const oneSelected = [
      { tag: "one", text: "one", selected: true },
      { tag: "two", text: "two", selected: false }
    ];

    const bothSelected = [
      { tag: "one", text: "one", selected: true },
      { tag: "two", text: "two", selected: true }
    ];

    const filter = mount(
      <TagFilter tags={unselectedTags} onSelectionChange={emptyFn} />
    );

    const tagOneBtn = filter.find('button[data-testid="tag-btn-one"]');
    tagOneBtn.simulate("click");

    expect(emptyFn).toHaveBeenCalledWith(oneSelected);

    const tagTwoBtn = filter.find('button[data-testid="tag-btn-two"]');
    tagTwoBtn.simulate("click");

    expect(emptyFn).toHaveBeenCalledWith(bothSelected);
  });

  it("Should know if all tags are selected", () => {
    const testTags = [{ tag: "one", text: "one", selected: false }];

    const filter = mount(
      <TagFilter tags={testTags} onSelectionChange={emptyFn} />
    );

    const instance = filter.instance();
    expect(instance.areAllSelected()).toBeFalsy();

    const allSelectedTestTags = [{ tag: "one", text: "one", selected: true }];

    const selectedFilter = mount(
      <TagFilter tags={allSelectedTestTags} onSelectionChange={emptyFn} />
    );

    const selectedInstance = selectedFilter.instance();
    expect(selectedInstance.areAllSelected()).toBeTruthy();
  });
});
