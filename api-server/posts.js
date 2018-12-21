const clone = require('clone')

let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false,
    commentCount: 2
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false,
    commentCount: 1
  },
  "4g6al8m0cc3h5wxh5wn1d7": {
    id: "4g6al8m0cc3h5wxh5wn1d7",
    timestamp: 1544466225231,
    title: "title",
    body: "post",
    author: "author",
    category: "redux",
    voteScore: 3,
    deleted: false,
    commentCount: 1
  },
  "oaibh81yj4qjtnjha5whs": {
    id: "oaibh81yj4qjtnjha5whs",
    timestamp: 1544467223810,
    title: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus velit diam, aliquet non mauris vel, gravida accumsan quam. Fusce pharetra, dolor nec vulputate pellentesque, lacus orci auctor lectus, a ornare leo leo id mi. Nunc aliquet felis eu lorem dictum eleifend. Curabitur id iaculis magna. Praesent luctus dictum nunc a pulvinar. Nam elementum turpis eget imperdiet sollicitudin. Duis dapibus, est eu gravida consectetur, arcu lorem cursus erat, sit amet sagittis nisi lectus et lacus. Aenean sodales ex ac consectetur euismod. Vivamus volutpat fringilla ultrices. Nulla id ex in augue ultrices interdum at eu purus. Proin augue mauris, laoreet in efficitur vitae, volutpat in nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam erat volutpat. Nunc quis sollicitudin ex. Fusce libero leo, interdum ut ipsum vel, varius ullamcorper ante. Etiam accumsan vitae mauris eget pulvinar. Mauris lacinia vel elit eget commodo. Suspendisse potenti. Integer gravida mattis ligula ornare dictum. Pellentesque molestie neque ut quam tristique finibus. Vivamus arcu tellus, maximus at luctus ut, feugiat sodales tellus.",
    author: "CARLOS",
    category: "udacity",
    voteScore: 1,
    deleted: false,
    commentCount: 1
  },
  "cmyjkux155t96qurwacky6": {
    id: "cmyjkux155t96qurwacky6",
    timestamp: 1544467271313,
    title: "Pellentesque sodales varius elit, sed mollis felis dignissim sit amet.",
    body: "Fusce venenatis pulvinar elit non ultrices. Sed eget malesuada lectus. Cras sit amet elementum purus. Mauris sed lacus volutpat, vestibulum arcu gravida, sodales urna. Sed imperdiet, mauris nec fermentum aliquet, turpis odio rhoncus neque, id interdum massa massa eu nunc. Proin tincidunt hendrerit eros, laoreet malesuada velit sollicitudin id. Phasellus mauris est, venenatis in leo id, convallis gravida ante.↵↵In id pretium urna. Sed auctor arcu ac mi lobortis sollicitudin. Maecenas pellentesque magna arcu. Sed ac eleifend turpis. Sed ut lectus aliquet, molestie urna euismod, congue lorem. Etiam rutrum faucibus orci quis condimentum. Maecenas consequat faucibus sodales. Vestibulum quis condimentum magna, iaculis eleifend lacus. Integer convallis tellus quis nisl dignissim consequat. Nullam varius, ipsum vitae fermentum fringilla, tellus mauris tincidunt augue, sed faucibus mi est vitae quam. Sed dictum, turpis in sollicitudin aliquet, velit augue interdum mi, eget rhoncus ligula nunc vitae nisi. Vestibulum ultricies lacus eget felis consequat, in convallis urna consequat.",
    author: "Juca",
    category: "react",
    voteScore: 1,
    deleted: false,
    commentCount: 1

  },
  "nevnthrr1n9yn03i4y52ts": {
    id: "nevnthrr1n9yn03i4y52ts",
    timestamp: 1544467320376,
    title: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    body: "Pellentesque sodales varius elit, sed mollis felis dignissim sit amet. Aenean ullamcorper elit diam, a posuere arcu eleifend vitae. Nulla commodo cursus purus in tempus. Nunc vitae tellus ante. Nullam nec sem bibendum, bibendum nisi ut, sollicitudin lectus. Duis at nisl tempor felis lobortis accumsan eu quis lacus. Nulla et arcu cursus massa tempor facilisis sit amet vitae sem. Praesent ut purus maximus, dictum turpis nec, sagittis enim.↵↵Fusce venenatis pulvinar elit non ultrices. Sed eget malesuada lectus. Cras sit amet elementum purus. Mauris sed lacus volutpat, vestibulum arcu gravida, sodales urna. Sed imperdiet, mauris nec fermentum aliquet, turpis odio rhoncus neque, id interdum massa massa eu nunc. Proin tincidunt hendrerit eros, laoreet malesuada velit sollicitudin id. Phasellus mauris est, venenatis in leo id, convallis gravida ante.",
    author: "CARLOS",
    category: "udacity",
    voteScore: 1,
    deleted: false,
    commentCount: 1
  }
}

function getData(token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory(token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get(token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll(token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add(token, post) {
  return new Promise((res) => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false,
      commentCount: 0
    }

    res(posts[post.id])
  })
}

function vote(token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch (option) {
      case "upVote":
        post.voteScore = post.voteScore + 1
        break
      case "downVote":
        post.voteScore = post.voteScore - 1
        break
      default:
        console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable(token, id) {
  return new Promise((res) => {
    let posts = getData(token)
    posts[id].deleted = true
    res(posts[id])
  })
}

function edit(token, id, post) {
  return new Promise((res) => {
    let posts = getData(token)
    for (prop in post) {
      posts[id][prop] = post[prop]
    }
    res(posts[id])
  })
}

function incrementCommentCounter(token, id, count) {
  const data = getData(token)
  if (data[id]) {
    data[id].commentCount += count
  }
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll,
  incrementCommentCounter
}
