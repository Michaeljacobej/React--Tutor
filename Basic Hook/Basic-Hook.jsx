import { useState } from "react";
import ReactDOM from "react-dom/client";


// useState
function FavoriteColor() {
  const [color, setColor] = useState("red");

  return <h1>My favorite color is {color}!</h1>}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<FavoriteColor />);

// useEffect
import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  });

  return <h1>I've rendered {count} times!</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Timer />);


// use Callback
import { useState, useCallback } from "react";
import ReactDOM from "react-dom/client";
import Todos from "./Todos";

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  const increment = () => {
    setCount((c) => c + 1);
  };
  const addTodo = useCallback(() => {
    setTodos((t) => [...t, "New Todo"]);
  }, [todos]);

  return (
    <>
      <Todos todos={todos} addTodo={addTodo} />
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
      </div>
    </>);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

import { memo } from "react";

const Todos = ({ todos, addTodo }) => {
  console.log("child render");
  return (
    <>
      <h2>My Todos</h2>
      {todos.map((todo, index) => {
        return <p key={index}>{todo}</p>;
      })}
      <button onClick={addTodo}>Add Todo</button>
    </>);
};

export default memo(Todos);

// useMemo
const App = () => {
    const [count, setCount] = useState(0);
    const [todos, setTodos] = useState([]);
    const calculation = useMemo(() => expensiveCalculation(count), [count]);
  
    const increment = () => {
      setCount((c) => c + 1);
    };
    const addTodo = () => {
      setTodos((t) => [...t, "New Todo"]);
    };
  
    return (
      <div>
        <div>
          <h2>My Todos</h2>
          {todos.map((todo, index) => {
            return <p key={index}>{todo}</p>;
          })}
          <button onClick={addTodo}>Add Todo</button>
        </div>
        <hr />
        <div>
          Count: {count}
          <button onClick={increment}>+</button>
          <h2>Expensive Calculation</h2>
          {calculation}
        </div>
      </div>);
  };
  
  const expensiveCalculation = (num) => {
    console.log("Calculating...");
    for (let i = 0; i < 1000000000; i++) {
      num += 1;
    }
    return num;
  };
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);

// useReducer  
import { useReducer } from "react";
import ReactDOM from "react-dom/client";

const initialTodos = [
  {
    id: 1,
    title: "Todo 1",
    complete: false,
  },
  {
    id: 2,
    title: "Todo 2",
    complete: false,
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "COMPLETE":
      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      });
    default:
      return state;
  }
};

function Todos() {
  const [todos, dispatch] = useReducer(reducer, initialTodos);

  const handleComplete = (todo) => {
    dispatch({ type: "COMPLETE", id: todo.id });
  };

  return (
    <>
      {todos.map((todo) => (
        <div key={todo.id}>
          <label>
            <input
              type="checkbox"checked={todo.complete}onChange={() => handleComplete(todo)}/>
            {todo.title}
          </label>
        </div>))}
    </>);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Todos />);

// useRef
import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [inputValue, setInputValue] = useState("");
  const count = useRef(0);

  useEffect(() => {
    count.current = count.current + 1;
  });

  return (
    <>
      <input
        type="text"value={inputValue}onChange={(e) => setInputValue(e.target.value)}/>
      <h1>Render Count: {count.current}</h1>
    </>);
}


