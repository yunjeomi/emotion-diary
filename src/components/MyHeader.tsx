import React from "react";

type MyHeaderType = {
  headText: string;
  leftChild?: JSX.Element;
  rightChild?: JSX.Element;
};

const MyHeader = ({ headText, leftChild, rightChild }: MyHeaderType) => {
  return (
    <header>
      <div className="head_btn_left">{leftChild}</div>
      <div className="head_text">{headText}</div>
      <div className="head_btn_right">{rightChild}</div>
    </header>
  );
};

export default MyHeader;
