import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";

import './styles/app.css';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Landing} />
      <Route path="/dashboard" component={Dashboard} />
    </div>
  </Router>
);

export default App;
