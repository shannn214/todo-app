import { useState, useEffect } from 'react'

function useDatabase() {
  // const [store, setStore] = useState<IDBObjectStore | undefined>(undefined)
  const [db, setDb] = useState<IDBDatabase | undefined>(undefined)
  // const [error, setError] = useState<Error | undefined>(undefined)

  useEffect(() => {
    const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB

    const request = indexedDB.open('TodoDatabase', 1)

    request.onerror = (e) => {
      console.error('An error occurred with IndexedDB')
      console.error(e)
      // setError(e)
    }

    request.onupgradeneeded = function () {
      const db = request.result
      const store = db.createObjectStore('todos', { keyPath: 'id' })
      store.createIndex('todo_task', ['task'], { unique: false })
      store.createIndex('todo_date', ['date'], { unique: false })
    }

    request.onsuccess = function () {
      console.log('open success')
      const db = request.result
      const transaction = db.transaction('todos', 'readwrite')
      const store = transaction.objectStore('todos')
      // setStore(store)
      setDb(db)
    }
  }, [])

  return [db]
}

export default useDatabase
