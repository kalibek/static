import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Menu } from './component/Menu';
import { Content } from './component/Content';

interface App {
  articles: string[]
}

class App extends Component {



  render() {
    return (
      <Router>
        <div className="App">
          <div className="Logo">Logo</div>
          <div className="Header">Header</div>
          <Menu/>
          <Route exact path="/" component={Content}/>
          <Route path="/:path" component={Content}/>
        </div>
      </Router>
    );
  }
}

export default App;
