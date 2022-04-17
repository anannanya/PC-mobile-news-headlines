import React from 'react';
import './App.css';
import PcIndex from './components/pc';
import MobileIndex from './components/mobile'
import MediaQuery from 'react-responsive';
import 'antd/dist/antd.css';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './redux';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <MediaQuery query='(min-device-width: 1224px)'>
            <PcIndex />
          </MediaQuery>
          <MediaQuery query='(max-device-width: 1224px)'>
            <MobileIndex />
          </MediaQuery>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
