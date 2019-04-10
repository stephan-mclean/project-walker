import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "../Card/Card";
import Button from "../Button/Button";
import InlineTagList from "../InlineTagList/InlineTagList";

class TagFilter extends Component {
  static propTypes = {
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        tag: PropTypes.string,
        text: PropTypes.string,
        selected: PropTypes.bool
      })
    ).isRequired,
    onSelectionChange: PropTypes.func.isRequired
  };

  toggleAll = () => {
    const { tags, onSelectionChange } = this.props;
    const selectionValue = !tags.find(tag => tag.selected);

    let newTags = [...tags];
    newTags = newTags.map(tag => {
      tag.selected = selectionValue;
      return tag;
    });

    onSelectionChange(newTags);
  };

  toggleOne = tag => {
    const { tags, onSelectionChange } = this.props;
    let newTags = [...tags];
    newTags = newTags.map(t => {
      if (t.tag === tag.tag) {
        t.selected = !t.selected;
      }

      return t;
    });

    onSelectionChange(newTags);
  };

  areAllSelected = () => {
    const { tags } = this.props;
    return !tags.find(tag => !tag.selected);
  };

  renderTags = () => {
    const { tags } = this.props;
    return (
      <InlineTagList
        tags={tags}
        renderTagBy={(tag, index) => {
          const coloringClass = tag.selected
            ? `tag-${tag.tag}-coloring`
            : `tag-${tag.tag}-inverted-coloring`;

          let radiusClass = "no-radius";
          if (index === 0) {
            radiusClass = "radius-top-left";
          } else if (index === tags.length - 1) {
            radiusClass = "radius-bottom-right";
          }
          const onTagClick = this.toggleOne.bind(this, tag);
          return (
            <Button
              className={`btn ${radiusClass} ${coloringClass}`}
              onClick={onTagClick}
              key={`tag-filter-${tag.tag}-${index}`}
              data-testid={`tag-btn-${tag.tag}`}
            >
              {tag.text}
            </Button>
          );
        }}
      />
    );
  };

  render() {
    const { tags } = this.props;
    const allBtnClass = this.areAllSelected()
      ? "btn margin-right"
      : "btn btn--inverted margin-right";
    return (
      <Card title="Tags">
        <div className="flex">
          <div>
            <Button
              className={allBtnClass}
              onClick={this.toggleAll}
              data-testid="allBtn"
            >
              All
            </Button>
          </div>

          {this.renderTags()}
        </div>
      </Card>
    );
  }
}

export default TagFilter;
