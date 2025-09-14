import { useState } from 'react'
import Navbar from './components/navbar'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  const handleEdit = () =>{

  }
  const handleDelete = () =>{
    
  }
  const handleAdd = () =>{
    setTodos([...todos, {todo, isCompleted: false}])
    setTodo("")
    console.log(todos);
  }
  const handleChange = (e) =>{
    setTodo(e.target.value)
  }
  return (
    <>
      <Navbar/>
        <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">    
          <div className="addTodo my-5">
            <h2 className='text-lg font-bold'>Add a todo</h2>
            <input onChange={handleChange} value ={todo} type="text"  className='w-1/2 bg-white'/>
            <button className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6 my-5' onClick={handleAdd}>Add</button>
          </div>
            <h2 className='text-lg font-bold'>Your Todos</h2>
            <div className="todos">
              {todos.map(item=>{

              
              return <div key={item} className="todo flex w-1/2 justify-between">
                <input type="checkbox" value={todo.isCompleted} name="" id="" />
                <div className={item.isCompleted?"line-through": ""}>{item.todo}</div>
                <div className="buttons">
                  <button className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1' onClick={handleEdit}>Edit</button>
                  <button className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1' onClick={handleDelete}>Delete</button>
                </div>
              </div>
              })}
            </div>
          </div>
    </>
  )
}

export default App
