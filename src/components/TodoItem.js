import React, { useState } from "react";

const TodoItem = props => {
  const [suggestions, setSuggestions] = useState("");

  const getStyle = () => {
    return {
      background: "#dddddd",
      color: "#000",
      padding: "5px",
      textDecoration: props.todo.isCompleted ? "line-through" : "none"
    };
  };

  const suggestionInputChange = e => {
    setSuggestions(e.target.value);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    props.saveSuggestions(props.todo.taskId, suggestions);
    setSuggestions("");
  };

  return (
    <div style={getStyle()}>
      <div>
        <div>
          <input
            type="checkbox"
            style={{ transform: "scale(3)", margin: "30px" }}
            onChange={() => props.toggleComplete(props.todo.taskId)}
            checked={props.todo.isCompleted}
          />

          {props.todo.taskTitle}

          <button
            style={btnStyle}
            onClick={() => props.deleteTask(props.todo.taskId)}
          >
            X
          </button>
        </div>

        <form onSubmit={onSubmitForm}>
          <div>
            <input
              type="text"
              name="suggestions"
              value={suggestions}
              onChange={suggestionInputChange}
              placeholder="Suggestions from core team..."
              style={{
                width: "70%",
                padding: "5px 10px",
                marginLeft: "150px",
                align: "right"
              }}
            />

            <input
              type="submit"
              value="save"
              style={{
                fontSize: "18px",
                backgroundColor: "#387f75",
                cursor: "pointer",
                color: "#fff",
                borderRadius: "20%",
                marginLeft: "10px"
              }}
            />
          </div>
        </form>
        <div style={{ marginLeft: "150px" }}>
          <p>{props.todo.taskInputs}</p>
        </div>
      </div>
    </div>
  );
};

const btnStyle = {
  background: "#ff0000",
  color: "#fff",
  border: "none",
  padding: "5px 10px",
  borderRadius: "45%",
  cursor: "pointer",
  float: "right",
  width: "2.5%",
  margin: "10px"
};

export default TodoItem;
