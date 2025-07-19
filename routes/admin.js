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
adminRouter.post("/course", adminMiddleware, async (req, res) => {
  const adminId = req.id

  const { title, description, imageUrl, price } = req.body

  const course = await courseModel.create({
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
adminRouter.put("/", adminMiddleware, async (req, res) => {
  const adminId = req.id

  const { title, description, imageUrl, price, courseId } = req.body

  const course = await courseModel.updateOne(
    {
      _id: courseId,
      creatorId: adminId,
    },
    {
      title,
      description,
      imageUrl,
      price,
      creatorId: adminId,
    }
  )

  res.json({
    message: "course updated",
    courseId: course._id,
  })
})
adminRouter.get("/bulk", adminMiddleware, async (req, res) => {
  console.log(req.id)
  const adminId = req.userId

  const course = await courseModel.find({
    creatorId: adminId,
  })
  res.json({
    message: "here is the courses",
    courses: course,
  })
})

module.exports = { adminRouter: adminRouter }
