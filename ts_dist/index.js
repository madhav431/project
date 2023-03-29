"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const yamljs_1 = __importDefault(require("yamljs"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const types_1 = require("./impl/types");
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_1 = __importDefault(require("./abstract/index"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../server.env") });
const swaggerDocument = yamljs_1.default.load(path_1.default.resolve(__dirname, "../openapi.yaml"));
let impl = new types_1.apiImpl();
var options = {
    swaggerOptions: {
        url: "/api-docs/swagger.json",
    },
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.get("/api-docs/swagger.json", (req, res) => res.json(swaggerDocument));
app.use("/api-docs", swagger_ui_express_1.default.serveFiles(undefined, options), swagger_ui_express_1.default.setup(undefined, options));
(0, index_1.default)(app, impl);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`App is listing on port ${PORT}`);
});
