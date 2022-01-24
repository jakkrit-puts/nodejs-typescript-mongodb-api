import express from "express";
import config from "config";
import log from "./logger";
import connect from "./db/connect";

import indexRoutes from "./routes/index.router";
import userRoutes from "./routes/user.router";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRoutes);
app.use("/user", userRoutes);

app.listen(port, host, () => {
  log.info(`Sever listing at http://${host}:${port}`);
  connect();
});
