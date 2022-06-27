import React, { useState, useContext, createContext, useEffect } from 'react'
import { IDBPDatabase } from 'idb'
import { initDB, getTodo, ITodoDatabase } from '../utils/todoDatabaseHelper'

type TodoContextProviderProps = { children: React.ReactNode }

export interface ITodo {
  id: number
  title: string
  date: number
}

export type TodoContextType = {
  todos: ITodo[]
  handleSetTodo: () => void
}

const TodoContext = createContext<TodoContextType | null>(null)

export const TodoContextProvider = ({ children }: TodoContextProviderProps) => {
  const [todos, setTodos] = useState<ITodo[]>([])

  useEffect(() => {
    let db: IDBPDatabase<ITodoDatabase> | undefined
    const init = async () => {
      db = await initDB()
      handleSetTodo()
    }
    init()
    return () => {
      db && db.close()
    }
  }, [])

  const handleSetTodo = async () => {
    const res = (await getTodo()) as ITodo[]
    setTodos(res)
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        handleSetTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export const useTodoContext = () => useContext(TodoContext)
