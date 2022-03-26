import React, { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Data } from "../App";
import DiaryItem from "./DiaryItem";
import MyButton from "./MyButton";

type DiaryListProps = {
  diaryList: Data[];
};

type ControlMenuProps = {
  onChange: Dispatch<SetStateAction<string>>;
  value: string;
  optionList: SortOption[];
};

type SortOption = {
  value: string;
  name: string;
};

const filterOptionList: SortOption[] = [
  {
    name: "전부",
    value: "all",
  },
  {
    name: "좋을 때",
    value: "good",
  },
  {
    name: "안 좋을 때",
    value: "bad",
  },
];

const sortOptionList: SortOption[] = [
  {
    name: "최신순",
    value: "latest",
  },
  {
    name: "오래된 순",
    value: "oldest",
  },
];

const ControlMenu = ({ value, onChange, optionList }: ControlMenuProps) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((item) => (
        <option key={item.value} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }: DiaryListProps) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("lastest");
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {
    const filterCallBack = (item: Data) => {
      if (filter === "good") {
        return item.emotion <= 3;
      } else {
        return item.emotion > 3;
      }
    };

    const compare = (a: Data, b: Data) => {
      if (sortType === "latest") {
        return b.date - a.date;
      } else {
        return a.date - b.date;
      }
    };
    const copyList = [...diaryList];

    const filteredList =
      filter === "all"
        ? copyList
        : copyList.filter((item) => filterCallBack(item));
    const sortedList = filteredList.sort(compare);

    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            onClick={() => navigate("/new")}
            text="새 일기쓰기"
            type="positive"
          />
        </div>
      </div>
      {getProcessedDiaryList().map((item) => (
        <DiaryItem key={item.id} {...item} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
