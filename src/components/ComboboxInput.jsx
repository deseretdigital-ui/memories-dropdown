import React from 'react';
import PropTypes from 'prop-types';

class ComboboxInput extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    listId: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired
  };

  focus = () => {
    this.comboboxInput.focus();
  };

  scrollIntoView = () => {
    this.comboboxInput.scrollIntoView();
  };

  render() {
    return (
      <input className="combobox__input"
             type="text"
             role="combobox"
             readOnly="true"
             tabIndex="0"
             placeholder={this.props.placeholder}
             value={this.props.value}
             name={this.props.name}
             disabled={this.props.disabled}
             aria-autocomplete="none"
             aria-readonly="true"
             aria-owns={this.props.listId}
             ref={comboboxInput => this.comboboxInput = comboboxInput}
             onClick={this.props.onClick}
             onKeyDown={this.props.onKeyDown}
      />
    )
  }
}

export default ComboboxInput;
