import React from "react";

function returnHeader() {
  return (
    <header style={headerStyle}>
      <h1>Doubt session with Core Dev Team.</h1>
    </header>
  );
}

const headerStyle = {
  background: "#444444",
  color: "#fff",
  padding: "10px"
};

export default returnHeader;
