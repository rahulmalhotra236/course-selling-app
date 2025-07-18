const { Router } = require("express")
const { userModel } = require("../db")
const jwt = require("jsonwebtoken")
const { JWT_USER_PASSWORD } = require("../config")

const userRouter = Router()

userRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body

  try {
    await userModel.create({
      email,
      password,
      firstName,
      lastName,
    })
  } catch (error) {
    res.json({
      message: "error in signup",
    })
  }

  res.json({
    message: "user created successfull",
  })
})
userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body

  const user = await userModel.findOne({
    email,
    password,
  })

  if (user) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_USER_PASSWORD
    )
    res.json({
      token: token,
    })
  } else {
    res.status(403).json({
      message: "Error in credentials",
    })
  }
})
userRouter.get("/purchases", (req, res) => {})

module.exports = { userRouter: userRouter }
