import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Data, DiaryDispatchContext } from "../App";
import EmotionItem from "./EmotionItem";
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";

import { convertDateToMS, getToday } from "../utils/date";
import { emotionList } from "../utils/emotion";

type DiaryEditorType = {
  isEdit?: boolean;
  originData?: Data;
};

const DiaryEditor = ({ isEdit, originData }: DiaryEditorType) => {
  const navigate = useNavigate();

  const diaryDispatch = useContext(DiaryDispatchContext);

  if (!diaryDispatch) {
    throw new Error("non diaryDispatch!");
  }

  const { onCreate, onEdit, onRemove } = diaryDispatch;

  const [date, setDate] = useState<string>(getToday());
  const [content, setContent] = useState<string>("");
  const [emotion, setEmotion] = useState<number>(0);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleEmotion = useCallback((emotion: number) => {
    setEmotion(emotion);
  }, []);

  const onSubmit = () => {
    if (emotion === 0) {
      alert("please choose a emotion!");
      return;
    }
    if (content.length < 1) {
      alert("please enter your diary!");
      textareaRef.current?.focus();
      return;
    }

    const numDate = convertDateToMS(date);

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "일기를 추가하시겠습니까?"
      )
    ) {
      if (isEdit && originData) {
        // 수정
        onEdit(originData?.id, content, emotion, numDate);
      } else {
        // 추가
        onCreate(numDate, content, emotion);
      }
    }

    navigate("/", { replace: true });
  };

  const handleRemove = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      originData && onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit && originData) {
      const numDate = originData.date;
      setDate(getToday(new Date(numDate)));
      setContent(originData.content);
      setEmotion(originData.emotion);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        leftChild={<MyButton text="<뒤로가기" onClick={() => navigate(-1)} />}
        headText={isEdit ? "일기 수정" : "새 일기쓰기"}
        rightChild={
          isEdit ? (
            <MyButton text="삭제하기" type="negative" onClick={handleRemove} />
          ) : undefined
        }
      />
      <div>
        <div className="small_title">오늘은 언제인가요?</div>
        <div className="input_box">
          <input
            type="date"
            className="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
        </div>
      </div>
      <div>
        <div className="small_title">오늘의 감정</div>
        <div className="emotion_list">
          {emotionList.map((item) => (
            <EmotionItem
              key={item.emotion}
              {...item}
              handleEmotion={handleEmotion}
              isSelected={item.emotion === emotion ? true : false}
            />
          ))}
        </div>
      </div>
      <div>
        <div className="small_title">오늘의 일기</div>
        <div>
          <textarea
            className="newContent"
            placeholder="오늘은 어땠나요?"
            onChange={(e) => setContent(e.target.value)}
            ref={textareaRef}
            value={content}
          />
        </div>
      </div>
      <div className="btns">
        <MyButton text="취소하기" onClick={() => navigate("/")} />
        <MyButton text="작성완료" type="positive" onClick={onSubmit} />
      </div>
    </div>
  );
};

export default DiaryEditor;
