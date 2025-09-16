import { useEffect, useState } from 'react'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  
  const toggleFinished = (e) => {  
    setshowFinished(!showFinished)
  }

  const handleEdit = (e, id) =>{
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id !== id;
    });
    setTodos(newTodos)
    saveToLS()
  }
  const handleDelete = (e, id) =>{
    let newTodos = todos.filter(item=>{
      return item.id !== id;
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () =>{
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) =>{
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }
  
  return (
    <>
      <Navbar/>
        <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] w-1/2">    
        <h1 className='font-bold text-center text-xl '>Todo List</h1>
          <div className="addTodo my-5 flex flex-col gap-4">
            <h2 className='text-lg font-bold'>Add a todo</h2>
            <input onChange={handleChange} value ={todo} type="text"  className='w-full bg-white rounded-lg px-5 py-1'/>
            <button className='bg-violet-800 hover:bg-violet-950 disabled:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md my-5' onClick={handleAdd} disabled={todo.length<=3}>Save</button>
          </div>
          <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished}/> Show Finished
            <h2 className='text-lg font-bold'>Your Todos</h2>
            <div className="todos">
              {todos.length === 0 && <div className='m-5'>No todos to display</div>}
              {todos.map(item=>{            
              return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-1/2 justify-between my-3">
                <div className='flex gap-5'>
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                  <div className={item.isCompleted?"line-through": ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1' onClick={(e)=>handleEdit(e, item.id)}><FaRegEdit /></button>
                  <button className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1' onClick={(e)=>{handleDelete(e, item.id)}}><FaDeleteLeft /></button>
                </div>
              </div>
              })}
            </div>
          </div>
    </>
  )
}

export default App
