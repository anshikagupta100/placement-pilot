<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Preparation() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });

  const [task, setTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (event) => {
    event.preventDefault();

    if (!task.trim()) {
      alert("Please enter a task");
      return;
    }

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: task,
        completed: false,
      },
    ]);

    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const completedTasks = tasks.filter((item) => item.completed).length;

  return (
    <div className="dashboard-page">
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand">
          <div className="dashboard-brand-icon">✦</div>
          <span>PlacementPilot</span>
        </div>

        <nav className="dashboard-nav">
          <button
            className="dashboard-nav-item"
            onClick={() => navigate("/dashboard")}
          >
            <span>⌂</span>
            Dashboard
          </button>

          <button
            className="dashboard-nav-item"
            onClick={() => navigate("/applications")}
          >
            <span>▣</span>
            Applications
          </button>

          <button className="dashboard-nav-item active">
            <span>◈</span>
            Preparation
          </button>

          <button
            className="dashboard-nav-item"
            onClick={() => navigate("/analytics")}
          >
            <span>◒</span>
            Analytics
          </button>

          <button
            className="dashboard-nav-item"
            onClick={() => navigate("/profile")}
          >
            <span>◎</span>
            Profile
          </button>
        </nav>

        <div className="dashboard-sidebar-bottom">
          <button className="dashboard-logout" onClick={logout}>
            <span>↪</span>
            Log out
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-eyebrow">PREPARATION CENTER</p>
            <h1>Preparation</h1>
            <p className="dashboard-subtitle">
              Build a consistent preparation routine.
            </p>
          </div>
        </header>

        <section className="dashboard-stats">
          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon purple">◈</div>
            <div>
              <p>Total tasks</p>
              <h2>{tasks.length}</h2>
              <span>Tasks created</span>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon green">✓</div>
            <div>
              <p>Completed</p>
              <h2>{completedTasks}</h2>
              <span>Tasks completed</span>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon blue">◒</div>
            <div>
              <p>Remaining</p>
              <h2>{tasks.length - completedTasks}</h2>
              <span>Tasks remaining</span>
            </div>
          </div>
        </section>

        <section className="dashboard-panel page-panel">
          <div className="dashboard-panel-header">
            <div>
              <p className="panel-kicker">DAILY PLANNER</p>
              <h2>Create preparation task</h2>
            </div>
          </div>

          <form className="task-form" onSubmit={addTask}>
            <input
              placeholder="Example: Practice JavaScript questions"
              value={task}
              onChange={(event) => setTask(event.target.value)}
            />

            <button className="dashboard-primary-button" type="submit">
              Add task
            </button>
          </form>
        </section>

        <section className="dashboard-panel page-panel">
          <div className="dashboard-panel-header">
            <div>
              <p className="panel-kicker">YOUR TASKS</p>
              <h2>Preparation checklist</h2>
            </div>
          </div>

          {tasks.length === 0 ? (
            <div className="page-empty">
              <div className="dashboard-empty-icon">✓</div>
              <h3>No tasks yet</h3>
              <p>Create your first preparation task.</p>
            </div>
          ) : (
            <div className="task-list">
              {tasks.map((item) => (
                <div className="task-item" key={item.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleTask(item.id)}
                    />

                    <span
                      className={
                        item.completed ? "task-completed" : ""
                      }
                    >
                      {item.title}
                    </span>
                  </label>

                  <button
                    className="table-delete-button"
                    onClick={() => deleteTask(item.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Preparation;
=======
import { useNavigate } from "react-router-dom";
function Preparation() { const navigate = useNavigate(); return <main className="dashboard-main"><h1>Preparation</h1><p>Plan and manage your placement preparation.</p><button onClick={() => navigate("/dashboard")}>Back to Dashboard</button></main>; }
export default Preparation;
>>>>>>> d3ffe8658e9a394c5e9be2a31a0e5a7666567270
