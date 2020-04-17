const jsonServer = require('json-server')
const auth = require('json-server-auth')

const app = jsonServer.create()
const router = jsonServer.router('db.json')

app.db = router.db
console.log(auth)

// Следует использовать middleware перед самим роутером
app.use(auth)
app.use(router)
app.listen(3000)