const { Router } = require("express")
const { adminModel, courseModel } = require("../db")
const jwt = require("jsonwebtoken")
const { JWT_ADMIN_PASSWORD } = require("../config")
const { adminMiddleware } = require("../middleware/admin")

const adminRouter = Router()

adminRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body

  try {
    await adminModel.create({
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
    message: "admin created successfull",
  })
})
adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body

  const admin = await adminModel.findOne({
    email,
    password,
  })

  if (admin) {
    const token = jwt.sign(
      {
        id: admin._id,
      },
      JWT_ADMIN_PASSWORD
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
adminRouter.post("/", adminMiddleware, async (req, res) => {
  const adminId = req.id

  const { title, description, imageUrl, price } = req.body

  const course = courseModel.create({
    title,
    description,
    imageUrl,
    price,
    creatorId: adminId,
  })

  res.json({
    message: "course create",
    courseId: course._id,
  })
})
adminRouter.put("/", (req, res) => {})
adminRouter.get("/bulk", (req, res) => {})

module.exports = { adminRouter: adminRouter }
