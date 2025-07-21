
import './App.css';
import {useState, useEffect } from 'react';
import Header from "./components/Header";


function App() {
  const [todo, settodo] = useState(""); //state to put the task in
  const [Todos, setTodos] = useState([]); //state of array to render all the tasks
  const [editIndex, setEditIndex] = useState(-1);
// Load todos from local storage
useEffect(() => {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    setTodos(JSON.parse(storedTodos));
  }
}, []);

// Save todos to local storage on change
useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(Todos));
}, [Todos]);

  const handleAdd = () => {
    if (todo.trim() !== "") {
      setTodos([...Todos, { todo: todo, isComplete: false }]);
      settodo("");
    }
  };

  const handleDelete = (index) => {
    const newTodos = Todos.filter((_, idx) => idx !== index); //eliminating the deleting index and returing everything else.
    setTodos(newTodos);
  };

  const handleEdit = (index) => {
    settodo(Todos[index].todo);
    setEditIndex(index);
  };

  const handleComplete = (index) => {
    const updatedTodos = [...Todos];
    updatedTodos[index].isComplete = !updatedTodos[index].isComplete;
    setTodos(updatedTodos);
  };

  const handleUpdate = () => {
    if (todo.trim() !== "") {
      const updatedTodos = [...Todos];
      updatedTodos[editIndex].todo = todo;
      setTodos(updatedTodos);
      settodo("");
      setEditIndex(-1);
    }
  };

  const handleCancel = () => {
    settodo("");
    setEditIndex(-1);
  };

  const handlechange = (e) => {
    settodo(e.target.value);
  };

  return (
    <>
      <Header title="My Todo" />
      <div className="container my-5 p-4 rounded border border-dark bg-light">
        <div className="addtodo text-center mb-4">
          <h2 className="text-success mb-3">Add Your Task</h2>
          <div className="input-group mb-3 w-75 mx-auto">
            <input
              onChange={handlechange}
              value={todo}
              type="text"
              className="form-control"
              placeholder="Enter your task"
            />
            {editIndex === -1 ? (
              <button onClick={handleAdd} className="btn btn-primary">ADD</button>
            ) : (
              <>
                <button onClick={handleUpdate} className="btn btn-success">UPDATE</button>
                <button onClick={handleCancel} className="btn btn-secondary ms-2">CANCEL</button>
              </>
            )}
          </div>
        </div>

        <h3 className="text-center text-dark mb-3">My Todo-List</h3>
        <div className="d-flex flex-column align-items-center">
          {Todos.length === 0 ? (
            <p className="text-muted">No tasks added yet!</p>
          ) : (
            Todos.map((item, index) => (
              <div key={index} className="d-flex justify-content-between align-items-center border rounded p-3 mb-2 w-75 bg-white shadow-sm">
                <div className="d-flex align-items-center">
                  <input
                    type="checkbox"
                    className="form-check-input me-3"
                    checked={item.isComplete}
                    onChange={() => handleComplete(index)}
                  />
                  <span className={item.isComplete ? "text-decoration-line-through text-muted" : "fw-bold"}>
                    {item.todo}
                  </span>
                </div>
                <div>
                  <button onClick={() => handleEdit(index)} className="btn btn-outline-info btn-sm me-2">EDIT</button>
                  <button onClick={() => handleDelete(index)} className="btn btn-outline-danger btn-sm">DELETE</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;
