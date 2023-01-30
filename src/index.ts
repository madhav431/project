import express from "express"
import dotenv from "dotenv"
import YAML from "yamljs"
import swaggerUi from "swagger-ui-express"
import { apiImpl } from "./impl/types"
import path from "path"
import bodyParser from "body-parser"
import userService from "../dist/index"
dotenv.config({ path: path.resolve(__dirname, "../server.env") })
const swaggerDocument = YAML.load(path.resolve(__dirname, "../openapi.yaml"))
let impl = new apiImpl()
var options = {
  swaggerOptions: {
    url: "/api-docs/swagger.json",
  },
}
const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.get("/api-docs/swagger.json", (req, res) => res.json(swaggerDocument))
app.use(
  "/api-docs",
  swaggerUi.serveFiles(undefined, options),
  swaggerUi.setup(undefined, options)
)
userService(app, impl)
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`App is listing on port ${PORT}`)
})
