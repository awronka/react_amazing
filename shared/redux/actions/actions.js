import * as ActionTypes from '../constants/constants';
import Config from '../../../server/config';
import fetch from 'isomorphic-fetch';
import {Map, List} from 'immutable';

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';

export function addPost(post) {
  console.log('add posts')
  return {
    type: ActionTypes.ADD_POST,
    name: post.name,
    title: post.title,
    content: post.content,
    slug: post.slug,
    cuid: post.cuid,
    _id: post._id,
  };
}

export function changeSelectedPost(slug) {
  console.log('change selected posts')
  return {
    type: ActionTypes.CHANGE_SELECTED_POST,
    slug,
  };
}

export function addPostRequest(post) {
  console.log('add post request')
  return (dispatch) => {
    fetch(`${baseURL}/api/addPost`, {
      method: 'post',
      body: JSON.stringify({
        post: {
          name: post.name,
          title: post.title,
          content: post.content,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((res) => res.json()).then(res => dispatch(addPost(res.post)));
  };
}

export function addSelectedPost(post) {
  console.log('hit add selected posts')
  // const imPost = Map(post)
  return {
    type: ActionTypes.ADD_SELECTED_POST,
    post
  };
}

export function getPostRequest(post) {
  console.log('hit get post request')
  return (dispatch) => {
    return fetch(`${baseURL}/api/getPost?slug=${post}`, {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then((response) => response.json()).then(res => {
      return dispatch(addSelectedPost(res.post))});
  };
}

export function deletePost(post) {
  console.log('hit delete posts')
  console.log(post)
  return {
    type: ActionTypes.DELETE_POST,
    post
  };
}

export function addPosts(posts) {
  console.log('hit add Posts')
  return {
    type: ActionTypes.ADD_POSTS,
    posts
  };
}

export function fetchPosts() {
  console.log('fetch posts')
  return (dispatch) => {
    return fetch(`${baseURL}/api/getPosts`).
      then((response) => response.json()).
      then((response) => {
        return dispatch(addPosts(response.posts))
      });
  };
}

export function deletePostRequest(post) {
  console.log('delete posts request')
  return (dispatch) => {
    fetch(`${baseURL}/api/deletePost`, {
      method: 'post',
      body: JSON.stringify({
        postId: post._id,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(() => dispatch(deletePost(post)));
  };
}
