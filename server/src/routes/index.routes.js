const router = require("express").Router()

const notionRoute = require("./notion.routes.js")
// const authRoute = require("./auth.routes.js")

router.use("/notion", notionRoute )

module.exports = router