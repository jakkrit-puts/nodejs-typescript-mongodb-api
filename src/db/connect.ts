import mongoose from "mongoose";
import config from "config";
import log from "../logger";

function connect() {
  const db_uri = config.get("db_uri") as string;

  return mongoose
    .connect(db_uri)
    .then(() => {
      log.info("Database connected");
    })
    .catch((error) => {
      log.error("db error", error);
      process.exit(1);
    });
}

export default connect;
