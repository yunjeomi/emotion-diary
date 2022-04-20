import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Data, DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const diaryList = useContext(DiaryStateContext);

  const navigate = useNavigate();
  const { id } = useParams();
  const targetId = id && parseInt(id);

  const [originData, setOriginData] = useState<Data>();

  useEffect(() => {
    if (!diaryList) {
      throw new Error("non~~");
    }
    const targetDiary = [...diaryList].find(
      (item: Data) => item.id === targetId
    );
    console.log(targetDiary);

    if (targetDiary) {
      setOriginData(targetDiary);
    } else {
      navigate("/", { replace: true });
    }
  }, [diaryList, targetId, navigate]);

  return (
    <div className="Edit">
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
