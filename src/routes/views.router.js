import express from "express";
import { productos } from "../app.js";

const viewRouter = express.Router()

viewRouter.get("/", (req, res) => {

    res.render("home", { productos })
})

viewRouter.get("/realtimeproducts", (req, res) => {

    res.render("realtimeproducts", { productos })
})


export default viewRouter