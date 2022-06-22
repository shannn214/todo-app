import React, { useState, useContext, createContext } from 'react'

type ContextProviderProps = { children: React.ReactNode }

interface ITask {
  id: number
  task: string
  // date: Date
}
export type TaskContextType = {
  tasks: ITask[]
  // setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
  addTask: (task: ITask) => void
}

const StateContext = createContext<TaskContextType | null>(null)

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [tasks, setTasks] = useState<ITask[]>([])

  const addTask = (taskWrap: ITask) => {
    const newTask = {
      id: taskWrap.id,
      task: taskWrap.task,
    }
    setTasks([...tasks, newTask])
  }

  const deleteTask = () => {}
  const updateTask = () => {}

  return (
    <StateContext.Provider
      value={{
        tasks,
        // setTasks,
        addTask,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
