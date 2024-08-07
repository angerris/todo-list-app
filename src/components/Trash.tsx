import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./../redux/store";
import { permanentlyRemoveTask, restoreTask } from "./../redux/slice/slice";
import EmptyBox from "./EmptyBox";
import { Button, Space } from "antd";
import { UndoOutlined, DeleteOutlined } from "@ant-design/icons";

const Trash: React.FC = () => {
  const dispatch = useDispatch();
  const removedTasks = useSelector((state: RootState) =>
    state.tasks.tasks.filter((task) => task.status === "removed")
  );

  const handlePermanentlyRemove = (id: string) => {
    dispatch(permanentlyRemoveTask(id));
  };

  const handleRestore = (id: string) => {
    dispatch(restoreTask(id));
  };

  return (
    <div className="tabContent">
      {removedTasks.length === 0 ? (
        <EmptyBox text="No removed tasks" />
      ) : (
        removedTasks.map((task) => (
          <div
            key={task.id}
            className={`task-item ${
              task.status === "removed" ? "removed" : ""
            }`}
            style={{
              marginBottom: "16px",
              padding: "16px",
              border: "1px solid #f0f0f0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <div className="taskInfo" style={{ width: "100%" }}>
              {task.deadline && (
                <div className="deadline">• {task.deadline}</div>
              )}
              <h3 className="taskTitle">{task.title}</h3>
              <p className="taskDescription">{task.description}</p>
            </div>
            <Space
              className="buttonWrapper"
              style={{ marginTop: "16px", width: "100%" }}
            >
              <Button
                type="primary"
                icon={<UndoOutlined />}
                onClick={() => handleRestore(task.id)}
                style={{ width: "100%", padding: "5px" }}
              />
              <Button
                type="default"
                icon={<DeleteOutlined />}
                onClick={() => handlePermanentlyRemove(task.id)}
                style={{ width: "100%", color: "#ff4d4f", padding: "5px" }}
              />
            </Space>
          </div>
        ))
      )}
    </div>
  );
};

export default Trash;
