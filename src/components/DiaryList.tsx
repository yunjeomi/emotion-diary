import React, { Dispatch, SetStateAction, useState } from "react";
import { Data } from "../App";

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

const sortOptionList: SortOption[] = [
  {
    value: "latest",
    name: "최신순",
  },
  {
    value: "oldest",
    name: "오래된 순",
  },
];

const ControlMenu = ({ value, onChange, optionList }: ControlMenuProps) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((item) => (
        <option key={item.value} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }: DiaryListProps) => {
  const [sortType, setSortType] = useState("lastest");

  const getProcessedDiaryList = () => {
    const compare = (a: Data, b: Data) => {
      if (sortType === "latest") {
        return b.date - a.date;
      } else {
        return a.date - b.date;
      }
    };
    const copyList = [...diaryList];
    const sortedList = copyList.sort(compare);

    return sortedList;
  };
  return (
    <div>
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortOptionList}
      />
      {getProcessedDiaryList().map((item) => (
        <div key={item.id}>
          {item.id} {item.content} {item.emotion} {item.date}
        </div>
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
