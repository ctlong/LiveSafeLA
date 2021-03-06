import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";

import './styles/app.scss';

const App = () => (
  <Router>
    <div className="h-100">
      <Route exact path="/" component={Landing} />
      <Route path="/dashboard" component={Dashboard} />
    </div>
  </Router>
);

export default App;
