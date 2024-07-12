import React, { useState, useEffect } from "react";
import { Tabs, Button } from "antd";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Trash from "./components/Trash";
import CompletedTasks from "./components/CompletedTasks";
import OverdueTasks from "./components/OverdueTasks";
import "./styles/global.css";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { updateTaskStatuses } from "./redux/slice/slice";

const { TabPane } = Tabs;

const App: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateTaskStatuses());
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="main">
      <div className="mainCard">
        <div className="formHeader">
          <h1 style={{ color: "#434343" }}>Todo List</h1>
          <Button
            type="primary"
            onClick={showModal}
            size="large"
            icon={<PlusOutlined />}
          >
            Add Task
          </Button>
        </div>
        <TaskForm visible={isModalVisible} onClose={handleClose} />
        <Tabs className="custom-tabs" defaultActiveKey="1">
          <TabPane tab="Tasks" key="1">
            <TaskList />
          </TabPane>
          <TabPane tab="Completed Tasks" key="2">
            <CompletedTasks />
          </TabPane>
          <TabPane tab="Overdue Tasks" key="3">
            <OverdueTasks />
          </TabPane>
          <TabPane tab="Trash" key="4">
            <Trash />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default App;
