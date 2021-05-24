import Header from './components/Header';
import Tasks from './components/Tasks';
import {useState, useEffect} from 'react'
import AddTask from './components/AddTask'



function App() {

  const [taskadder, settaskadder] = useState(false)


  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const gettasks = async () => {
      const servertasks = await fetchTasks()
      setTasks(servertasks)
    } 

    gettasks()
  }, [])

  //Relaod page
  const refreshPage = ()=>{
    window.location.reload();
 }

  //Fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  //Comparer Function    
  function GetSortOrder(prop) {    
    return function(a, b) {    
        if (parseInt(a["day"].substring(prop, prop+2)) > parseInt(b["day"].substring(prop, prop+2))) {    
            return 1;    
        } else if (parseInt(a["day"].substring(prop, prop+2)) < parseInt(b["day"].substring(prop, prop+2))) {    
            return -1;    
        }    
        return 0;    
    }    
  }    

  //Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    const sortedmin = data.sort(GetSortOrder(6))
    const sortedhour = sortedmin.sort(GetSortOrder(4))

    return sortedhour.sort(GetSortOrder(0))
  }
  

  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    
    const data = await res.json()

    setTasks([...tasks, data])
    refreshPage()

    //const id = Math.floor(Math.random()*1000)
    //setTasks([...tasks, {id, ...task}])
    //console.log(task)
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE',})

    setTasks(tasks.filter((task) => (task.id !== id)))
  }

  const toggleremind = async (id) => {
    
    const toggtask = await fetchTask(id)
    const update = {...toggtask, reminder: !toggtask.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(update)
    })
    
    const data = await res.json()

    setTasks(tasks.map((task) => (task.id === id) ? {...task, reminder: data.reminder} : task))
  }

  const toggedit = async (id) => {
    const toggtask = await fetchTask(id)
    const update = {...toggtask, edit: !toggtask.edit}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(update)
    })
    
    const data = await res.json()
    //setTasks(tasks.filter((task) => !(task.id === id)))
    //setTasks([...tasks, {id, ...task}])
    setTasks(tasks.map((task) => (task.id === id) ? {...task, edit: data.edit} : task))
  }

  return (
    <div className='Container'>
      < Header taskAdder={() => settaskadder(!taskadder)} butt={taskadder}/>
      {taskadder && <AddTask adder={addTask}/>}
      {tasks.length > 0 ? <Tasks tasks={tasks} del={deleteTask} editogg={toggedit} 
      togg={toggleremind} changer={addTask} refresh={refreshPage}
          /> : 'No Tasks To Show'}
    </div>
  );
}

export default App;


  //const edittask = async (id, tex, da) => {
  //  const edittask = await fetchTask(id)
  //  const update = {...edittask, text: tex
  //  //  , day: da
  //  }

  //  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
  //    method: 'PUT',
  //    headers: {
  //      'Content-type': 'application/json'
  //    },
  //    body: JSON.stringify(update)
  //  })
    
  //  const data = await res.json()

  //  setTasks(tasks.map((task) => (task.id === id) ? {...task, text: data.text
  //    //, day: data.day
  //  } : task))
  //  console.log(data)
  //}
