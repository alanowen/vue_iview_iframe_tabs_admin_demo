const jsonServer = require('json-server')

const data = require('./db')

const server = jsonServer.create()
// const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

// server.use(router)
server.use(jsonServer.bodyParser)

server.post('/auth/login', (req, res) => {
    if (req.method === 'POST') {
        res.jsonp(data.loginUser)
    }
})

server.get('/sys/menu/tree', (req, res) => {
    res.jsonp(data.menuTree)
})

server.get('/sys/menu/list', (req, res) => {
    res.jsonp(data.menuList)
})

server.get('/sys/priv/list', (req, res) => {
    res.jsonp([])
})

server.listen(5000, () => {
    console.log('JSON Server is running')
})