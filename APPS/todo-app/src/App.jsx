import React,{ useState, useEffect } from 'react'
import './App.css'

 function AddTask() {
      const [tasks, setTasks] = useState([
        { id: crypto.randomUUID(), text: "complete homework" },
        { id: crypto.randomUUID(), text: "Go for a walk" },
        { id: crypto.randomUUID(), text: "watch movie" }
      ]);

      const [inputText, setInputText] = useState('');

      function fetchInputTask(event) {
        setInputText(event.target.value);
      }

      function addNewTask() {
        if (inputText.trim() === "") return;
        const newTask = { id: crypto.randomUUID(), text: inputText };
        setTasks([...tasks, newTask]);
        setInputText("");
      }

      function deleteTask(id) {
        const updatedTasks = tasks.filter(function (task) {
          if (task.id !== id) {
            return true; // keep this task
          } else {
            return false; // remove this task
          }
        });
        setTasks(updatedTasks);
      }

      return (
        <div className="todo-container">
          <h2>Todo List</h2>
          <div className="input-group">
            <input
              type="text"
              placeholder="What is today's task?"
              onChange={fetchInputTask}
              value={inputText}
            />
            <button className="add-btn" onClick={addNewTask}>Add</button>
          </div>
          <div>
            {tasks.map((task) => (
              <div className="task" key={task.id}>
                <span>{task.text}</span>
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    function App() {
      return <AddTask />;
    }

export default App
