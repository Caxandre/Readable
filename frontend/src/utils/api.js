

const api = 'http://localhost:3001';

let token = localStorage.token;
if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: token,
};

// CATEGORIES
export function getAllCategories() {
  return fetch(`${api}/categories`, { headers })
    .then(res =>
      res.json());
}

// POSTS
export function getAllPosts(category = undefined) {
  if (category !== undefined)
    return fetch(`${api}/${category}/posts`, { headers })
      .then(res =>
        res.json(),
      );
  return fetch(`${api}/posts`, { headers })
    .then(res => res.json());
}

export function getPost(id) {
  return fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(data => data)
    .catch((e) => new Error(e));
}

export const addPost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers,
    body: JSON.stringify(post)
  })
    .then(res => res.json())
    .then(data => data)
    .catch((e) => new Error(e))

export const updatePost = (post) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(post)
  })
    .then(res => res.json())
    .then(data => data)
    .catch((e) => new Error(e))

export const removePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers,
  })
    .then(res => res.json())
    .then(data => data)
    .catch((e) => new Error(e))

export function vote(post, option) {
  return fetch(`${api}/posts/${post.id}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ option })
  }).then(res => res.json());
};

export const updatePostVoteScore = (voteScore) =>
  fetch(`${api}/posts/${voteScore.id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(voteScore)
  })
    .then(res => res.json())
    .then(data => data)
    .catch((e) => new Error(e))

// COMMENTS
export function getComments(id) {
  return fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res =>
      res.json(),
    );
}

export const addPostComment = (comment) =>
  fetch(`${api}/comments/`, {
    method: 'POST',
    headers,
    body: JSON.stringify(comment)
  })
    .then(res => res.json())
    .then(data => data)
    .catch((e) => new Error(e))

export const editPostComment = (comment) =>
  fetch(`${api}/comments/${comment.id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(comment)
  })
    .then(res => res.json())
    .then(data => data)
    .catch((e) => new Error(e))

export const deleteComment = (id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers,
  })
    .then(res => res.json())
    .then(data => data)
    .catch((e) => new Error(e))

export const updateCommentScore = (voteScore) =>
  fetch(`${api}/comments/${voteScore.id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(voteScore)
  })
    .then(res => res.json())
    .then(data => data)
    .catch((e) => new Error(e))