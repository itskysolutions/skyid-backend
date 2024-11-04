import express from "express";

const homeRoute = express.Router();

homeRoute.get("/", (req, res) => res.status(200).send("SKYID"));

export default homeRoute;
