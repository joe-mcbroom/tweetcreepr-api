import express from "express";
import router from "./router/index.js";

const app = express();

app.use("/api", router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
