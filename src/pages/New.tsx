import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Data, DiaryDispatchContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";


const New = () => {
  const navigate = useNavigate();

  

  const [newData, setNewData] = useState<Data>({
    id: 0,
    content: "",
    emotion: 0,
    date: 0,
  });

  const onClick = (emotion: number) => {
    // emotion 클릭!
    setNewData({
      ...newData,
      emotion: emotion,
    });

    // 배경바꾸기!!
  };

  const onSubmit = () => {};

  const selectEmotion = () => {};

  return (
    <div className="New">
      <DiaryEditor />
    </div>
  );
};

export default New;
