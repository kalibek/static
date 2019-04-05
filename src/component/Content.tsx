import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { safeLoad } from 'js-yaml'
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { ContentProps, ContentState } from '../model';

export class Content extends Component<RouteComponentProps<ContentProps>, ContentState> {

  constructor(props: RouteComponentProps<ContentProps>) {
    super(props);
    this.state = {
      article: {
        author: "none",
        content: "none",
        date: "none",
        tags: []
      },
      markdown: ""
    }
  }

  async componentWillReceiveProps(nextProps: RouteComponentProps<ContentProps>) {
    const path = nextProps.match.params.path || "default-page";
    await this.loadContent(path)
  }

  async componentDidMount() {
    const path = this.props.match.params.path || "default-page";
    await this.loadContent(path)
  }

  async loadContent(path: string) {
    const data = await fetch(`/contents/${path}.yml`).then(res => res.text());
    let article = safeLoad(data).article;
    const markdown = await fetch(`/articles/${article.content}`).then(res => res.text());

    this.setState((prev, props) => {
      return {
        ...prev,
        article,
        markdown
      }
    })
  }


  render() {
    const { article, markdown } = this.state;
    return <div className="markdown-body">
      <div className="author"><i>{article.author}</i> at {article.date}</div>
      <ReactMarkdown source={markdown} escapeHtml={false}/>
      <div>Tags: {article.tags.map(t => <span className="tag" key={t}>
        <Link to={`/tags/${t}`}>{t}</Link>
      </span>)}</div>
    </div>;
  }
}
