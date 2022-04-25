import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Data, DiaryStateContext } from "../App";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";

import { getToday } from "../utils/date";
import { emotionList } from "../utils/emotion";

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const targetId = id && parseInt(id);

  const navigate = useNavigate();
  const [data, setData] = useState<Data>();

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `Emotion Diary - ${id}`;
  })

  useEffect(() => {
    if (!diaryList) {
      throw new Error("non~~");
    }

    if (diaryList.length > 0) {
      const targetDiary = diaryList.find((item) => item.id === targetId);

      if (targetDiary) {
        // 일기 있음
        setData(targetDiary);
      } else {
        // 일기 없음
        alert("존재하지 않는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [targetId, diaryList, navigate]);

  if (!data) {
    return <div className="DiaryPage">로딩중입니다...</div>;
  } else {
    const currEmotionData = emotionList.find(
      (item) => item.emotion === data.emotion
    );
    return (
      <div className="DiaryPage">
        <MyHeader
          headText={getToday(new Date(data.date))}
          leftChild={
            <MyButton text="< 뒤로가기" onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton
              text="수정하기"
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section>
            <div className={["diary_img_wrapper", `diary_img_wrapper_${data.emotion}`].join(" ")}>
              <img
                src={process.env.PUBLIC_URL + `/assets/emotion${currEmotionData?.emotion}.png`}
                alt="emotion"
              />
              <div className="emotion_description">
                {currEmotionData?.name}
              </div>
            </div>
          </section>
          <section>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
