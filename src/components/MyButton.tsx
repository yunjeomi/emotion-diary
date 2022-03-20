import React from "react";

type MyButtonType = {
  text: string;
  type?: string;
  onClick: () => void;
};
const MyButton = ({ text, type, onClick }: MyButtonType) => {
  const btnType = ["positive", "negative"].includes(type!) ? type : "default";

  return (
    <button
      className={["MyButton", `MyButton_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
