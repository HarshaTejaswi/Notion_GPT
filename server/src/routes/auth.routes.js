const router = require("express").Router()

const { notionController } = require("../controllers/index.controllers.js")

router.get('/:auth_code',notionController.oauthCreateToken)

module.exports = router