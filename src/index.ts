import express from "express";
import config from "./config/config";
import bookRoutes from "./routes/book";

const app = express();
app.use(express.json());

app.use("/books", bookRoutes);

app.listen(config.port, () => console.log(`App is running at port: ${config.port}`));

// export const startServer = () => {
//   app.use(bookRoutes);
//   app.listen(config.port, () => console.log(`App is running at port: ${config.port}`));
// };
