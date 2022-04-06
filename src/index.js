// React
import React from 'react';
import ReactDOM from 'react-dom';
// import { createRoot } from 'react-dom/client';
// Styling
import './index.css';
import App from './App';
// Redux
import { store } from './app/store';
import { Provider } from 'react-redux';
// Router
import { HashRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// const container = document.getElementById('root');
// const root = createRoot(container);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <HashRouter>
//         <App />
//       </HashRouter>
//     </Provider>
//   </React.StrictMode>
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
