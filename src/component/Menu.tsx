import React from 'react';
import { MenuProps } from '../model';
import { Link } from 'react-router-dom';
import { setArticle, setSubject, store } from '../store';

export const Menu = (props: MenuProps) => {
  const { topics } = props;
  return <div>
    {topics.map(t => <div key={t.subject}>
      <h4>{t.subject}</h4>
      <ul>
        {t.articles.map(a => <li key={a.path}>
          <Link to={a.path} onClick={e => {
            store.dispatch(setSubject(t.subject));
            store.dispatch(setArticle(a));
          }}>{a.title}</Link>
        </li>)}
      </ul>
    </div>)}
  </div>;
}
