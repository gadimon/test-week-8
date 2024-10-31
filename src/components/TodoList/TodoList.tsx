import React, { useEffect, useState } from "react";
import "./TodoList.css";
import TodoForm from "../TodoForm/TodoForm";
import BasicSpinner from "../BasicSpinner/BasicSpinner";
import axios from "axios";
import TodoItem from "../TodoItem/TodoItem";

const BASE_URL = `https://reactexambackend.onrender.com/missions`;
const API_KEY = import.meta.env.VITE_API_KEY;

export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  status: string;
  priority: string;
  description: string;
}

const TodoList: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [todos, setTodos] = useState<Todo[]>([]);

  const getTodos = async () => {
    try {
      setIsLoading(true);
      console.log("Fetching todos from API...");
      const response = await axios.get<Todo[]>(`${BASE_URL}/${API_KEY}`);
      console.log("Data fetched:", response.data);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = async (todo: { title: string; status: string; priority: string; description: string }): Promise<void> => {
    try {
      const newTodo = {
        name: todo.title,
        status: todo.status,
        priority: todo.priority,
        description: todo.description,
      };

      await axios.post(`${BASE_URL}/${API_KEY}`, newTodo);
      getTodos();
    } catch (error) {
      console.error("Cannot add todo", error);
    }
  };

  const deleteTodo = async (id: string): Promise<void> => {
    try {
      await axios.delete(`${BASE_URL}/${API_KEY}/${id}`);
      getTodos();
    } catch (error) {
      console.error("Cannot delete todo", error);
    }
  };

  const toggleCompletion = async (id: string): Promise<void> => {
    try {
      await axios.post(`${BASE_URL}/${API_KEY}/progress/${id}`);
      getTodos();
    } catch (error) {
      console.error("Cannot toggle todo", error);
    }
  };

  return (
    <div className="todo-list">
      <h1>ToDo List</h1>
      <TodoForm addTodo={addTodo} />
      {isLoading ? (
        <BasicSpinner />
      ) : (
        <ul>
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              deleteTodo={deleteTodo}
              toggleCompletion={toggleCompletion}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
