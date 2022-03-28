import React from "react";
import { useNavigate } from "react-router-dom";
import { Data } from "../App";
import MyButton from "./MyButton";

const DiaryItem = ({ id, content, emotion, date }: Data) => {
  const navigate = useNavigate();

  const dateStr = new Date(date).toLocaleDateString();

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={[
          `emotion_img_wrapper`,
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        {/* process.env.PUBLIC_URL: public directory의 주소 */}
        <img
          src={process.env.PUBLIC_URL + `/assets/emotion${emotion}.png`}
          alt="emotion"
        />
      </div>
      <div className="info_wrapper" onClick={goDetail}>
        <div>{dateStr}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton
          text="수정하기"
          type="default"
          onClick={() => navigate(`/edit/${id}`)}
        />
      </div>
    </div>
  );
};

export default DiaryItem;
