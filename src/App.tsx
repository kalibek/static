import React, { Component } from 'react';
import './App.css';
import { Article, Topic } from './model';
import { safeLoad } from 'js-yaml';
import { connect } from 'react-redux';
import { addTopics, ApplicationState, setMobile, store, toggleMenu } from './store';
import { Menu } from './component/Menu';
import Content from './component/Content';

interface Props {
  topics: Topic[]
  topic: string;
  article: Article,
  mobile: boolean,
  showMenu: boolean,
}

class App extends Component<Props, {}> {


  async componentDidMount() {
    const path = window.location.pathname;
    const data = await fetch(`/contents/index.yml`).then(res => res.text());
    const topics: Topic[] = safeLoad(data).topics;
    store.dispatch(addTopics(topics, path));
  }

  onResize = () => {
    const mobile = window.innerWidth < 901;
    store.dispatch(setMobile(mobile))
  };

  toggleMenu = () => {
    store.dispatch(toggleMenu(!this.props.showMenu));
  };

  render() {
    const { showMenu, topics, article, topic } = this.props;
    document.title = article.title;

    return (
      <div className="App">
        <div className="Logo">
          <a href="/about">
            <img src="https://www.gravatar.com/avatar/1a52eb773d66f8a2500f1fe19d85d004?s=32"/> Kalibek</a>
        </div>
        <div className="Header">
          <span className="menu-toggle" onClick={this.toggleMenu}><i className="fas fa-bars"/></span>
          <small><b>{topic}</b> - {article.title}</small>
        </div>
        {showMenu ?
          <div className="Menu">
            <Menu article={article} topics={topics}/>
          </div> : ""}
        <div className="Content">
          <Content/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState): Props => ({
  topics: state.topics,
  mobile: state.mobile,
  showMenu: state.showMenu,
  article: state.article,
  topic: state.topic,
});


export default connect(mapStateToProps)(App);
