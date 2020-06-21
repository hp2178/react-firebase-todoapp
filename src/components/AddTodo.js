import React from "react";

class AddTodo extends React.Component {
  state = {
    ownerOfTask: "",
    titleOfTask: ""
  };

  //We can use below two methods as well...
  //Below 2 methods is used to change the state immediately, when user types something...
  ownerOfTaskInputChange = e => {
    this.setState({ ownerOfTask: e.target.value });
  };

  titleOfTaskInputChange = e => {
    this.setState({ titleOfTask: e.target.value });
  };

  //The common method can be used in this way. Notice Name attribute of the 2 <input> tags below.
  taskDetailInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitForm = e => {
    e.preventDefault();
    this.props.addTodo(this.state.ownerOfTask, this.state.titleOfTask);
    this.setState({ ownerOfTask: "", titleOfTask: "" });
  };

  render() {
    return (
      <div className="AddTodo">
        <form onSubmit={this.onSubmitForm}>
          <input
            type="text"
            name="ownerOfTask"
            placeholder="Whose Task is it...?"
            value={this.state.ownerOfTask}
            onChange={this.taskDetailInputChange}
            style={{ width: "50%", padding: "5px 10px", margin: "15px" }}
          />

          <input
            type="text"
            name="titleOfTask"
            placeholder="Enter Task Title..."
            value={this.state.titleOfTask}
            onChange={this.taskDetailInputChange}
            style={{ width: "50%", padding: "5px 10px", margin: "15px" }}
          />

          <input
            type="submit"
            value="submit"
            style={{
              width: "10%",
              height: "10%",
              fontSize: "18px",
              backgroundColor: "#414141",
              cursor: "pointer",
              color: "#fff"
            }}
          />
        </form>
      </div>
    );
  }
}

export default AddTodo;
