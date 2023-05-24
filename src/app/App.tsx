import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ExpensesList from './components/ExpensesList';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:year/:month" component={ExpensesList} />
        <Route path="/" component={ExpensesList} exact />
      </Switch>
    </Router>
  );
}

export default App;
