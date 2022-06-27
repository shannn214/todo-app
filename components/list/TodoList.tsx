import React, { useState } from 'react'
import Stack from '@mui/material/Stack'
import TodoItem from './TodoItem'
import { useTodoContext, TodoContextType } from '../../contexts/TodoContextProvider'

const TodoList = () => {
  const { todos } = useTodoContext() as TodoContextType
  const [editId, setEditId] = useState<number | null>(null)
  const { handleSetTodo } = useTodoContext() as TodoContextType

  return (
    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} py={2}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} isEdit={editId === todo.id} setEditItem={setEditId} handleSetTodo={handleSetTodo} />
      ))}
    </Stack>
  )
}

export default TodoList
