import React from "react"
import Box from "./components/Box"
import axios from "axios"

function App() {
  const [todos, setTodos] = React.useState([])
  const [popupActive, setPopupActive] = React.useState(false)
  const [newTodo, setNewTodo] = React.useState("")

  React.useEffect(() => {
    axios.get("http://localhost:8080/todos")
    .then(res => setTodos(res.data))
    .catch(err => console.error(err))
  , [todos]})

  const toggleComplete = async (id, event) => {
    await axios.patch(`http://localhost:8080/todo/complete/${id}`)
    event.stopPropagation()
  }

  const createTodo = async () => {
    const field = document.getElementById("field")

    await fetch("http://localhost:8080/todo/new", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({text: field.value})
    })
    field.value = ""
  }

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:8080/todo/delete/${id}`)
  }

  return (
    <div className="bg-slate-700 min-h-screen p-[32px] text-slate-100 flex justify-center">
      <div className=" w-[min(550px,100%)]">
        <h1 className="text-[40px] font-[700] text-center">Welcome</h1>
        <h4 className="mb-[16px] text-center">Your tasks</h4>

        <div>
          {todos.map(todo => {
            return <Box key={todo._id} text={todo.text} complete={todo.complete} timestamp={todo.timestamp} id={todo._id} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
          })}
          <div className="relative rounded bg-slate-900 p-[16px] flex items-center justify-between cursor-pointer mb-[16px] hover:opacity-[0.8]">
            <input type="text" id="field" className="w-[80%] p-[6px] outline-none rounded text-black" autoFocus placeholder="Create task"/>
            <button className="w-[18%] bg-slate-300 p-[6px]" onClick={createTodo}>Create</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

