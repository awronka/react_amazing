import * as ActionTypes from '../constants/constants';
import {Map, List} from "immutable";

const initialState = Map({ posts: [], post: null });

const postReducer = (state = initialState, action) => {
  console.log(state, action)
  switch (action.type) {
    case ActionTypes.ADD_POST :
      return state.set('post', state.post)
                  .set('posts',Map([{
          name: action.name,
          title: action.title,
          content: action.content,
          slug: action.slug,
          cuid: action.cuid,
          _id: action._id,
        }, ...state.posts]))

    case ActionTypes.CHANGE_SELECTED_POST :
      return state.set('post', action.slug)

    case ActionTypes.ADD_POSTS :
      return state.set('posts', action.posts)

    case ActionTypes.ADD_SELECTED_POST :
      return state.set('post', action.post)

    case ActionTypes.DELETE_POST :
        const newArray = List(state.get('posts')
                  .filter((post) => post._id !== action.post._id))
        console.log(newArray)
        state.set('posts', newArray)
        console.log(state)
        return state;

    default:
     return state;
  }
};

export default postReducer;
