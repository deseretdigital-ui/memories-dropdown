import React from 'react';
import PropTypes from 'prop-types';

const ComboboxIcon = (props) => {
  return (
    <span
      onClick={props.onClick}
      className="combobox__icon"
      aria-controls="UNIQUE_COMBOBOX_LIST_ID"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-23039.002 -2736 32.15 15.852">
        <g id="down-arrow" transform="translate(-23006.852 -2736) rotate(90)">
          <g id="group">
            <g id="group-2" data-name="group">
              <path id="path" d="M0,31.034,13.4,16.075,0,1.116,1.34,0,15.852,16.075,1.34,32.15Z"/>
            </g>
          </g>
        </g>
      </svg>
    </span>
  );
};

ComboboxIcon.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ComboboxIcon;
