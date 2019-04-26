import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Article, ContentState } from '../model';
import { CodeBlock } from './CodeBlock';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';

interface Props {
  article: Article;
}


class Content extends Component<Props, ContentState> {

  constructor(props: Props) {
    super(props);
    this.state = {
      markdown: ""
    }
  }

  async componentWillReceiveProps(nextProps: Props) {
    await this.loadContent()
  }

  async componentDidMount() {
    await this.loadContent()
  }

  async loadContent() {
    const { article } = this.props;
    const markdown = await fetch(`/articles/${article.details.content}`).then(res => res.text());

    this.setState((prev, props) => {
      return {
        ...prev,
        markdown
      }
    })
  }


  render() {
    const { markdown } = this.state;
    const details = this.props.article.details;
    return <div className="markdown-body">
      <ReactMarkdown source={markdown} escapeHtml={false}
                     renderers={{
                       heading: HeadingRenderer,
                       code: CodeBlock
                     }}
      />
      <div className="author"><i>{details.author}</i> at {details.date}</div>
      <div>Tags: {details.tags.map(t => <span className="tag" key={t}>
        <a href={`/tags/${t}`}>{t}</a>
      </span>)}</div>
    </div>;
  }
}

const mapStateToProps = (state: ApplicationState): Props => ({
  article: state.article
});

export default connect(mapStateToProps)(Content);

const flatten = (text: string, child: any): string => {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text)
};

const HeadingRenderer = (props: any) => {
  const children = React.Children.toArray(props.children)
  const text = children.reduce(flatten, '');
  const slug = text.toLowerCase().replace(/\W/g, '-')
  return React.createElement('h' + props.level, { id: slug }, props.children)
};

