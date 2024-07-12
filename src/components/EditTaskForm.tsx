import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { editTask } from "./../redux/slice/slice";
import { Task } from "./../redux/slice/slice";

const EditTaskForm: React.FC<{ task: Task; onClose: () => void }> = ({
  task,
  onClose
}) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: task.title,
      description: task.description || "",
      deadline: task.deadline || ""
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string(),
      deadline: Yup.date()
    }),
    onSubmit: (values) => {
      dispatch(editTask({ ...task, ...values }));
      onClose();
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
      <button type="submit">Save</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default EditTaskForm;
