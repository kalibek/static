import { Article, emptyArticle, getArticleByPath, getTopicByPath, Topic } from '../model';
import { Action, createStore } from 'redux';

export interface ApplicationState {
  readonly topics: Topic[];
  readonly topic: string;
  readonly article: Article;
  readonly showMenu: boolean;
  readonly mobile: boolean;
}

export const INITIAL_STATE: ApplicationState = {
  topics: [],
  article: emptyArticle('', '/'),
  topic: '',
  showMenu: true,
  mobile: false,
};

// types
export const ADD_TOPICS = 'ADD_TOPICS';
export const SET_MOBILE = 'SET_MOBILE';
export const TOGGLE_MENU = 'TOGGLE_MENU';

// actions
export interface AddTopicsAction {
  type: typeof ADD_TOPICS;
  topics: Topic[],
  path: string,
}

export interface SetMobileAction {
  type: typeof SET_MOBILE;
  mobile: boolean;
}

export interface ToggleMenuAction {
  type: typeof TOGGLE_MENU;
  showMenu: boolean;
}

// dispatch
export const addTopics = (topics: Topic[], path: string): AddTopicsAction => ({
  type: ADD_TOPICS,
  topics, path
});

export const setMobile = (mobile: boolean): SetMobileAction => ({
  type: SET_MOBILE,
  mobile
});

export const toggleMenu = (showMenu: boolean): ToggleMenuAction => ({
  type: TOGGLE_MENU,
  showMenu
});

// reducers
export const reducer = (prev: ApplicationState = INITIAL_STATE, action: Action): ApplicationState => {
  switch (action.type) {
    case ADD_TOPICS:
      const topics = (action as AddTopicsAction).topics;
      const path = (action as AddTopicsAction).path;
      const topic = getTopicByPath(path, topics);
      const article = getArticleByPath(path, topics);
      return {
        ...prev,
        topics,
        topic,
        article
      };
    case SET_MOBILE:
      const mobile = (action as SetMobileAction).mobile;
      return { ...prev, mobile };
    case TOGGLE_MENU:
      const showMenu = (action as ToggleMenuAction).showMenu;
      return { ...prev, showMenu };
  }
  return prev;
};


export const store = createStore(reducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

