import React from 'react';
import PropTypes from 'prop-types';
import ComboboxInput from './ComboboxInput'
import ComboboxIcon from './ComboboxIcon'
import ComboboxList from './ComboboxList'
import ComboboxText from './ComboboxText'

import classnames from 'classnames';
import isMobile from 'utils/isMobile'

class Combobox extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    listId: PropTypes.string.isRequired,
    tabletListHeight: PropTypes.number,
    desktopListHeight: PropTypes.number,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    onChange: PropTypes.func.isRequired
  };

  // desktop breakpoint in _breakpoints.scss
  desktopBreakpoint = 1065;
  multiKeyPressDuration = 1500;
  pageUpPageDownAmount = 7;

  state = {
    value: '',
    initValue: '',
    searchOption: '',
    initSelected: -1,
    selected: -1,
    active: false,
    upward: false,
    timeout: null
  };

  componentWillReceiveProps (nextProps) {
    let {value} = nextProps;
    let selected =  nextProps.options.indexOf(value);

    if (value && selected > -1) {
      this.props.onChange(value);
      this.setState({value, selected});
    }
  }

  componentDidMount () {
    let {value} = this.props;
    let selected =  this.props.options.indexOf(value);

    if (value && selected > -1) {
      this.setState({value, selected});
    }
  }

  getValue = () => {
    return this.state.value
  };

  getSelected = () => {
    return this.state.selected
  };

  scrollIntoView = () => {
    this.comboboxInput.scrollIntoView();
  };

  onClick = (e) => {
    if (!this.combobox.contains(e.target)) {
      this.closeDropdown();
    }
  };

  onTouch = (e) => {
    if (!this.combobox.contains(e.target)) {
      this.closeDropdown();
    }
  };

  closeDropdown = () => {
    this.removeListeners();
    this.setState({
      active: false
    });
  };

  scrollOntop = (padding) => {
    let top = this.combobox.offsetTop - padding;
    window.scroll(0, top);
  };

  shouldOpenUpward = () => {
    let upward = false;
    let padding = 15;
    let {top : spaceAbove, bottom} = this.combobox.getBoundingClientRect();
    let space = window.innerHeight - bottom;
    let listHeight = this.props.tabletListHeight;

    if (window.innerWidth >= this.desktopBreakpoint) {
      padding = 40;
      listHeight = this.props.desktopListHeight;
    }

    if (space < listHeight + padding) {
      if (spaceAbove < listHeight + padding) {
        this.scrollOntop(padding)
      } else {
        upward = true;
      }
    }

    return upward;
  };

  addListeners = () => {
    if (isMobile()) {
      window.addEventListener('touchstart', this.onTouch, true);
    } else {
      window.addEventListener('click', this.onClick, true);
    }
  };

  removeListeners = () => {
    if (isMobile()) {
      window.removeEventListener('touchstart', this.onTouch, true);
    } else {
      window.removeEventListener('click', this.onClick, true);
    }
  };

  toggleCombobox = () => {
    let initValue = '';
    let initSelected = -1;
    let upward = this.shouldOpenUpward();

    if (!isMobile()) {
      this.comboboxInput.focus();
    }

    if (!this.state.active) {
      this.addListeners();
      initValue = this.state.value;
      initSelected = this.state.selected;
    } else {
      this.removeListeners();
    }

    this.setState({
      active: !this.state.active,
      initValue,
      initSelected,
      upward
    });
  };

  selectOption = (index, text) => {
    this.setState({
      value: text,
      selected: index
    });
    this.props.onChange(text);
  };

  selectOptionAndClose = (index, text) => {
    this.selectOption(index, text);
    this.closeDropdown();
  };

  selectNextOption = () => {
    let next = this.state.selected + 1;

    if (next < this.props.options.length) {
      let value = this.props.options[next];

      this.setState({
        value,
        selected: next
      });
      this.props.onChange(value);
    }
  };

  selectPrevOption = () => {
    let prev = this.state.selected - 1;

    if (prev >= 0) {
      let value = this.props.options[prev];

      this.setState({
        value,
        selected: prev
      });
      this.props.onChange(value);
    }
  };

  selectFirstOption = () => {
    let {options} = this.props;
    let firstOptionIndex = 0;

    if (options) {
      this.selectOption(firstOptionIndex, this.props.options[firstOptionIndex]);
    }
  };

  selectLastOption = () => {
    let {options} = this.props;
    let optionsAmount = options.length;

    if (optionsAmount) {
      this.selectOption(optionsAmount - 1, this.props.options[optionsAmount - 1]);
    }
  };

  handleEscPress = () => {
    this.setState({
      value: this.state.initValue,
      selected: this.state.initSelected,
      initValue: '',
      initSelected: -1
    });

    this.closeDropdown();
    this.props.onChange(this.state.initValue);
  };

  handlePageUpPress = () => {
    let {selected} = this.state;
    let pageUp = selected - this.pageUpPageDownAmount;

    if (pageUp > -1) {
      this.selectOption(pageUp, this.props.options[pageUp]);
    } else {
      this.selectFirstOption();
    }
  };

  handlePageDownPress = () => {
    let {options} = this.props;
    let {selected} = this.state;
    let pageDown = selected + this.pageUpPageDownAmount;

    if (pageDown < options.length) {
      this.selectOption(pageDown, options[pageDown]);
    } else {
      this.selectLastOption();
    }
  };

  clearTimeout = () => {
    clearTimeout(this.state.timeout);
    this.setState({
      timeout: null,
      searchOption: ''
    })

  };

  /** This function splits options` array by index of selected option
   * and joins the first part of options to the second part.
   * If one of options starts from searchOption string it
   * selects that option from initial option array.
   * If not found doing nothing.
   * This gives ability to find option starting from selected option.
   *
   * @param {string} searchOption
   */
  selectNextByStr = (searchOption) => {
    let {selected} = this.state;
    let options = this.props.options.slice(0);
    let optionsEnd = options.splice(selected + 1);
    let optionsEndAmount = optionsEnd.length;
    let optionsStartAmount = options.length;

    options = optionsEnd.concat(options);

    let optionIndex = options.findIndex(item => item.toLowerCase().startsWith(searchOption));

    if (optionIndex > -1) {
      if (optionIndex >= optionsEndAmount) {
        optionIndex -= optionsEndAmount;
      } else {
        optionIndex += optionsStartAmount;
      }

      this.selectOption(optionIndex, this.props.options[optionIndex]);

      clearTimeout(this.state.timeout);
      this.setState({
        searchOption,
        timeout: setTimeout(this.clearTimeout, this.multiKeyPressDuration)
      });
    }
  };

  /** Going from start to end in options array selects
   * first option if it starts from searchOption string.
   * If not found doing nothing.
   *
   * @param {string} searchOption
   */
  selectByStr = (searchOption) => {
    let {options} = this.props;
    let optionIndex = options.findIndex(item => item.toLowerCase().startsWith(searchOption));

    if (optionIndex > -1) {
      this.selectOption(optionIndex, options[optionIndex]);

      clearTimeout(this.state.timeout);
      this.setState({
        searchOption,
        timeout: setTimeout(this.clearTimeout, this.multiKeyPressDuration)
      });
    }
  };

  handleKeyDown = (e) => {
    let key = e.key.toLowerCase();
    let {searchOption, selected, value} = this.state;

    if (selected > -1) {
      if (!searchOption || searchOption === key) {
        this.selectNextByStr(key);
      } else {
        searchOption += key;

        if (value.toLowerCase().startsWith(searchOption)) {
          clearTimeout(this.state.timeout);
          this.setState({
            searchOption,
            timeout: setTimeout(this.clearTimeout, this.multiKeyPressDuration)
          });
        } else {
          this.selectNextByStr(searchOption);
        }
      }
    } else {
      this.selectByStr(key);
    }
  };

  onKeyDown = (e) => {
    switch (e.key) {
      case 'Enter':
        this.toggleCombobox();
        e.preventDefault();
        break;

      case 'Escape':
        this.handleEscPress();
        break;

      case 'Tab':
        this.closeDropdown();
        break;

      case 'ArrowDown':
        this.selectNextOption();
        e.preventDefault();
        break;

      case 'ArrowUp':
        this.selectPrevOption();
        e.preventDefault();
        break;

      case 'Home':
        this.selectFirstOption();
        e.preventDefault();
        break;

      case 'End':
        this.selectLastOption();
        e.preventDefault();
        break;

      case 'PageUp':
        this.handlePageUpPress();
        e.preventDefault();
        break;

      case 'PageDown':
        this.handlePageDownPress();
        e.preventDefault();
        break;

      default:
        this.handleKeyDown(e);
        return true;
    }
  };

  render() {
    let {active, upward} = this.state;

    if (this.props.disabled) {
      active = false;
    }

    let comboboxClasses = classnames({
      'combobox':            true,
      'combobox--active':    active,
      'combobox--upward':    upward,
      'combobox--error':     this.props.error,
      'combobox--disabled':  this.props.disabled
    });

    return  (
      <div
        className={comboboxClasses}
        ref={combobox => this.combobox = combobox}
      >
        <ComboboxInput
          ref={comboboxInput => this.comboboxInput = comboboxInput}
          value={this.state.value}
          name={this.props.name}
          placeholder={this.props.placeholder}
          listId={this.props.listId}
          disabled={this.props.disabled}
          onClick={this.toggleCombobox}
          onKeyDown={this.onKeyDown}
        />
        <ComboboxIcon
          onClick={this.toggleCombobox}
        />
        <ComboboxList
          active={active}
          options={this.props.options}
          selected={this.state.selected}
          selectOption={this.selectOptionAndClose}
        />
        <ComboboxText
          text={this.state.value}
          placeholder={this.props.placeholder}
          onClick={this.toggleCombobox}
        />
      </div>
    )
  }
}

Combobox.defaultProps = {
  // .combobox__list height in _forms.scss
  tabletListHeight: 220,
  desktopListHeight: 274,
  disabled: false,
  error: false,
  onChange: () => {}
};

export default Combobox;
