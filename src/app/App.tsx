import React from 'react';
import { MainScreen } from './MainScreen';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { MonsterScreen } from './MonsterScreen';
import ScrollToTop from './ScrollToTop';
import { AppBar } from './AppBar';

function App() {
  return (
    <Router>
      <div>
        <ScrollToTop />
        <AppBar />
        <Switch>
          <Route path='/dwm2l/monster/:monster' component={MonsterScreen} />
          <Route path="/" component={MainScreen} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
