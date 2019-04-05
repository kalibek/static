import React, { Component } from 'react';
import { Article, MenuProps } from '../model';
import { Link } from 'react-router-dom';

export class Menu extends Component <MenuProps> {

  onClick = (article: Article, topic: string) => {
    this.props.onChoose(article, topic);
  };


  render(): React.ReactNode {
    const { topics } = this.props;
    return <div>
      {topics.map(t => <div key={t.subject}>
        <h4>{t.subject}</h4>
        <ul>
          {t.articles.map(a => <li key={a.path}>
            <Link to={a.path} onClick={(e => this.onClick(a, t.subject))}>{a.title}</Link>
          </li>)}
        </ul>
      </div>)}
    </div>;
  }
}
