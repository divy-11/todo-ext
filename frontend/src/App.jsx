import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios";
import { Watch } from './components/Watch';
import { DateTell } from './components/DateTell';

function App() {
  const [todos, setTodos] = useState([]);
  const [ref, setRef] = useState(true);
  const [formVal, setFormVal] = useState([]);

  useEffect(() => {
    fetch()
  }, [ref])

  async function fetch() {
    const res = await axios.get("http://localhost:1717/");
    setTodos(res.data);
    // console.log(res.data);

  }

  async function addTodo(e) {
    e.preventDefault();
    await axios({
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:1717/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: formVal
    })
    setRef(!ref);
    setFormVal({});
  }

  async function del(todo) {
    await axios.delete("http://localhost:1717/", {
      data: { id: todo._id }
    })
    setRef(!ref);
  }

  async function compl(todo) {
    await axios.put("http://localhost:1717/", {
      id: todo._id,
      title: todo.title,
      description: todo.description,
      date: todo.date,
      completed: !(todo.completed)
    })
    setRef(!ref);
  }

  return (
    <>
      <div className='bg-slate-300 h-full'>
        <div className='grid grid-cols-2 h-10 text-xl'>
          <div className='border text-center py-2'>
            <DateTell />
          </div>
          <div className='border text-center py-2'>
            <Watch />
          </div>
        </div>
        <div className='mt-6 ml-2'>
          {todos.map((t) => (
            <div key={t._id} class="flex items-center mb-4 mx-4 mt-4">
              <div className='flex'>
                <input type="checkbox"
                  checked={t.completed}
                  value={t._id}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  onChange={() => compl(t)} />
              </div>
              <div className='flex flex-col'>
                <label className={t.completed ? "line-through ms-2 font-medium text-slate-700 text-md " : "ms-2 font-medium text-md"}>{t.title}</label>
                <div className={t.completed ? 'ms-2 text-slate-500 text-sm' : 'ms-2 text-slate-700 text-sm'}>{t.description}</div>
              </div>
              <div className='flex mr-2 ml-auto'>
                <button disabled={t.completed ? true : false} class="rounded-md bg-blue-600 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                    <path d="M4.293 16.293a1 1 0 0 1 0 1.414l-2 2a1 1 0 0 1-1.414-1.414l2-2a1 1 0 0 1 1.414 0ZM19.707 5.707a1 1 0 0 1 0-1.414l-2-2a1 1 0 0 1-1.414 0L4.293 14.293a1 1 0 0 0-.293.707v3a1 1 0 0 0 1 1h3a1 1 0 0 0 .707-.293L19.707 5.707ZM15 6.414l2 2L8.414 17H6v-2.414L15 6.414Z" />
                  </svg>
                </button>
              </div>
              <div className='flex'>
                <button disabled={t.completed ? true : false} class="rounded-md bg-red-500 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button" onClick={() => del(t)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                    <path d="M9 3V4H4V6H20V4H15V3H9ZM5 8V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V8H5ZM7 10H9V19H7V10ZM15 10H17V19H15V10ZM11 10H13V19H11V10Z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        <footer className='footer'>
          <div className="w-72">
            <form class="max-w-sm mx-auto" onSubmit={addTodo}>
              <div className="flex">
                <div>
                  <div class="mb-1">
                    <input type="title" value={formVal.title || ""} onChange={(e) => { setFormVal({ ...formVal, title: e.target.value }) }} class="border h-8 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" required />
                  </div>
                  <div class="mb-1">
                    <input type="description" value={formVal.description || ""} onChange={(e) => { setFormVal({ ...formVal, description: e.target.value }) }} class="border h-8 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Description" required />
                  </div>
                </div>
                <div className="flex flex-col justify-center mx-2">
                  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center h-10">Add</button>
                </div>
              </div>
            </form>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App
