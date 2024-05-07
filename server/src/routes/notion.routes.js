const router = require("express").Router()
const http = require("http");

const { notionController } = require("../controllers/index.controllers.js")

router.get("/", async (request, response) => {
    response.write("inside notion")
    response.end();
})

router.get("/databaseList/:access_token", notionController.getAllDatabaseList)

router.get("/pageList/:access_token", notionController.getAllPageList)

router.post("/databases", notionController.addDatabase)

router.post("/pages", notionController.addPage)

router.post("/blocks", notionController.appendBlock)

router.post("/comments", notionController.addComments)

router.post('/template',notionController.template)

router.post('/context',notionController.saveContext)

router.get('/context/:access_token',notionController.getContext)

router.post('/createOauthToken',notionController.oauthCreateToken)

module.exports = router