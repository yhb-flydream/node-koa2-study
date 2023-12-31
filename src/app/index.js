const path = require('path')
const Koa = require('koa')
const { koaBody } = require('koa-body')
const koaStatic = require('koa-static')
const parameter = require('koa-parameter')

const router = require('../router')
const errHandler = require('./errHandler')

const app = new Koa()

app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, '../uploads'),
      keepExtensions: true,
    },
    parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
  })
)
app.use(koaStatic(path.join(__dirname, '../uploads')))
app.use(parameter(app))
app.use(router.routes()).use(router.allowedMethods())

app.on('error', errHandler)

module.exports = app
