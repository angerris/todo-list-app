import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addTask } from "./../redux/slice/slice";

const TaskForm: React.FC = () => {
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
    }
  });

  return (
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
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
