import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Task,
  removeTask,
  markTaskAsCompleted,
  markTaskAsPending
} from "./../redux/slice/slice";
import EditTaskForm from "./EditTaskForm";
import { Card, Button, Space } from "antd";
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
      title={task.deadline}
      style={{ marginBottom: "16px" }}
    >
      {isEditing ? (
        <EditTaskForm task={task} onClose={handleCloseEditForm} />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <Space className="buttonWrapper" style={{ marginTop: "16px" }}>
            {task.status === "pending" && (
              <>
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  onClick={handleMarkAsCompleted}
                  style={{ width: "100%", padding: "5px" }}
                />
                <Button
                  icon={<EditOutlined />}
                  onClick={handleEdit}
                  style={{ width: "100%", color: "#1890ff", padding: "5px" }}
                />
                <Button
                  type="default"
                  icon={<DeleteOutlined />}
                  onClick={handleRemove}
                  style={{ width: "100%", color: "#ff4d4f", padding: "5px" }}
                />
              </>
            )}
            {task.status === "completed" && (
              <>
                <Button
                  type="primary"
                  icon={<UndoOutlined />}
                  onClick={handleMarkAsPending}
                  style={{ width: "100%", padding: "5px" }}
                />
                <Button
                  type="default"
                  icon={<DeleteOutlined />}
                  onClick={handleRemove}
                  style={{ width: "100%", color: "#ff4d4f", padding: "5px" }}
                />
              </>
            )}
          </Space>
        </div>
      )}
    </Card>
  );
};

export default TaskItem;
