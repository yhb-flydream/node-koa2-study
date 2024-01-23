const path = require('path')
const Koa = require('koa')
const { koaBody } = require('koa-body')
const koaStatic = require('koa-static')
const parameter = require('koa-parameter')

const operationHandler = require('./operationHandler')
const configHandler = require('./configHandler')

/* 1: use router */
// const router = require('../router')
/* 1: use router */

/* 2: use router */
const middleware2 = require('../middleware2')
const router2 = require('../router2')
/* 2: use router */

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
app.use(operationHandler(app))
app.use(configHandler(app))

/* 1: use router */
// app.use(router.routes()).use(router.allowedMethods())
/* 1: use router */

/* 2: use router */
app.use(middleware2(app))
app.use(router2(app))
/* 2: use router */

app.on('error', errHandler)

module.exports = app
