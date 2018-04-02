# timeline

make sure to register obsever in your index.js file

import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

const { registerObserver } = require('./../react-perf-devtool/src/npm/hook.js')


registerObserver()

render(
  <App />,
  document.getElementById('root')
);
