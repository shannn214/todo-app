import { openDB, DBSchema } from 'idb'

export interface ITodoDatabase extends DBSchema {
  TodoDatabase: {
    key: string
    value: number
  }
  todos: {
    value: {
      id: number
      title: string
      date: number
    }
    key: number
    indexes: { todo_title: string; todo_date: number }
  }
}

export interface ITodo {
  id: number
  title: string
  date: number
}

const dbPromise = () => openDB('TodoDatabase', 1)

export async function initDB() {
  try {
    const db = await openDB<ITodoDatabase>('TodoDatabase', 1, {
      upgrade(db) {
        const store = db.createObjectStore('todos', { keyPath: 'id' })
        store.createIndex('todo_title', ['title'], { unique: false })
        store.createIndex('todo_date', ['date'], { unique: false })
      },
    })
    return db
  } catch (error) {
    console.log(error)
  }
}

export async function getTodo() {
  try {
    const transaction = (await dbPromise()).transaction('todos', 'readwrite')
    const store = transaction.objectStore('todos')
    const todos = await store.getAll()
    return todos
  } catch (error) {
    console.log(error)
  }
}

export async function addTodo(todoWrap: ITodo) {
  try {
    const transaction = (await dbPromise()).transaction('todos', 'readwrite')
    const store = transaction.objectStore('todos')
    await store.add(todoWrap)
    await transaction.done
    return 'success'
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function updateTodo(todoWrap: ITodo) {
  try {
    const transaction = (await dbPromise()).transaction('todos', 'readwrite')
    const store = transaction.objectStore('todos')
    await store.put(todoWrap)
    await transaction.done
    return 'success'
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function deleteTodo(id: number) {
  try {
    const transaction = (await dbPromise()).transaction('todos', 'readwrite')
    const store = transaction.objectStore('todos')
    await store.delete(id)
    await transaction.done
    return 'success'
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function checkTodo(title: string) {
  try {
    const transaction = (await dbPromise()).transaction('todos', 'readwrite')
    const store = transaction.objectStore('todos')
    const titleIndex = store.index('todo_title')
    return titleIndex.get([title])
  } catch (error) {
    console.log(error)
  }
}
