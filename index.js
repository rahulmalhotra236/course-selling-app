const express = require("express")
const { adminRouter } = require("./routes/admin")
const { courseRouter } = require("./routes/course")
const { userRouter } = require("./routes/user")

const app = express()

app.use("/api/v1/user", userRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/course", courseRouter)

app.listen(3000, () => {
  console.log(`server is running`)
})
