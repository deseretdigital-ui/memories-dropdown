# theMemories Dropdown

This is for theMemories dropdown.
It was implemented with ARIA attributes for better accessibility.
Information about [ARIA combobox](https://rawgit.com/w3c/aria-practices/master/aria-practices-DeletedSectionsArchive.html#combobox).

# Props

* name - Name attr for input
* placeholder - Placeholder text for dropdown
* options - Array of options
* listId - Unique list id for aria-owns attribute.
* tabletListHeight - List height for tablet view.
* desktopListHeight: List height for desktop view.
* value - If value is set it will be selected on component did mount.
* disabled - Property for dropdown disabling.
* error - Error message to show below dropdown.
* onChange - Function to call when option was selected.

# Styles

A basic stylesheet is included for you in dist/styles.css or scss/styles.scss. This is optional. If you wish customize it and use different styles, copy the scss to your own projects directory and change as needed.

# Simple Example

```jsx
ReactDOM.render(
  <Combobox
      name="test"
      placeholder="States"
      options={options}
      listId="us-states"
  />,
  document.getElementById('ReactDropdownExample')
);
```