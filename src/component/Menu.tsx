import React, { Component } from 'react';
import { MenuProps } from '../model';

export class Menu extends Component <MenuProps> {

  render(): React.ReactNode {
    const { topics } = this.props;
    return <div>
      {topics.map(t => <div key={t.subject}>
        <h4>{t.subject}</h4>
        <ul>
          {t.articles.map(a => <li key={a.path}>
            <a href={a.path}>{a.title}</a>
          </li>)}
        </ul>
      </div>)}
    </div>;
  }
}
