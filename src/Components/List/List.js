import { Button, Checkbox } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo, toggleCompleted } from "../redux/Slice/todoslice";

const List = ({ filter, setText, setUpdatedId }) => {
  const todoList = useSelector((state) => state.todolist.list);

  const dispatch = useDispatch();

  const handleToggle = (id) => {
    dispatch(toggleCompleted({ id }));
  };
  const handleDelete = (id) => {
    dispatch(removeTodo({ id }));
  };

  const handleUpdate = (id, task) => {
    setText(task);
    setUpdatedId(id);
  };

  const filterTodo = todoList.filter((items) => {
    if (filter === 0) return true;
    return filter === 1 ? !items.completed : items.completed;
  });
  const completedTask = todoList.filter((items) => items.completed);

  return (
    <div>
      {filter === 0 ? (
        <h5>
          {" "}
          {completedTask.length} out of {filterTodo.length} is completed
        </h5>
      ) : filter === 1 ? (
        <h5>Active Task</h5>
      ) : (
        <h5>Completed Task</h5>
      )}
      {todoList &&
        filterTodo.map((items) => (
          <div className="todo-list-item">
            <div className="todo-check">
              <Checkbox
                size="small"
                onClick={() => handleToggle(items.id)}
                checked={items.completed}
              />
              {items.task}
            </div>
            <div className="todo-item-btn">
              <Button
                variant="outlined"
                sx={{ marginRight: "15px" }}
                size="small"
                onClick={() => handleUpdate(items.id, items.task)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={() => handleDelete(items.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default List;
