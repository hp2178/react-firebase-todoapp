import React from "react";

class TaskHeader extends React.Component {
  render() {
    return <div style={taskHeaderStyle}>{this.props.taskHeader}</div>;
  }
}

const taskHeaderStyle = {
  background: "#b4b2b2",
  color: "#000",
  padding: "5px"
};

export default TaskHeader;
