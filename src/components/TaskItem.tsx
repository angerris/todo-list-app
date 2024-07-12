import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Task, removeTask, markTaskAsCompleted } from "./../redux/slice/slice";
import EditTaskForm from "./EditTaskForm";

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleRemove = () => {
    dispatch(removeTask(task.id));
  };

  const handleMarkAsCompleted = () => {
    dispatch(markTaskAsCompleted(task.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCloseEditForm = () => {
    setIsEditing(false);
  };

  return (
    <div
      className={`task-item ${task.status === "completed" ? "completed" : ""}`}
    >
      {isEditing ? (
        <EditTaskForm task={task} onClose={handleCloseEditForm} />
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>{task.deadline}</p>
          {task.status === "pending" && (
            <>
              <button onClick={handleMarkAsCompleted}>Mark as Completed</button>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleRemove}>Remove</button>
            </>
          )}
          {task.status === "completed" && (
            <button onClick={handleRemove}>Delete</button>
          )}
        </>
      )}
    </div>
  );
};

export default TaskItem;
