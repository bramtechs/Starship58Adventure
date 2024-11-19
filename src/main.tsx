import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { Game } from './Game';
import { UI } from './UI';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <Game />
  </>
);
