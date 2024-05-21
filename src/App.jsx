import { useState, useEffect } from "react";
import uuid from "react-uuid";
import "./App.css";
import Navbar from "./component/navbar";
import "./todo.css";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [count, setcount] = useState(0);
  const [obj, setobj] = useState("");
  const [idArray, setidArray] = useState([]);
  

  useEffect(() => {
    if(!localStorage.getItem("todos")){console.log(localStorage.getItem("todos"))}
    else{
      let newtodos = localStorage.getItem("todos");
      let arr = JSON.parse(newtodos);
      settodos(arr);

    }
    
  }, []);

  function entertodo(e) {
    settodo(e.target.value);
  }

  function savetodos(params) {
    localStorage.setItem("todos", JSON.stringify(params));
  }

  function addtodo() {
    if (count === 1) {
      let array = todos.filter((item) => {
        return item.id !== obj.id;
      });

      array.push({ todo: todo, id: uuid() });

      settodo("");
      settodos(array);
      savetodos(array);
      setcount(0);
    } else {
      if (
        todos.find((item) => {
          return item.todo === todo;
        })
      ) {
        alert("This todo is already in the list , try with another");
      } else {
        settodos([...todos, { todo, id: uuid() }]);
        settodo("");
        let newtodos = todos;
        newtodos = [...newtodos, { todo: todo, id: uuid() }];
        localStorage.setItem("todos", JSON.stringify(newtodos));
      }
    }
  }

  function editTodo(e) {
    let id, index;

    let b = e.target.name;
    id = e.target.name;

    let t = todos.find((item) => {
      return item.id === b;
    });

    index = todos.findIndex((item) => {
      return item.id === b;
    });

    setobj({
      id: id,
      index: index,
      todo: t.todo,
    });

    settodo(t.todo);
    setcount(1);
  }

  function deleteTodo(e) {
    let id = e.target.name;
    let newtodos = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newtodos);
    savetodos(newtodos);
  }

  function check(id) {
    let t = todos.find((item) => {
      return item.id === id;
    });

    let index = Array.from(
      document.getElementsByClassName("SingleTodo")
    ).findIndex((item) => {
      return item.innerHTML === t.todo;
    });

    let checkbox = Array.from(document.getElementsByClassName("checkbox"))[index];

    let isSelect = false;
    if (checkbox.checked == true) {
      isSelect = !isSelect;
    }

    if (isSelect == true) {
      setidArray([...idArray, id]);
      console.log(idArray);
    } else {
      let newidArray = idArray.filter((item) => {
        return item !== id;
      });
      setidArray(newidArray);
      console.log(idArray, newidArray);
    }
  }

  function deleteMultiple() {
    let newtodos,
      temp = todos;

    for (let i = 0; i < idArray.length; i++) {
      newtodos = temp.filter((item) => {
        return item.id !== idArray[i];
      });
      temp = newtodos;
    }

    settodos(temp);
    savetodos(temp)
  }

  console.log(todos)

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="add-todo">
          <h3>Add Your Todo</h3>
          <div className="add">
            <input onChange={entertodo} value={todo}></input>
            <button onClick={addtodo}>Add</button>
          </div>
        </div>
        <div className="show-todo">
          <div className="heading">
            <h2>Your Todos</h2>
            <button
              className="delete-multiple"
              onClick={() => {
                Array.from(document.getElementsByClassName("checkbox")).forEach(
                  (item) => {
                    item.style.visibility = "visible";
                  }
                );
                if (idArray.length !== 0) {
                  deleteMultiple();
                }
              }}
            >
              Delete Multiple
            </button>
          </div>
          <div className="display">
            {todos.map((item) => {
              return (
                <div key={item.id} className="todo">
                  <input
                    className="checkbox"
                    type="checkbox"
                    onClick={() => {
                      check(item.id);
                    }}
                  ></input>
                  <p className="SingleTodo">{item.todo}</p>
                  <div className="buttons">
                    <button name={item.id} onClick={editTodo}>
                      Edit
                    </button>
                    <button name={item.id} onClick={deleteTodo}>
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
