import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
  status: "pending" | "completed" | "overdue" | "removed";
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: []
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    editTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    removeTask(state, action: PayloadAction<string>) {
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        if (state.tasks[index].status === "completed") {
          state.tasks.splice(index, 1);
        } else {
          state.tasks[index].status = "removed";
        }
      }
    },
    permanentlyRemoveTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    markTaskAsCompleted(state, action: PayloadAction<string>) {
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        state.tasks[index].status = "completed";
      }
    },
    updateTaskStatus(state) {
      const now = new Date().toISOString();
      state.tasks.forEach((task) => {
        if (task.status === "pending" && task.deadline && task.deadline < now) {
          task.status = "overdue";
        }
      });
    }
  }
});

export const {
  addTask,
  editTask,
  removeTask,
  permanentlyRemoveTask,
  markTaskAsCompleted,
  updateTaskStatus
} = tasksSlice.actions;
export default tasksSlice.reducer;
