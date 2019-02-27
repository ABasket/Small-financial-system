import React from 'react';
import ReactDOM from 'react-dom';
import Records from './components/Records';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Records />, div);
  ReactDOM.unmountComponentAtNode(div);
});
