const express = require("express")
const { adminRouter } = require("./routes/admin")
const { courseRouter } = require("./routes/course")
const { userRouter } = require("./routes/user")

const mongoose = require("mongoose")

const app = express()
app.use(express.json())

app.use("/api/v1/user", userRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/course", courseRouter)

async function main() {
  await mongoose.connect(
    "mongodb+srv://rahulmalhotra236:Ck986y5LCQSGjTps@cluster0.jlt65zx.mongodb.net/coursera-app"
  )
  app.listen(3000, () => {
    console.log(`server is running`)
  })

  console.log("listening")
}

main()
