import React, { useEffect, useState } from "react";
import axios from "axios";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get("http://localhost:5000/api/tasks")
      .then(res => setTasks(res.data));
  };

  const addOrUpdateTask = () => {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      axios.put(`http://localhost:5000/api/tasks/${editId}`, {
        title,
        description,
      }).then(() => {
        fetchTasks();
        resetForm();
      });
    } else {
      axios.post("http://localhost:5000/api/tasks", {
        title,
        description,
      }).then(() => {
        fetchTasks();
        resetForm();
      });
    }
  };

  const editTask = (task) => {
    setEditId(task._id);
    setTitle(task.title);
    setDescription(task.description);
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/api/tasks/${id}`)
      .then(() => fetchTasks());
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEditId(null);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>📝 Task Management System</h2>

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /><br /><br />

      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /><br /><br />

      <button onClick={addOrUpdateTask}>
        {editId ? "Update Task" : "Add Task"}
      </button>

      <ul style={{ marginTop: "20px" }}>
        {tasks.map(task => (
          <li key={task._id}>
            <strong>{task.title}</strong><br />
            {task.description}<br />
            <button onClick={() => editTask(task)}>✏️ Edit</button>
            <button onClick={() => deleteTask(task._id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
