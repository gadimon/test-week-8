import React from "react";
import "./TodoItem.css";
import { Todo } from "../TodoList/TodoList";

interface TodoItemProps {
  todo: Todo;
  deleteTodo: (id: string) => Promise<void>;
  toggleCompletion: (id: string) => Promise<void>;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  deleteTodo,
  toggleCompletion,
}) => {

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <div className="todo-status-and-text" onClick={() => toggleCompletion(todo.id)}>
        <span>{todo.completed ? "✔️" : "❌"}</span>
      </div>
      <div className="todo-details">
        <p>Status: {todo.status}</p>
        <p>Priority: {todo.priority}</p>
        <p>Description: {todo.description}</p>
      </div>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
};

export default TodoItem;
