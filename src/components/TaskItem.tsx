import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Task,
  removeTask,
  markTaskAsCompleted,
  markTaskAsPending
} from "./../redux/slice/slice";
import EditTaskForm from "./EditTaskForm";
import { Card, Button } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  UndoOutlined
} from "@ant-design/icons";

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleRemove = () => {
    dispatch(removeTask(task.id));
  };

  const handleMarkAsCompleted = () => {
    dispatch(markTaskAsCompleted(task.id));
  };

  const handleMarkAsPending = () => {
    dispatch(markTaskAsPending(task.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCloseEditForm = () => {
    setIsEditing(false);
  };

  return (
    <Card
      className={`task-item ${task.status === "completed" ? "completed" : ""}`}
    >
      {isEditing ? (
        <EditTaskForm task={task} onClose={handleCloseEditForm} />
      ) : (
        <>
          <div className="taskInfo">
            {task.deadline && <div className="deadline">• {task.deadline}</div>}
            <div className="taskTitle">{task.title}</div>
            <div className="taskDescription">{task.description}</div>
          </div>
          <div className="buttonWrapper">
            {task.status === "pending" && (
              <>
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  onClick={handleMarkAsCompleted}
                  style={{ marginRight: "8px", padding: "5px" }}
                />
                <Button
                  icon={<EditOutlined />}
                  onClick={handleEdit}
                  style={{
                    marginRight: "8px",
                    color: "#1890ff",
                    padding: "5px"
                  }}
                />
                <Button
                  type="default"
                  icon={<DeleteOutlined />}
                  onClick={handleRemove}
                  style={{ color: "#ff4d4f", padding: "5px" }}
                />
              </>
            )}
            {task.status === "completed" && (
              <>
                <Button
                  type="primary"
                  icon={<UndoOutlined />}
                  onClick={handleMarkAsPending}
                  style={{ marginRight: "8px", padding: "5px" }}
                />
                <Button
                  type="default"
                  icon={<DeleteOutlined />}
                  onClick={handleRemove}
                  style={{ color: "#ff4d4f", padding: "5px" }}
                />
              </>
            )}
          </div>
        </>
      )}
    </Card>
  );
};

export default TaskItem;
