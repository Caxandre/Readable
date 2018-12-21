const clone = require('clone')
const posts = require('./posts')

let db = {}

const defaultData = {
  "894tuq4ut84ut8v4t8wun89g": {
    id: '894tuq4ut84ut8v4t8wun89g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1468166872634,
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  "8tu4bsun805n8un48ve89": {
    id: '8tu4bsun805n8un48ve89',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: 'Comments. Are. Cool.',
    author: 'thingone',
    voteScore: -5,
    deleted: false,
    parentDeleted: false
  },
  "jgzm7zj8rhja9gnjkeqk1d": {
    id: "jgzm7zj8rhja9gnjkeqk1d",
    parentId: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1544468144351,
    body: "Etiam rutrum faucibus orci quis condimentum. Maecenas consequat faucibus sodales. ",
    author: "Juca",
    voteScore: 0,
    deleted: false,
    parentDeleted: false
  },
  "7m9v3gq1k2q58pkclgv31v": {
    id: "7m9v3gq1k2q58pkclgv31v",
    parentId: "4g6al8m0cc3h5wxh5wn1d7",
    timestamp: 1544468226069,
    body: "Fusce venenatis pulvinar elit non ultrices. Sed eget malesuada lectus. Cras sit amet elementum purus. Mauris sed lacus volutpat, vestibulum arcu gravida, sodales urna. Sed imperdiet, mauris nec fermentum aliquet, turpis odio rhoncus neque, id interdum massa massa eu nunc.",
    author: "Marcos",
    voteScore: 0,
    deleted: false,
    parentDeleted: false
  },
  "66lhe2f2w3hlpshbbbhiv": {
    id: "66lhe2f2w3hlpshbbbhiv",
    parentId: "oaibh81yj4qjtnjha5whs",
    timestamp: 1544468289693,
    body: "Pellentesque sodales varius elit, sed mollis felis dignissim sit amet. Aenean ullamcorper elit diam, a posuere arcu eleifend vitae. Nulla commodo cursus purus in tempus. ",
    author: "Jorge",
    voteScore: 0,
    deleted: false,
    parentDeleted: false
  },
  "0puka24t1sn4arha3fwq2x": {
    id: "0puka24t1sn4arha3fwq2x",
    parentId: "cmyjkux155t96qurwacky6",
    timestamp: 1544468336909,
    body: "Nulla et arcu cursus massa tempor facilisis sit amet vitae sem. Praesent ut purus maximus, dictum turpis nec, sagittis enim.",
    author: "Luciana",
    voteScore: 0,
    deleted: false,
    parentDeleted: false
  },
  "ukmthg3ws7dw9imbebmky": {
    id: "ukmthg3ws7dw9imbebmky",
    parentId: "nevnthrr1n9yn03i4y52ts",
    timestamp: 1544468389875,
    body: "Sed imperdiet, mauris nec fermentum aliquet, turpis odio rhoncus neque, id interdum massa massa eu nunc",
    author: "Renata",
    voteScore: 0,
    deleted: false,
    parentDeleted: false
  }
}

function getData(token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByParent(token, parentId) {
  return new Promise((res) => {
    let comments = getData(token)
    let keys = Object.keys(comments)
    filtered_keys = keys.filter(key => comments[key].parentId === parentId && !comments[key].deleted)
    res(filtered_keys.map(key => comments[key]))
  })
}

function get(token, id) {
  return new Promise((res) => {
    const comments = getData(token)
    res(
      comments[id].deleted || comments[id].parentDeleted
        ? {}
        : comments[id]
    )
  })
}

function add(token, comment) {
  return new Promise((res) => {
    let comments = getData(token)

    comments[comment.id] = {
      id: comment.id,
      timestamp: comment.timestamp,
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId,
      voteScore: 1,
      deleted: false,
      parentDeleted: false
    }

    posts.incrementCommentCounter(token, comment.parentId, 1)
    res(comments[comment.id])
  })
}

function vote(token, id, option) {
  return new Promise((res) => {
    let comments = getData(token)
    comment = comments[id]
    switch (option) {
      case "upVote":
        comment.voteScore = comment.voteScore + 1
        break
      case "downVote":
        comment.voteScore = comment.voteScore - 1
        break
      default:
        console.log(`comments.vote received incorrect parameter: ${option}`)
    }
    res(comment)
  })
}

function disableByParent(token, post) {
  return new Promise((res) => {
    let comments = getData(token)
    keys = Object.keys(comments)
    filtered_keys = keys.filter(key => comments[key].parentId === post.id)
    filtered_keys.forEach(key => comments[key].parentDeleted = true)
    res(post)
  })
}

function disable(token, id) {
  return new Promise((res) => {
    let comments = getData(token)
    comments[id].deleted = true
    posts.incrementCommentCounter(token, comments[id].parentId, -1)
    res(comments[id])
  })
}

function edit(token, id, comment) {
  return new Promise((res) => {
    let comments = getData(token)
    for (prop in comment) {
      comments[id][prop] = comment[prop]
    }
    res(comments[id])
  })
}

module.exports = {
  get,
  getByParent,
  add,
  vote,
  disableByParent,
  disable,
  edit
}
