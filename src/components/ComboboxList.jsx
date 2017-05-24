import React from 'react';
import PropTypes from 'prop-types';
import ComboboxOption from './ComboboxOption'

const ComboboxList = (props) => {
  return (
    <ul
      id="UNIQUE_COMBOBOX_LIST_ID"
      className="combobox__list"
      role="listbox"
      aria-expanded={props.active}
    >
      {props.options.map((option, index) =>
        <ComboboxOption
          key={index}
          index={index}
          text={option}
          selected={props.selected}
          selectOption={props.selectOption}
        />
      )}
    </ul>
  );
};

ComboboxList.propTypes = {
  active: PropTypes.bool.isRequired,
  options: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired,
  selectOption: PropTypes.func.isRequired
};

export default ComboboxList;
