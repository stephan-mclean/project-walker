import React from "react";
import PropTypes from "prop-types";
import InlineTag from "../InlineTag/InlineTag";

const InlineTagList = ({
  tags,
  onTagClick,
  renderTagBy,
  showTagText,
  className
}) => {
  const inlineTagClass = `flex flex--wrap ${className}`;
  return (
    <div className={inlineTagClass}>
      {tags.map((tag, idx) => {
        const onClick = () => onTagClick(tag);

        return renderTagBy(tag, idx, onClick, showTagText, tags);
      })}
    </div>
  );
};

InlineTagList.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      tag: PropTypes.string,
      text: PropTypes.string
    })
  ),
  onTagClick: PropTypes.func,
  renderTagBy: PropTypes.func,
  showTagText: PropTypes.bool,
  className: PropTypes.string
};

InlineTagList.defaultProps = {
  renderTagBy: (tag, idx, onClick, showTagText, allTags) => {
    let className = "no-radius";

    if (idx === allTags.length - 1) {
      className = "radius-top-right";
    } else if (idx === 0) {
      className = "radius-bottom-left";
    }
    return (
      <InlineTag
        tag={tag.tag}
        key={`inline-tag-${idx}`}
        onClick={onClick}
        className={className}
      >
        {showTagText && tag.text}
      </InlineTag>
    );
  }
};

export default InlineTagList;
