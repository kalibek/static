import React, { Component } from 'react';
import './App.css';
import { Article, getArticleByPath, getTopicByPath, Topic } from './model';
import { safeLoad } from 'js-yaml';
import { connect } from 'react-redux';
import { addTopics, ApplicationState, setArticle, setMobile, setSubject, store, toggleMenu } from './store';
import { Menu } from './component/Menu';
import Content from './component/Content';
import { Route, Switch } from 'react-router';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import TagSearch from './component/TagSearch';

interface Props {
  topics: Topic[]
  subject: string;
  article: Article,
  mobile: boolean,
  showMenu: boolean,
}

class App extends Component<Props, {}> {


  async componentDidMount() {
    console.log("App mounted");
    const path = window.location.pathname;
    const data = await fetch(`/contents/index.yml`).then(res => res.text());
    const topics: Topic[] = safeLoad(data).topics;
    store.dispatch(addTopics(topics));

    const subject = getTopicByPath(path, topics);
    store.dispatch(setSubject(subject));

    const article = getArticleByPath(path, topics);
    store.dispatch(setArticle(article));
  }

  onResize = () => {
    const mobile = window.innerWidth < 901;
    store.dispatch(setMobile(mobile))
  };

  toggleMenu = () => {
    store.dispatch(toggleMenu(!this.props.showMenu));
  };

  render() {
    const { showMenu, topics, article, subject } = this.props;
    document.title = article.title;

    return (
      <Router>
        <div className="App">
          <div className="Logo">
            <Link to="/about">
              <img src="https://www.gravatar.com/avatar/1a52eb773d66f8a2500f1fe19d85d004?s=32"/> Kalibek</Link>
          </div>
          <div className="Header">
            <span className="menu-toggle" onClick={this.toggleMenu}><i className="fas fa-bars"/></span>
            <small><b>{subject}</b> - {article.title}</small>
          </div>
          {showMenu ?
            <div className="Menu">
              <Menu article={article} topics={topics}/>
            </div> : ""}
          <div className="Content">
            <Switch>
              <Route path="/" exact component={Content}/>
              <Route path="/tags/:tag" component={TagSearch}/>
              <Route path="/:path" component={Content}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state: ApplicationState): Props => ({
  topics: state.topics,
  mobile: state.mobile,
  showMenu: state.showMenu,
  article: state.article,
  subject: state.subject,
});


export default connect(mapStateToProps)(App);
