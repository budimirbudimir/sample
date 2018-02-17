// import bodyParser from "body-parser";
// import express from "express";
// import { graphqlExpress, graphiqlExpress } from "graphql-server-express";
// import schema from "./data/schema";
// import { printSchema } from "graphql/utilities/schemaPrinter";

/* eslint-disable prettier */

const bodyParser = require("body-parser");
const express = require("express");
const graphqlExpress = require("apollo-server-express").graphqlExpress;
const graphiqlExpress = require("apollo-server-express").graphiqlExpress;
const schema = require("./data/schema");
const printSchema = require("graphql/utilities/schemaPrinter").printSchema;

function setupGraphQLServer() {
  // setup server
  var graphQLServer = express()

  // /api/graphql
  graphQLServer.use(
    "/graphql",
    bodyParser.json(),
    graphqlExpress({ schema, context: {} })
  )

  // /api/graphiql
  graphQLServer
    .use("/graphiql", graphiqlExpress({ endpointURL: "/api/graphql" }))
    .bind(this)

  // /api/schema
  graphQLServer.use("/schema", (req, res) => {
    res.set("Content-Type", "text/plain");
    res.send(printSchema(schema))
  })

  return graphQLServer
}

module.exports = setupGraphQLServer;
