import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TaskItem from "./TaskItem";

const CompletedTasks: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const completedTasks = tasks.filter((task) => task.status === "completed");

  return (
    <div className="tabContent">
      {completedTasks.length === 0 ? (
        <p>No completed tasks</p>
      ) : (
        completedTasks.map((task) => <TaskItem key={task.id} task={task} />)
      )}
    </div>
  );
};

export default CompletedTasks;
