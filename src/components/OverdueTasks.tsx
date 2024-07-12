import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./../redux/store";
import { permanentlyRemoveTask } from "./../redux/slice/slice";
import EmptyBox from "./EmptyBox";
import { Button, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const OverdueTasks: React.FC = () => {
  const dispatch = useDispatch();
  const overdueTasks = useSelector((state: RootState) =>
    state.tasks.tasks.filter((task) => task.status === "overdue")
  );

  const handlePermanentlyRemove = (id: string) => {
    dispatch(permanentlyRemoveTask(id));
  };

  return (
    <div className="tabContent">
      {overdueTasks.length === 0 ? (
        <EmptyBox text="No overdue tasks" />
      ) : (
        overdueTasks.map((task) => (
          <div
            key={task.id}
            className={`task-item ${
              task.status === "overdue" ? "overdue" : ""
            }`}
            style={{
              marginBottom: "16px",
              padding: "16px",
              border: "1px solid #f0f0f0"
            }}
          >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.deadline}</p>
            <Space className="buttonWrapper" style={{ marginTop: "16px" }}>
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

export default OverdueTasks;
