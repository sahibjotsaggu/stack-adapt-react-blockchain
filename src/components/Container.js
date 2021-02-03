import React from "react";

const Container = ({ children }) => {
  return (
    <div
      style={{
        margin: "0px auto",
        maxWidth: 1000,
        textAlign: "center"
      }}
    >
      {children}
    </div>
  );
};

export default Container;
