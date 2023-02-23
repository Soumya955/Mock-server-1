const express = require("express");
require("dotenv").config();

const connect = require(`./configs/db`);
const AppRouter = require(`./features/App/api.router`);

let PORT = process.env.PORT;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", AppRouter);

app.listen(PORT, async () => {
  await connect();
  console.log("db started");
  console.log(`server started on port ${PORT}`);
});
