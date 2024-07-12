import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/slice/slice";
import { Modal, Button, Form, Input, DatePicker } from "antd";
import moment from "moment";
import "./../styles/global.css";
import { PlusOutlined } from "@ant-design/icons";

const TaskForm: React.FC<{ visible: boolean; onClose: () => void }> = ({
  visible,
  onClose
}) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      deadline: undefined as Date | undefined
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string(),
      deadline: Yup.date()
        .nullable()
        .transform((value, originalValue) => {
          return originalValue === "" ? undefined : value;
        })
        .typeError("Invalid date")
    }),
    onSubmit: (values) => {
      const formattedDeadline = values.deadline
        ? moment(values.deadline).format("YYYY-MM-DD")
        : undefined;
      const taskValues = {
        ...values,
        deadline: formattedDeadline
      };
      dispatch(
        addTask({ ...taskValues, id: Date.now().toString(), status: "pending" })
      );
      formik.resetForm();
      onClose();
    }
  });

  return (
    <Modal title="Add Task" visible={visible} onCancel={onClose} footer={null}>
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
          <DatePicker
            id="deadline"
            name="deadline"
            onChange={(date, dateString) => {
              formik.setFieldValue(
                "deadline",
                date ? date.toDate() : undefined
              );
            }}
            value={
              formik.values.deadline
                ? moment(formik.values.deadline)
                : undefined
            }
            format="YYYY-MM-DD"
            inputReadOnly
            className="custom-datepicker"
          />
        </Form.Item>

        <Form.Item>
          <div style={{ textAlign: "right" }}>
            <Button type="primary" icon={<PlusOutlined />} htmlType="submit">
              Add Task
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskForm;
