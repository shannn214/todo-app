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
  const [db, setDb] = useState<IDBPDatabase<ITodoDatabase> | undefined>(undefined)

  useEffect(() => {
    const init = async () => {
      const _db = await initDB()
      setDb(_db)
      handleSetTodo()
    }
    init()
  }, [])

  useEffect(() => {
    return () => {
      db && db.close()
    }
  }, [db])

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
