import React, { useState } from "react";
import "./TodoForm.css";

interface TodoFormProps {
  addTodo: (todo: { name: string; status: string; priority: string; description: string }) => Promise<void>;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!name.trim() || !status || !priority || !description.trim()) {
      return;
    }
    addTodo({ name, status, priority, description });
    setName("");
    setStatus("");
    setPriority("");
    setDescription("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Select Status</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="">Select Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />

      <button type="submit">Add Mission</button>
    </form>
  );
};

export default TodoForm;