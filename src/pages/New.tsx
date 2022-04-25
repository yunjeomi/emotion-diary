import React, { useEffect } from "react";
import DiaryEditor from "../components/DiaryEditor";

const New = () => {

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `Emotion Diary - new diary`;
  })

  return (
    <div className="New">
      <DiaryEditor />
    </div>
  );
};

export default New;
