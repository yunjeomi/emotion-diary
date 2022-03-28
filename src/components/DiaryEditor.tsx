import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Data, DiaryDispatchContext } from "../App";
import EmotionItem from "./EmotionItem";
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";

type EmotionType = {
  name: string;
  emotion: number;
};

const emotionList: EmotionType[] = [
  {
    name: "최고",
    emotion: 1,
  },
  {
    name: "좋음",
    emotion: 2,
  },
  {
    name: "보통",
    emotion: 3,
  },
  {
    name: "나쁨",
    emotion: 4,
  },
  {
    name: "최악",
    emotion: 5,
  },
];

const getToday = (originDate?: Date) => {
  let newDate = new Date();

  if (originDate) {
    newDate = originDate;
  }

  const thisYear = newDate.getFullYear();
  const thisMonth = newDate.getMonth() + 1;
  const thisDay = newDate.getDate();

  let month = thisMonth.toString();
  let day = thisDay.toString();

  if (thisMonth < 10) {
    month = `0${thisMonth}`;
  }

  if (thisDay < 10) {
    day = `0${thisDay}`;
  }

  const today = `${thisYear}-${month}-${day}`;
  return today;
};

const convertDateToMS = (date: string) => {
  const dateArr = date.split("-");
  const year = parseInt(dateArr[0]);
  const month = parseInt(dateArr[1]) - 1;
  const day = parseInt(dateArr[2]);
  const newDate = new Date(year, month, day).getTime();

  return newDate;
};

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

  const { onCreate, onEdit } = diaryDispatch;

  const [date, setDate] = useState<string>(getToday());
  const [content, setContent] = useState<string>("");
  const [emotion, setEmotion] = useState<number>(0);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleEmotion = (emotion: number) => {
    setEmotion(emotion);
  };

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
        headText={isEdit? "일기 수정" : "새로운 일기 쓰기"}
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
