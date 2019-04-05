export interface AppState {
  article: Article;
  topic: string;
  topics: Topic[],
  mobile: boolean
  showMenu: boolean
}

export interface Article {
  title: string;
  path: string;
}

export interface Topic {
  subject: string;
  articles: Article[]
}

export interface MenuProps {
  article: Article;
  topics: Topic[];
  onChoose: (article: Article, topic: string) => void;
}

export interface ArticleDetails {
  date: string;
  author: string;
  content: string;
  tags: string[];
}

export interface ContentProps {
  path: string;
}

export interface ContentState {
  article: ArticleDetails;
  markdown: string;
}

