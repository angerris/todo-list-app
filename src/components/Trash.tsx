import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./../redux/store";
import { permanentlyRemoveTask } from "./../redux/slice/slice";

const Trash: React.FC = () => {
  const dispatch = useDispatch();
  const removedTasks = useSelector((state: RootState) =>
    state.tasks.tasks.filter((task) => task.status === "removed")
  );

  const handlePermanentlyRemove = (id: string) => {
    dispatch(permanentlyRemoveTask(id));
  };

  return (
    <div>
      {removedTasks.length === 0 ? (
        <p>No removed tasks</p>
      ) : (
        removedTasks.map((task) => (
          <div key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.deadline}</p>
            <button onClick={() => handlePermanentlyRemove(task.id)}>
              Permanently Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Trash;
