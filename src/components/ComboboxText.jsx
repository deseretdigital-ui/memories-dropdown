import React from 'react';
import PropTypes from 'prop-types';

const ComboboxText = (props) => {
  let text = props.text || props.placeholder;
  let className = 'combobox__text';

  if (!props.text) {
    className += ' combobox__text--placeholder'
  }

  return (
    <div
      className={className}
      onClick={props.onClick}
    >
      {text}
    </div>
  );
};

ComboboxText.propTypes = {
  text: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ComboboxText;
