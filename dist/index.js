"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config/config"));
const book_1 = __importDefault(require("./routes/book"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/books", book_1.default);
app.listen(config_1.default.port, () => console.log(`App is running at port: ${config_1.default.port}`));
// export const startServer = () => {
//   app.use(bookRoutes);
//   app.listen(config.port, () => console.log(`App is running at port: ${config.port}`));
// };
