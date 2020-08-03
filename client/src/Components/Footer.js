import React from "react";

let style = {
  backgroundColor: "#F8F8F8",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "10px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "40px",
  width: "100%",
};

let phantom = {
  display: "block",
  padding: "10px",
  height: "40px",
  width: "100%",
};

function Footer({ children }) {
  return (
    <div>
      <div style={phantom} />
      <div style={style}>
        {children}
        <span className="text-muted">Made by Ana Marr</span>
      </div>
    </div>
  );
}

export default Footer;
