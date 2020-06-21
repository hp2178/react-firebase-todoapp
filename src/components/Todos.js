import React, { Fragment } from "react";
//import _ from "lodash";
import TaskHeader from "./TaskHeader";
import TodoItem from "./TodoItem";

class Todos extends React.Component {
  state = {
    dbOp: ""
  };

  render() {
    var allTaskOwnerList = [];

    this.props.todos.map(todo => {
      if (!allTaskOwnerList.includes(String(todo.taskOwner))) {
        allTaskOwnerList.push(String(todo.taskOwner));
      }
      return allTaskOwnerList;
    });

    return (
      <Fragment>
        {allTaskOwnerList !== undefined &&
          allTaskOwnerList.map((owner, indx) => (
            <Fragment key={indx}>
              <TaskHeader taskHeader={owner} />
              {this.props.todos.map((todo, idx) => {
                if (String(todo.taskOwner) === owner) {
                  return (
                    <TodoItem
                      key={idx}
                      todo={todo}
                      toggleComplete={this.props.toggleComplete}
                      deleteTask={this.props.deleteTask}
                      saveSuggestions={this.props.saveSuggestions}
                    />
                  );
                }
                return <div key={idx}></div>;
              })}
            </Fragment>
          ))}
      </Fragment>
    );
  }
}

export default Todos;
