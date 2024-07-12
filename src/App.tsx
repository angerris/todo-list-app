import React, { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Trash from "./components/Trash";
import "./styles/global.css";

const App: React.FC = () => {
  const [view, setView] = useState<"tasks" | "trash">("tasks");

  return (
    <div>
      <nav>
        <button onClick={() => setView("tasks")}>Tasks</button>
        <button onClick={() => setView("trash")}>Trash</button>
      </nav>
      {view === "tasks" && (
        <>
          <h1>Todo List</h1>
          <TaskForm />
          <TaskList />
        </>
      )}
      {view === "trash" && (
        <>
          <h1>Trash</h1>
          <Trash />
        </>
      )}
    </div>
  );
};

export default App;
