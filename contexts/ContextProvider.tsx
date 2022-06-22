import React, { useState, useContext, createContext, useEffect } from 'react'
import useDatabase from '../utils/useDatabase'

type ContextProviderProps = { children: React.ReactNode }

interface ITask {
  id: number
  task: string
  date: number
}
export type TaskContextType = {
  tasks: ITask[]
  addTask: (task: ITask) => void
  updateTask: (task: ITask) => void
}

const StateContext = createContext<TaskContextType | null>(null)

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [db] = useDatabase()

  useEffect(() => {
    if (!db) return
    getTask()

    return () => {}
  }, [db])

  const getTask = () => {
    const transaction = db.transaction('todos', 'readwrite')
    const store = transaction.objectStore('todos')
    const req = store.getAll()
    req.onsuccess = function () {
      console.log(req.result)
      setTasks(req.result)
    }
  }

  const addTask = (taskWrap: ITask) => {
    console.log(taskWrap)
    const transaction = db.transaction('todos', 'readwrite')
    const store = transaction.objectStore('todos')
    let req = store.put(taskWrap)
    req.onsuccess = function () {
      console.log('add')
      setTasks([...tasks, taskWrap])
    }
  }

  const deleteTask = () => {}

  const updateTask = (taskWrap: ITask) => {
    const transaction = db.transaction('todos', 'readwrite')
    const store = transaction.objectStore('todos')
    let req = store.put(taskWrap)
    req.onsuccess = function () {
      console.log('put')
      getTask()
      // setTasks([...tasks, taskWrap])
    }
  }

  return (
    <StateContext.Provider
      value={{
        tasks,
        // setTasks,
        addTask,
        updateTask,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
