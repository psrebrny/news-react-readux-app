import { combineReducers } from 'redux';
import articles from './articles';
import gallery from './galleries';

export default combineReducers({
  articles,
  gallery
});