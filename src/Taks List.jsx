<div className="task-list">

  {filteredTasks.map((task) => (

    <div
      key={task.id}
      className={`task-card ${task.priority.toLowerCase()} ${task.completed ? "completed" : ""}`}
    >

      <h3 className="task-title">
        {task.completed && "✔ "}
        {task.title}
      </h3>

      <div className="badges">

        <span className="badge category">
          {task.category?.toUpperCase()}
        </span>

        <span className={`badge priority ${task.priority.toLowerCase()}`}>
          ● {task.priority?.toUpperCase()}
        </span>

        <span className="badge date">
          {new Date(task.deadline).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
          }).toUpperCase()}
        </span>

      </div>

      <div className="task-buttons">

        <button
          className="complete"
          onClick={() => toggleComplete(task.id)}
        >
          {task.completed ? "UNDO" : "COMPLETE"}
        </button>

        <button
          className="delete"
          onClick={() => deleteTask(task.id)}
        >
          DELETE
        </button>

      </div>

    </div>

  ))}

</div>