import express from "express";

const homeRoute = express.Router();

homeRoute.get("/", (req, res) => res.status(200).send("Karani backend"));

export default homeRoute;
