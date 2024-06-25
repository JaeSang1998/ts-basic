import React from "react";
import { useState } from "react";

type Todo = {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
};

type TodoList = Todo[];
function App() {
  const [todos, setTodos] = useState<TodoList>([]);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const onCreateClicked = () => {
    setTodos([
      ...todos,
      {
        id: crypto.randomUUID(),
        title,
        description,
        isDone: false,
      },
    ]);
  };

  const onDeleteClicked = (id: Todo["id"]) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const onToggleClicked = (id: Todo["id"]) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }
        return todo;
      })
    );
  };

  return (
    <>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <React.Fragment key={todo.id}>
            <li
              style={{
                textDecoration: todo.isDone ? "line-through" : "none",
              }}
              onClick={() => onToggleClicked(todo.id)}
            >
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
            </li>
            <button onClick={() => onDeleteClicked(todo.id)}>삭제</button>
          </React.Fragment>
        ))}
      </ul>

      <input type="text" onChange={onTitleChange} />
      <input type="text" onChange={onDescriptionChange} />
      <button onClick={onCreateClicked}>등록</button>
    </>
  );
}

export default App;
