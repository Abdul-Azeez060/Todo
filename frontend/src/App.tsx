import { FormEvent, useEffect, useState } from "react";
import "./App.css";
import axios, { AxiosError } from "axios";

interface Todos {
  id: number;
  name: string;
  isDone: boolean;
}

function App() {
  const [todoInput, setTodoInput] = useState<string>("");
  const [todos, setTodos] = useState<Todos[]>([]);
  const [message, setMessage] = useState<string>("");
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setMessage("adding your todo");
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/todos/new", {
        todo: todoInput,
      });
      setMessage("successfully added todo");
      setTodoInput("");
      await init();
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.message);
    }
  };
  async function init() {
    try {
      const response = await axios.get("http://localhost:8000/todos");
      setTodos(response.data.todos);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <div>
        {" "}
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="todoInput">Add your todos</label>
          <input
            type="text"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
          />
          <button type="submit">Add Todo</button>
        </form>
      </div>
      {message}
      {todos ? (
        <div>
          <ul style={{ listStyleType: "none" }}>
            {todos.map((todo) => (
              <div>
                <li key={todo.id}>
                  {todo.name} {todo.isDone ? "Done ✅" : "❌ Not Done"}
                </li>
              </div>
            ))}
          </ul>
        </div>
      ) : (
        "No todos"
      )}
    </div>
  );
}

export default App;
