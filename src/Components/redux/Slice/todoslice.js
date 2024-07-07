import { createSlice } from "@reduxjs/toolkit";

const todoList = createSlice({
  name: "todolist",
  initialState: { list: [], sortCriteria: "All" },
  reducers: {
    addToDo(state, action) {
      state.list.unshift({
        task: action.payload.task,
        id: action.payload.id,
        completed: false,
      });
    },
    removeTodo(state, action) {
      state.list = state.list.filter((todo) => todo.id !== action.payload.id);
    },
    updateToDo(state, action) {
      const { id, task } = action.payload;
      const index = state.list.findIndex((todo) => todo.id === id);
      state.list[index].task = task;
    },
    toggleCompleted(state, action) {
      const { id } = action.payload;
      const index = state.list.findIndex((todo) => todo.id === id);
      state.list[index].completed = !state.list[index].completed;
    },
  },
});

export const { addToDo, sortToDo, toggleCompleted, removeTodo, updateToDo } =
  todoList.actions;
export default todoList.reducer;
