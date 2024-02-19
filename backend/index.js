const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const Todo = require("./models/Todo")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://danialamin489:x1iga2lipGpxGnU9@mycluster0.oa7b67g.mongodb.net/newdb", {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("connected to db"))
.catch(console.error)
app.listen(8080, () => {console.log("listening to port 8080")})

app.get("/todos", async (req,res) => {
  const todos = await Todo.find()
  res.json(todos)
})

app.post("/todo/new", (req, res) => {
  const todo = new Todo({
    text: req.body.text
  })
  todo.save()

  res.json(todo)
})

app.delete("/todo/delete/:id", async (req, res) => {
  const id = req.params.id
  const result = await Todo.deleteOne({_id: id})
  result.save()

  res.json(result)
})

app.patch("/todo/complete/:id", async(req, res) => {
  const id = req.params.id
  const result = await Todo.findOne({_id: id})
  result.complete = !result.complete
  result.save()

  res.json(result)
})