import React, { FC } from "react";

interface EmptyBoxProps {
  text: string;
}

const EmptyBox: FC<EmptyBoxProps> = ({ text }) => {
  return (
    <div style={{ margin: "auto 0" }}>
      <img src="svg/box.svg" width={200} height={200} alt="empty-box" />
      <p
        style={{
          textAlign: "center",
          marginTop: "10px",
          color: "#8c8c8c"
        }}
      >
        {text}
      </p>
    </div>
  );
};

export default EmptyBox;
