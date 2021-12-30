const express = require("express")
const bodyparser = require("body-parser")
const router = require("./routers")
const openDBConnection = require("./helpers/")

const dotenv = require("dotenv")
dotenv.config()

const app = express()
const { MONGODB_URI } = process.env
const port = process.env.PORT || 8000

const main = async () => {
  try {
    await openDBConnection(MONGODB_URI)
    
    app.use(bodyparser.json())
    app.use(bodyparser.urlencoded({ extended: false }))
    app.use(router)

    app.listen(port, () => console.log("server is listening on port", port))

  } catch (error) {
    console.log("main: error:", error);
  }
}

main()