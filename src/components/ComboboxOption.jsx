import React from 'react';
import PropTypes from 'prop-types';
import isMobile from 'utils/isMobile'

class ComboboxOption extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    selected: PropTypes.number.isRequired,
    selectOption: PropTypes.func.isRequired
  };

  render() {
    let classNames = 'combobox__option';

    if (this.props.index === this.props.selected) {
      this.option.focus();
      classNames += ' combobox__option--selected';
    }

    let props = {
      ref: option => this.option = option,
      className: classNames,
      role: 'option',
      onClick: this.props.selectOption.bind(
        null,
        this.props.index,
        this.props.text
      )
    };

    if (!isMobile()) {
      props.tabIndex= '-1';
    }

    return (
      <li {...props}>
        {this.props.text}
      </li>
    );
  }
}

export default ComboboxOption;
