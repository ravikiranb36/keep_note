import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import PageNotFound from './components/not_found';
import Home from './components/Home/Home';


function App() {
  return (
    <div className="app" style={{backgroundColor:'#f7e6d2'}}>
      <Router>
        <div className="container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;