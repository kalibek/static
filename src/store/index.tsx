import { Article, emptyArticle, Topic } from '../model';
import { Action, createStore } from 'redux';

export interface ApplicationState {
  readonly topics: Topic[];
  readonly subject: string;
  readonly article: Article;
  readonly showMenu: boolean;
  readonly mobile: boolean;
}

export const INITIAL_STATE: ApplicationState = {
  topics: [],
  article: emptyArticle('', '/'),
  subject: '',
  showMenu: true,
  mobile: false,
};

// types
const ADD_TOPICS = 'ADD_TOPICS';
const SET_MOBILE = 'SET_MOBILE';
const TOGGLE_MENU = 'TOGGLE_MENU';
const SET_ARTICLE = 'SET_ARTICLE';
const SET_SUBJECT = 'SET_SUBJECT';

// actions
export interface AddTopicsAction {
  type: typeof ADD_TOPICS;
  topics: Topic[],
}

export interface SetMobileAction {
  type: typeof SET_MOBILE;
  mobile: boolean;
}

export interface ToggleMenuAction {
  type: typeof TOGGLE_MENU;
  showMenu: boolean;
}

export interface SetArticleAction {
  type: typeof SET_ARTICLE;
  article: Article;
}

export interface SetSubjectAction {
  type: typeof SET_SUBJECT;
  subject: string
}

// dispatch
export const addTopics = (topics: Topic[]): AddTopicsAction => ({
  type: ADD_TOPICS,
  topics
});

export const setMobile = (mobile: boolean): SetMobileAction => ({
  type: SET_MOBILE,
  mobile
});

export const toggleMenu = (showMenu: boolean): ToggleMenuAction => ({
  type: TOGGLE_MENU,
  showMenu
});

export const setArticle = (article: Article): SetArticleAction => ({
  type: SET_ARTICLE,
  article
});

export const setSubject = (subject: string): SetSubjectAction => ({
  type: SET_SUBJECT,
  subject
});

// reducers
export const reducer = (prev: ApplicationState = INITIAL_STATE, action: Action): ApplicationState => {
  switch (action.type) {
    case ADD_TOPICS:
      const topics = (action as AddTopicsAction).topics;
      return { ...prev, topics, };
    case SET_MOBILE:
      const mobile = (action as SetMobileAction).mobile;
      return { ...prev, mobile };
    case TOGGLE_MENU:
      const showMenu = (action as ToggleMenuAction).showMenu;
      return { ...prev, showMenu };
    case SET_ARTICLE:
      const article = (action as SetArticleAction).article;
      return { ...prev, article };
    case SET_SUBJECT:
      const subject = (action as SetSubjectAction).subject;
      return {...prev, subject};
  }
  return prev;
};


export const store = createStore(reducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

