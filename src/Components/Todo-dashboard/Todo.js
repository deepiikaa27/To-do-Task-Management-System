import React, { useEffect, useState } from "react";
import "./Todo.css";
import {
  Button,
  ButtonGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addToDo,
  removeTodo,
  toggleCompleted,
  updateToDo,
} from "../redux/Slice/todoslice";
import List from "../List/List";
import { useNavigate } from "react-router-dom";
import { displayToast } from "../../helper";
import { logout } from "../redux/Slice/slice";

const Todo = () => {
  const navigate = useNavigate();
  const [todoTextInput, setText] = useState("");
  const [activatedTab, setActive] = useState(0);
  const [updatedId, setUpdatedId] = useState(null);

  let user = useSelector((state) => state.user.data);

  useEffect(() => {
    console.log(user);
    //checking auth
    if (!user?.token) {
      navigate("/login");
    }
  }, [navigate, user]);

  const todoList = useSelector((state) => state.todolist.list);

  const dispatch = useDispatch();

  const addButtonHandler = () => {
    if (todoTextInput.trim() === "") {
      displayToast("warning", "Please enter the task!");
      return;
    }
    if (updatedId !== null) {
      dispatch(updateToDo({ id: updatedId, task: todoTextInput }));
      setUpdatedId(null);
    } else {
      const task = {
        task: todoTextInput,
        id: Date.now(),
      };
      dispatch(addToDo(task));
      setText("");
    }
  };

  const checkAllbutton = () => {
    todoList.forEach((items) => {
      if (!items.completed) {
        dispatch(toggleCompleted({ id: items.id }));
      }
    });
  };

  const removeChecked = () => {
    todoList.forEach((items) => {
      if (items.completed) {
        dispatch(removeTodo({ id: items.id }));
      }
    });
  };

  const logoutBtnHandler = () => {
    navigate("/login");
    dispatch(logout());
  };
  return (
    <Grid container className="todo-dash">
      <Grid item xs={12} sm={12} md={6} lg={4}>
        <div className="usertitle">
          {" "}
          Hello , {user?.firstName} {user?.lastName}
        </div>
        <div className="todo-container">
          <div className="todo-title">
            <Typography>What needs to be done?</Typography>
          </div>
          <div>
            <TextField
              variant="outlined"
              color="primary"
              label="Todo Task"
              placeholder="Enter task here..."
              size="small"
              fullWidth
              value={todoTextInput}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="add-btn">
            <Button
              fullWidth
              variant="contained"
              size="small"
              color="primary"
              disabled={todoTextInput === "" ? true : false}
              onClick={addButtonHandler}
            >
              ADD
            </Button>
          </div>
          <div className="btn-tab">
            <ButtonGroup
              variant="outlined"
              color="warning"
              aria-label="Basic button group"
            >
              <Button
                variant={activatedTab === 0 ? "contained" : "outlined"}
                onClick={() => setActive(0)}
              >
                All
              </Button>
              <Button
                variant={activatedTab === 1 ? "contained" : "outlined"}
                onClick={() => setActive(1)}
              >
                Active
              </Button>
              <Button
                variant={activatedTab === 2 ? "contained" : "outlined"}
                onClick={() => setActive(2)}
              >
                Completed
              </Button>
            </ButtonGroup>
          </div>

          <div className="todo-list">
            <List
              filter={activatedTab}
              setText={setText}
              setUpdatedId={setUpdatedId}
            />
          </div>
          <hr />
          <div className="last-btn">
            <Button variant="outlined" size="small" onClick={checkAllbutton}>
              Check All
            </Button>
            <Button variant="contained" size="small" onClick={removeChecked}>
              Remove Completed
            </Button>
          </div>
        </div>
        <div className="logout-btn">
          <Button variant="outlined" size="small" onClick={logoutBtnHandler}>
            Logout
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default Todo;
