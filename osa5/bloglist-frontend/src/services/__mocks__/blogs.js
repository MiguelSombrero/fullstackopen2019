const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'Best blog',
    author: 'Matti Luukkainen',
    url: 'www.matti.fi',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  },
  {
    id: '4a451df7571c224a31b5c8ce',
    title: 'Worst blog',
    author: 'Miika Somero',
    url: 'www.miika.fi',
    user: {
      _id: '4a437a9e514ab7f168ddf138',
      username: 'mikki',
      name: 'Miika Somero'
    }
  },
  {
    id: '3a451df7571c224a31b5c8ce',
    title: 'First blog',
    author: 'Arto Hellas',
    url: 'www.arto.fi',
    user: {
      _id: '3a437a9e514ab7f168ddf138',
      username: 'ahellas',
      name: 'Arto Hellas'
    }
  },
]

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken }
