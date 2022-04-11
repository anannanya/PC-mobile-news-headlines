import React from 'react';
import './App.css';
import PcIndex from './components/pc';
import MobileIndex from './components/mobile'
import MediaQuery from 'react-responsive';
import 'antd/dist/antd.css';
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
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
  );
}

export default App;
