import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Article, Topic } from '../model';
import { safeLoad } from 'js-yaml';
import { Link } from 'react-router-dom';

interface TagSearchRouteProps {
  tag: string;
}

interface TagSearchState {
  found: Article[]
}

export class TagSearch extends Component<RouteComponentProps<TagSearchRouteProps>, TagSearchState> {

  constructor(props: RouteComponentProps<TagSearchRouteProps>) {
    super(props);
    this.state = {
      found: []
    }
  }

  async componentDidMount() {
    const data = await fetch(`/contents/index.yml`).then(res => res.text());
    const topics: Topic[] = safeLoad(data).topics;
    topics.map(topic => {
      topic.articles.map(async article => {
        const path = article.path === '/' ? "default-page" : article.path;
        const data = await fetch(`/contents/${path}.yml`).then(res => res.text());
        let details = safeLoad(data).article;
        details.tags.map((t: string) => {
          if (t == this.props.match.params.tag) {
            this.setState((prev, props) => {
              return { ...prev, found: [...prev.found, article] }
            });
          }
        });
      });
    });
  }

  render() {
    return <div>results found for: {this.props.match.params.tag}
      <ol>
        {this.state.found.map(a => <li key={a.path}>
          <Link to={a.path}>{a.title}</Link>
        </li>)}
      </ol>
    </div>;
  }
}
