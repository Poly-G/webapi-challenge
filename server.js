const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const projectsRouter = require("./projects/projectsRouter");
const actionsRouter = require("./actions/actionsRouter");

const server = express();
server.use(express.json());

server.use(helmet());
server.use(morgan("dev"));

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

server.get("/", (req, res) => {
  res.send("Works");
});

module.exports = server;
