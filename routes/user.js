const { Router } = require("express")

const userRouter = Router()

userRouter.post("/sigup", (req, res) => {})
userRouter.post("/sigin", (req, res) => {})
userRouter.get("/purchases", (req, res) => {})

module.exports = { userRouter: userRouter }
