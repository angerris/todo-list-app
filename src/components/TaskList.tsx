import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TaskItem from "./TaskItem";
import EmptyBox from "./EmptyBox";

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const pendingTasks = tasks.filter((task) => task.status === "pending");

  return (
    <div className="tabContent">
      {pendingTasks.length === 0 ? (
        <EmptyBox text="No pending tasks" />
      ) : (
        pendingTasks.map((task) => <TaskItem key={task.id} task={task} />)
      )}
    </div>
  );
};

export default TaskList;
