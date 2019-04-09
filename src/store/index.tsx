import { Article, Topic } from '../model';

export interface AppState {
  topics: Topic[];
  currentArticle: Article;
}

export const INITIAL_STATE: AppState = {
  topics: [],
  currentArticle: {
    path: "none",
    title: "none"
  }
};

export const SET_TOPICS = 'SET_TOPICS';
export const ADD_ARTICLE_DETAILS = 'ADD_ARTICLE_DETAILS';

export interface SetTopicsAction {
  type: typeof SET_TOPICS;
  topics: Topic[]
}

export function f(topics: Topic[]): SetTopicsAction {
  return {
    type: SET_TOPICS,
    topics
  }
}

