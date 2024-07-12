import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/slice/slice";
import { Modal, Button } from "antd";

const TaskForm: React.FC<{ visible: boolean; onClose: () => void }> = ({
  visible,
  onClose
}) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      deadline: ""
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string(),
      deadline: Yup.date()
    }),
    onSubmit: (values) => {
      dispatch(
        addTask({ ...values, id: Date.now().toString(), status: "pending" })
      );
      formik.resetForm();
      onClose();
    }
  });

  return (
    <Modal title="Add Task" visible={visible} onCancel={onClose} footer={null}>
      <form onSubmit={formik.handleSubmit} className="taskForm">
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title ? (
            <div>{formik.errors.title}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </div>
        <div>
          <label htmlFor="deadline">Deadline</label>
          <input
            id="deadline"
            name="deadline"
            type="date"
            onChange={formik.handleChange}
            value={formik.values.deadline}
          />
        </div>
        <Button type="primary" htmlType="submit">
          Add Task
        </Button>
      </form>
    </Modal>
  );
};

export default TaskForm;
