import { useState } from "react";
import "./Dashboard.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const [form, setForm] = useState({
    title: "",
    category: "",
    priority: "",
    deadline: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.category || !form.priority || !form.deadline) {
      alert("Please fill out all fields!");
      return;
    }

    const newTask = {
      id: Date.now(),
      ...form,
      completed: false
    };

    setTasks([...tasks, newTask]);

    setForm({
      title: "",
      category: "",
      priority: "",
      deadline: ""
    });
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  return (
    <div className="dashboard-box">
      <div className="header">
        <p>WEEK 1 – PREPARATION MIDTERM PROJECT</p>
        <h1>Task Management Dashboard</h1>
        <span className="difficulty">MEDIUM DIFFICULTY • 2 DAYS</span>
      </div>

      <div className="container">
        {/* LEFT FORM */}
        <div className="form-section">
          <h3>ADD NEW TASK</h3>
          <form onSubmit={handleSubmit}>
            <label>TASK TITLE</label>
            <input
              type="text"
              placeholder="e.g. Study React"
              name="title"
              value={form.title}
              onChange={handleChange}
            />

            <label>CATEGORY</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="">Select category...</option>
              <option value="Study">Study</option>
              <option value="Work">Work</option>
              <option value="Health">Health</option>
            </select>

            <label>PRIORITY</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  value="Low"
                  name="priority"
                  checked={form.priority === "Low"}
                  onChange={handleChange}
                /> Low
              </label>
              <label>
                <input
                  type="radio"
                  value="Medium"
                  name="priority"
                  checked={form.priority === "Medium"}
                  onChange={handleChange}
                /> Medium
              </label>
              <label>
                <input
                  type="radio"
                  value="High"
                  name="priority"
                  checked={form.priority === "High"}
                  onChange={handleChange}
                /> High
              </label>
            </div>

            <label>DEADLINE</label>
            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
            />

            <button className="add-btn">+ ADD TASK</button>
          </form>
        </div>

        {/* RIGHT SECTION */}
        <div className="right-section">
          <h3>STATISTICS</h3>
          <div className="stats">
            <div className="stat-box total">
              <h2>{total}</h2>
              <p>TOTAL TASKS</p>
            </div>
            <div className="stat-box completed">
              <h2>{completed}</h2>
              <p>COMPLETED</p>
            </div>
            <div className="stat-box pending">
              <h2>{pending}</h2>
              <p>PENDING</p>
            </div>
          </div>

          <h3>FILTER TASKS</h3>
          <div className="filters">
            <button onClick={() => setFilter("all")}>ALL</button>
            <button onClick={() => setFilter("completed")}>COMPLETED</button>
            <button onClick={() => setFilter("pending")}>PENDING</button>
          </div>

          <h3>TASK LIST</h3>
          <div className="task-list">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`task-card ${task.priority?.toLowerCase()} ${task.completed ? "completed" : ""}`}
              >
                <h3>{task.title}</h3>
                <div className="badges">
                  <span className="badge category">{task.category}</span>
                  <span className={`badge ${task.priority?.toLowerCase()}`}>{task.priority}</span>
                  <span className="badge date">
                    {new Date(task.deadline).toLocaleDateString()}
                  </span>
                </div>
                <div className="task-buttons">
                  <button
                    className="complete-btn"
                    onClick={() => toggleComplete(task.id)}
                  >
                    {task.completed ? "UNDO" : "COMPLETE"}
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(task.id)}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;