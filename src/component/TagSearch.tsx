import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Article, Topic } from '../model';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';

interface PathProps {
  tag: string;
}

interface Props {
  topics: Topic[]
}

interface State {
  found: Article[]
}

class TagSearch extends Component<RouteComponentProps<PathProps> & Props, State> {

  constructor(props: RouteComponentProps<PathProps> & Props) {
    super(props);
    this.state = {
      found: []
    }
  }

  async componentDidMount() {
    console.log(this.props);
    const { topics } = this.props;
    topics.map(topic => {
      topic.articles.map(async article => {
        article.details.tags.map((t: string) => {
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

const mapStateToProps = (state: ApplicationState): Props => ({
  topics: state.topics
});

export default connect(mapStateToProps)(TagSearch);