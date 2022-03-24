import React, { useContext, useEffect, useState } from "react";
import { Data, DiaryStateContext } from "../App";
import DiaryList from "../components/DiaryList";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);
  if (!diaryList) {
    throw new Error("no diaryList!");
  }

  const [data, setData] = useState(Array<Data>());
  const [curDate, setCurDate] = useState(new Date());

  const headText = `${curDate.getFullYear()}년-${curDate.getMonth() + 1}월`;

  useEffect(() => {
    if (diaryList.length < 1) return;

    const firstDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth(),
      1
    ).getTime();
    const lastDay = new Date(
      curDate.getFullYear(),
      curDate.getMonth() + 1,
      0
    ).getTime();

    setData(
      diaryList?.filter(
        (item: Data) => item.date >= firstDay && item.date <= lastDay
      )
    );
  }, [curDate, diaryList]);

  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1));
  };

  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1));
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text="<" onClick={decreaseMonth} />}
        rightChild={<MyButton text=">" onClick={increaseMonth} />}
      />

      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
