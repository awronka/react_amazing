import * as ActionTypes from '../constants/constants';
import {Map, List} from "immutable";

const initialState = Map({ posts: [], post: null });

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_POST :
      const priorPosts = state.get('posts')
      const newFullState =state.set('post', state.get('post'))
                              .set('posts',[{
                      name: action.name,
                      title: action.title,
                      content: action.content,
                      slug: action.slug,
                      cuid: action.cuid,
                      _id: action._id,
                    }, ...priorPosts])
      return newFullState

    case ActionTypes.CHANGE_SELECTED_POST :
      return state.set('post', action.slug)

    case ActionTypes.ADD_POSTS :
      return state.set('posts', action.posts)

    case ActionTypes.ADD_SELECTED_POST :
      return state.set('post', action.post)

  case ActionTypes.DELETE_POST :
    const removeArray = state.get('posts')
              .filter((post) => post._id !== action.post._id)
    const newState = state.set('posts', removeArray) // assign to another variable
    return newState; // and you'll probably want to return the new state

    default:
     return state;
  }
};

export default postReducer;
