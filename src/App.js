import React from "react";
//import { Children } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Header from "./components/Header";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import About from "./components/About";
import { v4 as uuid } from "uuid";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Firebase from "./Config";

import "./App.css";
//import { thisExpression } from "@babel/types";

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // FireBase DB Code to fetch the all Tasks from DB and set the initial State...
    var starCountRef;
    starCountRef = Firebase.database()
      .ref()
      .child("/allTasks");
    starCountRef.on("value", snapshot => {
      setTodos([]);
      let temp_arr = [];
      snapshot.forEach(child => {
        const eachTask = {
          taskId: child.val().taskId,
          taskTitle: child.val().taskTitle,
          isCompleted: child.val().isCompleted,
          taskOwner: child.val().taskOwner,
          taskInputs: child.val().taskInputs
        };
        temp_arr.push(eachTask);
      });
      setTodos(temp_arr);
    });
  }, []);

  const toggleComplete = taskId => {
    // FireBase DB code to toggle the value in DB...
    var database = Firebase.database();

    var databaseRef = database.ref("/allTasks/" + taskId + "/isCompleted");
    var dbIsCompleted;

    databaseRef.on("value", snap => {
      dbIsCompleted = snap.val();
    });

    database.ref("/allTasks/" + taskId).update({
      isCompleted: !dbIsCompleted
    });

    // setState CODE......
    setTodos(
      todos.map(todo => {
        if (todo.taskId === taskId) todo.isCompleted = !todo.isCompleted;
        return todo;
      })
    );
  };

  const saveSuggestions = (taskId, taskSuggestions) => {
    // FireBase DB code to save the inputs in DB...
    var database = Firebase.database();

    database.ref("/allTasks/" + taskId).update({
      taskInputs: taskSuggestions
    });

    // setState CODE......
    setTodos(
      todos.map(todo => {
        if (todo.taskId === taskId) todo.taskInputs = taskSuggestions;
        return todo;
      })
    );
  };

  const deleteTask = taskId => {
    // // FireBase DB code to delete the task from DB...
    var database = Firebase.database();

    var databaseRef = database.ref("/allTasks/" + taskId);

    databaseRef.remove();

    // setState CODE......
    setTodos([...todos.filter(todo => todo.taskId !== taskId)]);
  };

  const addTodo = (ownerOfTask, titleOfTask) => {
    // // FireBase DB code to add the task in DB...
    var database = Firebase.database();

    var uniqUUIDForTaskId = uuid();

    var databaseRef = database.ref("/allTasks/" + uniqUUIDForTaskId);

    const todo = {
      isCompleted: false,
      taskId: uniqUUIDForTaskId,
      taskInputs: "Nothing so far...",
      taskOwner: ownerOfTask,
      taskTitle: titleOfTask
    };

    databaseRef.set(todo);

    // setState CODE......
    setTodos([...todos, todo]);
  };

  const btnStyle = {
    transition: "all 0.1s",
    WebkitTransition: "all 0.1s",
    padding: "5px 10px",
    margin: "0px 10px 10px 0px",
    borderRadius: "10px",
    fontFamily: "'Lucida Console', Courier, monospace",
    fontSize: "15px",
    color: "#FFF",
    textDecoration: "none",
    backgroundColor: "#3498DB",
    textShadow: "0px -2px #2980B9",
    transform: "translate(0px,5px)",
    WebkitTransform: "translate(0px,5px)",
    borderBottom: "1px solid",
    cursor: "pointer"
  };

  return (
    <div className="App">
      <Header></Header>
      <Router>
        <Link to="/">
          <button
            type="button"
            style={btnStyle}
            className="action-button shadow animate yellow"
          >
            Home
          </button>
        </Link>

        <Link to="/about">
          <button
            style={btnStyle}
            type="button"
            className="action-button shadow animate yellow"
          >
            About this Application
          </button>
        </Link>

        <Switch>
          <Route exact path="/">
            <AddTodo addTodo={addTodo} />

            <Todos
              todos={todos}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
              saveSuggestions={saveSuggestions}
            />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
