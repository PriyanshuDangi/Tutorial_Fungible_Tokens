import React from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Mint from './components/mint/Mint.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import Transfer from './components/transfer/Transfer.jsx';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact component={Mint} path="/" />
          <Route exact component={Transfer} path="/transfer" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
