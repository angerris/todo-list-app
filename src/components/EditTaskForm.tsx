import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { editTask } from "./../redux/slice/slice";
import { Task } from "./../redux/slice/slice";
import { Modal, Button, Form, Input, DatePicker } from "antd";
import moment from "moment";

const EditTaskForm: React.FC<{ task: Task; onClose: () => void }> = ({
  task,
  onClose
}) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: task.title,
      description: task.description || "",
      deadline: task.deadline ? moment(task.deadline) : null
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string(),
      deadline: Yup.date().nullable()
    }),
    onSubmit: (values) => {
      const formattedDeadline = values.deadline
        ? moment(values.deadline).format("YYYY-MM-DD HH:mm")
        : undefined;

      dispatch(editTask({ ...task, ...values, deadline: formattedDeadline }));
      onClose();
    }
  });

  return (
    <Modal title="Edit Task" visible={true} onCancel={onClose} footer={null}>
      <Form layout="vertical" onSubmitCapture={formik.handleSubmit}>
        <Form.Item
          label="Title"
          validateStatus={
            formik.touched.title && formik.errors.title ? "error" : ""
          }
          help={
            formik.touched.title && formik.errors.title
              ? formik.errors.title
              : ""
          }
        >
          <Input
            id="title"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
        </Form.Item>

        <Form.Item label="Description">
          <Input.TextArea
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            rows={4}
          />
        </Form.Item>

        <Form.Item
          label="Deadline"
          validateStatus={
            formik.touched.deadline && formik.errors.deadline ? "error" : ""
          }
          help={
            formik.touched.deadline && formik.errors.deadline
              ? formik.errors.deadline
              : ""
          }
        >
          <div
            style={{ width: "100%", overflow: "hidden", textAlign: "center" }}
          >
            <DatePicker
              id="deadline"
              name="deadline"
              onChange={(date) => {
                formik.setFieldValue("deadline", date);
              }}
              value={formik.values.deadline}
              showTime
              format="YYYY-MM-DD HH:mm"
              style={{ width: "100%" }}
              inputReadOnly
            />
          </div>
        </Form.Item>

        <Form.Item>
          <div style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditTaskForm;
