import React from 'react';
import ReactDOM from 'react-dom';
import Combobox from 'components/Combobox';

const options = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansa', 'Kentucky', 'Lousiana', 'Maine', 'Maryland'];

ReactDOM.render(
  <Combobox
      name="test"
      placeholder="States"
      options={options}
      listId="us-states"
  />,
  document.getElementById('ReactDropdownExample')
);
