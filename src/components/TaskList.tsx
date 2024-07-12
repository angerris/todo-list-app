import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./../redux/store";
import TaskItem from "./TaskItem";

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  return (
    <div>
      {tasks
        .filter((task) => task.status !== "removed")
        .map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
    </div>
  );
};

export default TaskList;
