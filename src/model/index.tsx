export interface AppComponentState {
  article: Article;
  topic: string;
  mobile: boolean
  showMenu: boolean
}

export interface AppProps {
  topics: Topic[];
  title: string;
}

export interface Article {
  title: string;
  path: string;
  details: ArticleDetails
}

export interface Topic {
  subject: string;
  articles: Article[]
}

export interface MenuProps {
  article: Article;
  topics: Topic[];
}

export interface ArticleDetails {
  date: string;
  author: string;
  content: string;
  tags: string[];
}

export interface ContentProps {
  path: string,
}

export interface ContentState {
  markdown: string;
}

export const getTopicByPath = (path: string, topics: Topic[]): string => {
  const topic = topics.find(t => {
    let find = t.articles.find(a => a.path == path);
    return typeof find !== 'undefined';
  });
  return topic == null ? "-=Home=-" : topic.subject;
};

export const getArticleByPath = (path: string, topics: Topic[]): Article => {
  for (let i = 0; i < topics.length; i++) {
    let find = topics[i].articles.find(a => a.path == path);
    if (typeof find !== 'undefined') {
      return find;
    }
  }
  return emptyArticle("Not found", "/");
};

export const emptyArticle = (title: string, path: string): Article => ({
  title, path,
  details: {
    content: '',
    author: '',
    date: '',
    tags: []
  }
})
