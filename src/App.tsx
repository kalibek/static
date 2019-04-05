import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Menu } from './component/Menu';
import { Content } from './component/Content';
import { AppState, Article, Topic } from './model';
import { safeLoad } from 'js-yaml';
import { TagSearch } from './component/TagSearch';


class App extends Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    const title = 'Home';
    this.state = {
      article: {
        title,
        path: '',
      },
      topic: '',
      topics: [],
      mobile: false,
      showMenu: false
    };
    document.title = title;

  }

  async componentDidMount() {
    let path = window.location.pathname;
    const data = await fetch(`/contents/index.yml`).then(res => res.text());
    const topics: Topic[] = safeLoad(data).topics;
    let article: Article;
    let topic = '';
    topics.map(t => {
      t.articles.map(a => {
        if (a.path === path) {
          article = a;
          topic = t.subject;
        }
      });
    });

    this.setState((prev, props) => {
      return {
        ...prev, topics, topic, article
      }
    });

    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  onResize = () => {
    const mobile = window.innerWidth < 901;
    this.setState((prev, props) => {
      return {
        ...prev, mobile
      }
    })
  }

  setTitle = (article: Article, topic: string) => {
    this.setState((prev, props) => {
      return {
        ...prev,
        article,
        topic,
        showMenu: false
      }
    });
    document.title = article.title;
  };

  toggleMenu = () => {
    this.setState((prev, props) => {
      return { ...prev, showMenu: !prev.showMenu }
    });
  };

  render() {
    const { topic, topics } = this.state;
    const article = this.state.article || {
      title: "search",
      path: "/"
    };
    const { title } = article;
    const showMenu = !this.state.mobile || this.state.showMenu;
    return (
      <Router>
        <div className="App">
          <div className="Logo">
            <Link to="/about"><img src="https://www.gravatar.com/avatar/1a52eb773d66f8a2500f1fe19d85d004?s=32"/> Kalibek</Link>
          </div>
          <div className="Header">
            <span className="menu-toggle" onClick={this.toggleMenu}><i className="fas fa-bars"/></span>
            <small><b>{topic}</b> - {title}</small>
          </div>
          {showMenu ?
            <div className="Menu">
              <Menu onChoose={this.setTitle} article={article} topics={topics}/>
            </div> : ""}
          <div className="Content">
            <h1>{title}</h1>
            <Switch>
              <Route exact path="/" component={Content}/>
              <Route path="/tags/:tag" component={TagSearch}/>
              <Route path="/:path" component={Content}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}


export default App;
